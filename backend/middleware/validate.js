const PHONE_RE = /^\+?[0-9]{7,15}$/;

const validateRegister = (req, res, next) => {
  const { full_name, phone, password, city, work_type, experience, avg_daily_earnings } = req.body;
  const errors = [];

  if (!full_name || full_name.trim().length < 2)
    errors.push("full_name must be at least 2 characters.");

  if (!phone || !PHONE_RE.test(phone.replace(/\s/g, "")))
    errors.push("A valid phone number is required.");

  if (!password || password.length < 6)
    errors.push("password must be at least 6 characters.");

  if (!city || city.trim().length < 2)
    errors.push("city is required.");

  const validWorkTypes = ["delivery", "ride", "freelance"];
  if (!work_type || !validWorkTypes.includes(work_type))
    errors.push(`work_type must be one of: ${validWorkTypes.join(", ")}.`);

  const validExperience = ["0-1", "1-3", "3-5", "5+"];
  if (!experience || !validExperience.includes(experience))
    errors.push(`experience must be one of: ${validExperience.join(", ")}.`);

  const earnings = Number(avg_daily_earnings);
  if (isNaN(earnings) || earnings < 0)
    errors.push("avg_daily_earnings must be a non-negative number.");

  if (errors.length) {
    return res.status(400).json({ success: false, message: "Validation failed.", errors });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { phone, password } = req.body;
  const errors = [];

  if (!phone || !PHONE_RE.test(phone.replace(/\s/g, "")))
    errors.push("A valid phone number is required.");

  if (!password || password.length < 1)
    errors.push("password is required.");

  if (errors.length) {
    return res.status(400).json({ success: false, message: "Validation failed.", errors });
  }
  next();
};

module.exports = { validateRegister, validateLogin };