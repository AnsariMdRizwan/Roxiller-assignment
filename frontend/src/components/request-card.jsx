// StoreRequestCard.jsx
import React from "react";
import { toast } from "react-toastify";

const StoreRequestCard = ({ formData, setFormData, onSubmit, onClose }) => {
    return (
        <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Request a Store Listing
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Store Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border rounded-md px-3 py-2"
                        required
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border rounded-md px-3 py-2"
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        ⚠️ Please use the same email you used during registration.
                    </p>
                    <input
                        type="text"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border rounded-md px-3 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => {
                            if (e.target.value.length <= 400) {
                                setFormData({ ...formData, address: e.target.value });
                            } else {
                                toast.error("Address cannot exceed 400 characters");
                            }
                        }}
                        className="w-full border rounded-md px-3 py-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL (optional)"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={() => {
                                if (onSubmit) {
                                    toast.success("Request sent");
                                }
                            }}
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreRequestCard;
