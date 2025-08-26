const Request = require("../models/Request");
const Store = require("../models/Store");
const User = require("../models/User"); // adjust the path to your User model

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // fetches all users
        res.status(200).json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find(); // fetches all users
        res.status(200).json({ success: true, requests });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createRequest = async (req, res) => {
    try {
        const { name, email, category, address, image } = req.body;

        if (!name || !email || !category || !address) {
            return res.status(400).json({ success: false, message: "All required fields must be filled" });
        }

        const newRequest = new Request({
            name,
            email,
            category,
            address,
            image
        });

        await newRequest.save();

        res.status(201).json({
            success: true,
            message: "Store request submitted successfully",
            request: newRequest
        });
    } catch (err) {
        console.error("Error creating store:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequest = await Request.findByIdAndDelete(id);

        if (!deletedRequest) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        res.json({ success: true, message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting request", error: error.message });
    }
};


// Accept Request → Create Store
const acceptRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Create store using request details
        const store = new Store({
            name: request.name,
            email: request.email,
            category: request.category,
            address: request.address,
            image: request.image
        });

        await store.save();

        // Remove request after accepting
        await Request.findByIdAndDelete(requestId);

        res.status(201).json({ message: "Request accepted & store created", store });
    } catch (error) {
        console.error("Error accepting request:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params; // user id
        const { role } = req.body; // new role

        

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json({ success: true, message: "Role updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};



module.exports = { getAllUsers, createRequest, getAllRequests, deleteRequest, acceptRequest, updateUserRole };
