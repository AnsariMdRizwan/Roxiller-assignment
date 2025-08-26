const Store = require("../models/Store.js"); // Import User model

const { imageUploadutils } = require("../helper/cloudinary.js"); // Cloudinary upload utility

const handleImageUpload = async (req, res) => {
    console.log(req)
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized User" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        console.log("🟢 File received:", req.file.originalname);

        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;

        // Upload to cloudinary
        const result = await imageUploadutils(url);

        if (!result?.url) {
            return res.status(500).json({ success: false, message: "Image upload failed" });
        }

        // Update store
        const updatedUser = await Store.findOneAndUpdate(
            { email: req.user.email },
            { image: result.url },
            { new: true }
        );

        res.json({ success: true, imageUrl: result.url });
    } catch (error) {
        console.error("🔴 Upload Error:", error);
        res.status(500).json({ success: false, message: "Error Occurred: " + error.message });
    }
};


module.exports = { handleImageUpload };
