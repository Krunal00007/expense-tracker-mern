const router = require("express").Router();

const {
    getAllUsers,
    deleteUser,
    getAllTransactions,
    getAdminStats
} = require("../controllers/admin");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/users", auth, admin, getAllUsers);

router.delete("/user/:id", auth, admin, deleteUser);

router.get("/transactions", auth, admin, getAllTransactions);

router.get("/stats", auth, admin, getAdminStats);

module.exports = router;