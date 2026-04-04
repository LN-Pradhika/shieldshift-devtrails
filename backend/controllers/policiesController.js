const pool = require("../config/db");

// ─── helpers ────────────────────────────────────────────────────

/**
 * Returns the next calendar month's due date (same day, next month).
 */
const nextMonthDate = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toISOString();
};

// ─── controllers ────────────────────────────────────────────────

/**
 * GET /api/policies/plans
 * Returns all active plans (with prices).
 * Public — no auth required.
 */
const getPlans = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, slug, base_price, period, coverage
       FROM plans
       WHERE is_active = TRUE
       ORDER BY base_price ASC`
    );

    return res.status(200).json({ success: true, data: { plans: rows } });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/policies/my
 * Returns the current user's active policy (if any).
 */
const getMyPolicy = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT up.id, up.status, up.price_paid, up.started_at, up.expires_at,
              p.name AS plan_name, p.slug, p.coverage, p.period
       FROM user_policies up
       JOIN plans p ON p.id = up.plan_id
       WHERE up.user_id = $1
         AND up.status = 'active'
       ORDER BY up.started_at DESC
       LIMIT 1`,
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      data: { policy: rows[0] || null },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/policies/subscribe
 * Body: { plan_slug: 'basic' | 'standard' | 'premium' }
 * Subscribes the user to a plan, cancelling any existing active policy first.
 */
const subscribe = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { plan_slug } = req.body;

    if (!plan_slug) {
      return res.status(400).json({ success: false, message: "plan_slug is required." });
    }

    // Find the plan
    const planRes = await client.query(
      "SELECT * FROM plans WHERE slug = $1 AND is_active = TRUE",
      [plan_slug]
    );

    if (!planRes.rows.length) {
      return res.status(404).json({ success: false, message: "Plan not found." });
    }

    const plan = planRes.rows[0];

    await client.query("BEGIN");

    // Cancel any existing active policy
    await client.query(
      `UPDATE user_policies
       SET status = 'cancelled'
       WHERE user_id = $1 AND status = 'active'`,
      [req.user.id]
    );

    // Create new policy
    const { rows } = await client.query(
      `INSERT INTO user_policies (user_id, plan_id, price_paid, expires_at)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, plan.id, plan.base_price, nextMonthDate()]
    );

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: `Subscribed to ${plan.name} successfully.`,
      data: { policy: rows[0] },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
};

/**
 * DELETE /api/policies/cancel
 * Cancels the user's current active policy.
 */
const cancelPolicy = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `UPDATE user_policies
       SET status = 'cancelled'
       WHERE user_id = $1 AND status = 'active'
       RETURNING id`,
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: "No active policy found." });
    }

    return res.status(200).json({ success: true, message: "Policy cancelled." });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPlans, getMyPolicy, subscribe, cancelPolicy };