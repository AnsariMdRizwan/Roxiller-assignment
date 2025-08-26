import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        try {
            const res = await axios.put(
                "http://localhost:5000/api/users/change-password",
                {
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            toast.success(res.data.message || "Password updated successfully!");
            navigate("/dashboard"); // ✅ redirect back to dashboard
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="w-full border rounded p-2"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        className="w-full border rounded p-2"
                        required
                    />

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
