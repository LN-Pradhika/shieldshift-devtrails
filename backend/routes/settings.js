const { Router } = require("express");
const { getProfile, updateProfile, changePassword } = require("../controllers/settingsController");
const { verifyToken } = require("../middleware/auth");

const router = Router();

router.use(verifyToken);

router.get("/profile", getProfile);

router.patch("/profile", updateProfile);

router.patch("/password", changePassword);

module.exports = router;