const Store = require("../models/Store");


const createStore = async (req, res) => {
    try {
        const { name, email, category, address, image } = req.body;

        if (!name || !email || !category || !address) {
            return res.status(400).json({ success: false, message: "All required fields must be filled" });
        }

        const newStore = new Store({
            name,
            email,
            category,
            address,
            image
        });

        await newStore.save();

        res.status(201).json({
            success: true,
            message: "Store request submitted successfully",
            store: newStore
        });
    } catch (err) {
        console.error("Error creating store:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json({ success: true, count: stores.length, stores });
    } catch (err) {
        console.error("Error fetching stores:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteStore = async (req, res) => {
    try {
        const { id } = req.params; // store ID from URL

        const store = await Store.findByIdAndDelete(id);

        if (!store) {
            return res.status(404).json({
                success: false,
                message: 'Store not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Store deleted successfully',
            store, // optional: return deleted store details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting store',
            error: error.message,
        });
    }
};
const getMyStore = async (req, res) => {
    try {
        // req.user.gmail should be set by your auth middleware when decoding JWT
        const store = await Store.findOne({ email: req.user.email });

        if (!store) {
            return res.status(404).json({ success: false, message: "No store found for this gmail" });
        }

        res.json({ success: true, store });
    } catch (err) {
        console.error("Error fetching store:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { createStore, getStores, deleteStore, getMyStore };