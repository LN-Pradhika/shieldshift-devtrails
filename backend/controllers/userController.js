const pool = require("../config/db");


const sanitizeUser = (user) => {
  const { password_hash, ...safe } = user;
  return safe;
};


const getProfile = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);

    if (!rows.length) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, data: { user: sanitizeUser(rows[0]) } });
  } catch (err) {
    next(err);
  }
};


const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ["full_name", "city", "work_type", "experience", "avg_daily_earnings"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (!Object.keys(updates).length) {
      return res
        .status(400)
        .json({ success: false, message: "No updatable fields provided." });
    }

    const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 1}`);
    const values = [...Object.values(updates), req.user.id];

    const query = `
      UPDATE users
      SET ${setClauses.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const { rows } = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      message: "Profile updated.",
      data: { user: sanitizeUser(rows[0]) },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };