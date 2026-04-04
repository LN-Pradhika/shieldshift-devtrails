-- ============================================================
--  ShieldShift — v2 Schema (Policies + Claims)
--  Run AFTER database.sql:
--  psql -U postgres -d shieldshift -f database_v2.sql
-- ============================================================

-- ----------------------------------------------------------------
-- PLANS  (the 3 static tiers)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS plans (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100)  UNIQUE NOT NULL,
  slug        VARCHAR(50)   UNIQUE NOT NULL,
  base_price  NUMERIC(10,2) NOT NULL,
  period      VARCHAR(20)   NOT NULL DEFAULT 'month',
  coverage    TEXT[]        NOT NULL DEFAULT '{}',
  is_active   BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- USER POLICIES  (user subscribes to a plan)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_policies (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id     UUID          NOT NULL REFERENCES plans(id),
  status      VARCHAR(20)   NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  price_paid  NUMERIC(10,2) NOT NULL,
  started_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- CLAIMS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS claims (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  policy_id     UUID          REFERENCES user_policies(id),
  claim_ref     VARCHAR(30)   UNIQUE NOT NULL,
  event_type    VARCHAR(100)  NOT NULL DEFAULT 'Weather Disruption',
  area          VARCHAR(200),
  duration_hrs  NUMERIC(5,2),
  est_payout    NUMERIC(10,2),
  status        VARCHAR(20)   NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'rejected', 'processing')),
  notes         TEXT,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- INDEXES
-- ----------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_user_policies_user ON user_policies(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_user        ON claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_ref         ON claims(claim_ref);

-- ----------------------------------------------------------------
-- Auto-update updated_at on claims
-- ----------------------------------------------------------------
DROP TRIGGER IF EXISTS set_claims_updated_at ON claims;
CREATE TRIGGER set_claims_updated_at
  BEFORE UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------
-- SEED: Plans
-- ----------------------------------------------------------------
INSERT INTO plans (name, slug, base_price, coverage) VALUES
  (
    'Basic Plan', 'basic', 199,
    ARRAY['Weather disruption coverage', 'Basic accident cover', '24/7 support']
  ),
  (
    'Standard Plan', 'standard', 349,
    ARRAY['Weather disruption coverage', 'Traffic incident coverage', 'Earning loss protection', 'Priority support']
  ),
  (
    'Premium Plan', 'premium', 599,
    ARRAY['Weather disruption coverage', 'Traffic incident coverage', 'Health & accident cover', 'Earning loss protection', 'Family coverage add-on', 'Dedicated manager']
  )
ON CONFLICT (slug) DO NOTHING;