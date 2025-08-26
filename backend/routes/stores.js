const express = require("express");
const router = express.Router();
const { createStore, getStores, deleteStore, getMyStore } = require("../controllers/storeController");
const { authmiddleware } = require("../controllers/auth-controller");
const { handleImageUpload } = require("../controllers/image");
const { upload } = require("../helper/cloudinary.js");
const { rateStore } = require("../controllers/userRating.js");

// User requests store listing
router.post("/create", createStore);
router.get('/my-store', authmiddleware, getMyStore);
router.post("/upload", upload.single("image"), authmiddleware, handleImageUpload);

router.post('/:id/rate', authmiddleware, rateStore);

// Fetch all stores (Admin or public depending on your logic)
router.get("/getall", getStores);

router.delete('/delete/:id', deleteStore);

module.exports = router;
