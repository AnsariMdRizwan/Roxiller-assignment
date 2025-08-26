const Store = require('../models/Store');

// ⭐ Rate a store
const rateStore = async (req, res) => {
    try {
        const storeId = req.params.id;
        const userId = req.user.id; // comes from auth middleware (JWT)
        const { rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const store = await Store.findById(storeId);
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        // ✅ Check if user already rated this store
        const existingRating = store.ratings.find(r => r.user.toString() === userId);

        if (existingRating) {
            // update the rating
            existingRating.value = rating;
        } else {
            // add new rating
            store.ratings.push({ user: userId, value: rating });
        }

        // ✅ Recalculate average
        const totalRatings = store.ratings.length;
        const avg =
            store.ratings.reduce((sum, r) => sum + r.value, 0) / totalRatings;

        store.averageRating = Math.round(avg * 10) / 10; // keep 1 decimal
        store.totalRatings = totalRatings;

        await store.save();

        res.json({
            message: "Rating submitted successfully",
            store: {
                id: store._id,
                averageRating: store.averageRating,
                totalRatings: store.totalRatings,
                userRating: rating
            }
        });
    } catch (error) {
        console.error("Error rating store:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { rateStore };