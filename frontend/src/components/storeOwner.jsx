import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StoreOwnerDashboard = () => {
    const [store, setStore] = useState(null);
    const [userRatings, setUserRatings] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [Users, setUsers] = useState([])


    useEffect(() => {
        const fetchStore = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/stores/my-store", {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setStore(res.data.store);
                } else {
                    alert("No store found");
                }
            } catch (err) {
                console.error(err);
                alert("Error fetching store details");
            }
        };
        const getallusers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users/getall");
                setUsers(res.data.users); // store users in state
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        getallusers();
        fetchStore();
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ));
    };

    const handleRatingChange = (storeId, star) => {
        setUserRatings((prev) => ({
            ...prev,
            [storeId]: star,
        }));
    };

    const submitRating = async (storeId) => {
        if (!userRatings[storeId]) return;
        try {
            setIsSubmitting(true);
            await axios.post(
                `http://localhost:5000/api/stores/${storeId}/rate`,
                { rating: userRatings[storeId] },
                { withCredentials: true }
            );
            alert("Rating submitted!");
        } catch (err) {
            console.error("Error submitting rating:", err);
            alert("Failed to submit rating");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = async () => {

        if (!imageFile) {
            alert("Please select an image first!");
            return;
        }
        console.log(imageFile);


        const formData = new FormData();
        formData.append("image", imageFile) // 👈 attach the file

        try {
            setIsUploading(true);
            const res = await axios.post(
                `http://localhost:5000/api/stores/upload`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (res.data.success) {
                setStore((prev) => ({ ...prev, image: res.data.imageUrl }));
                alert("Image uploaded successfully!");
            }
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };
    const handleLogout = () => {
        logout();
        navigate('/');
    };


    if (!store) return <p className="p-6">Loading store...</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">🏬 Store Dashboard</h1>

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Store Image + Upload */}
                <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
                    <img
                        src={store.image || "https://via.placeholder.com/400x200"}
                        alt={store.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="mb-2 text-sm"
                    />
                    <button
                        onClick={handleImageUpload}
                        disabled={isUploading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        {isUploading ? "Uploading..." : "Upload Image"}
                    </button>
                </div>

                {/* Store Details */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold">{store.name}</h2>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {store.category}
                        </span>
                    </div>
                    <p className="text-gray-700 mb-2">
                        <strong>📍 Location:</strong> {store.address}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>📝 Description:</strong> {store.description}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>📧 Owner Gmail:</strong> {store.email}
                    </p>

                    <div className="mt-4 flex items-center">
                        {renderStars(store.averageRating || 0)}
                        <span className="ml-2 text-sm text-gray-600">
                            {store.averageRating || 0} ({store.totalRatings || 0} ratings)
                        </span>
                    </div>
                </div>
            </div>

            {/* Ratings Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">⭐My Store's Ratings </h3>
                <ul className="space-y-2">
                    {store.ratings.map((r, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                        >
                            <span className="font-medium">{Users.find(u => u._id === r.user)?.firstName || "unknown user"}
                            </span>
                            <span className="text-yellow-500">{"⭐".repeat(r.value)}</span>
                        </li>
                    ))}
                </ul>

            </div>
            <div className="flex justify-end">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={handleLogout}
                >Logout</button>
            </div>
        </div>
    );
};

export default StoreOwnerDashboard;
