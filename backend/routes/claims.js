const { Router } = require("express");
const { getMyClaims, getActiveClaim, getClaimById, createClaim } = require("../controllers/claimsController");
const { verifyToken } = require("../middleware/auth");

const router = Router();

router.use(verifyToken);

router.get("/", getMyClaims);

router.get("/active", getActiveClaim);

router.get("/:id", getClaimById);

router.post("/", createClaim);

module.exports = router;