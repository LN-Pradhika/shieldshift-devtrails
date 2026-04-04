const { Router } = require("express");
const { getPlans, getMyPolicy, subscribe, cancelPolicy } = require("../controllers/policiesController");
const { verifyToken } = require("../middleware/auth");

const router = Router();

router.get("/plans", getPlans);

router.use(verifyToken);

router.get("/my", getMyPolicy);

router.post("/subscribe", subscribe);

router.delete("/cancel", cancelPolicy);

module.exports = router;