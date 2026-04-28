const router = require("express").Router();
const { register, login, updateAvatar } = require("../controllers/auth");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.put("/update-avatar", auth, updateAvatar);

module.exports = router;