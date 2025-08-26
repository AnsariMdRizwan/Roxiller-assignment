const express = require("express");
const { getAllUsers, createRequest, getAllRequests, deleteRequest, acceptRequest, updateUserRole } = require("../controllers/user-controller");
const { authmiddleware } = require("../controllers/auth-controller");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");



const router = express.Router()

router.get('/getall', getAllUsers)

router.post('/requests', createRequest)
router.get('/getrequests', getAllRequests)


// backend/routes/userRoutes.js
router.put("/change-password", authmiddleware, async (req, res) => {
    const { newPassword } = req.body;
    const user = await User.findById(req.user.id);



    user.password = await bcryptjs.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully!" });
});

router.delete('/requests/:id', deleteRequest);
router.put("/requests/accept/:id", acceptRequest);
router.put('/update-role/:id', updateUserRole);


module.exports = router;