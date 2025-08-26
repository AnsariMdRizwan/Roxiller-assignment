import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Addnewuserform from "./addnewuserform";


export default function AdminDashboard() {
    const [filter, setFilter] = useState("");
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", password: "", address: "", role: "User" });
    const [users, setUsers] = useState([]);
    const [request, setRequest] = useState([]);
    const [stores, setStores] = useState([])


    useEffect(() => {
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
        const getallRequest = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users/getrequests");
                setRequest(res.data.requests);
                // store users in state
                // store users in state
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        const getallStore = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/stores/getall");
                setStores(res.data.stores); // store users in state
                console.log(res.data.stores);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        getallStore();
        getallusers();
        getallRequest();
    }, []);


    const totalUsers = users?.length || 0;
    const totalStores = stores?.length;
    const totalRatings = (stores ?? []).reduce((sum, s) => sum + (s.averageRating ?? 0), 0);


    const filteredRequests = Array.isArray(request)
        ? request.filter((r) =>
            r.name?.toLowerCase().includes(filter.toLowerCase()) ||
            r.email?.toLowerCase().includes(filter.toLowerCase()) ||
            r.category?.toLowerCase().includes(filter.toLowerCase()) ||
            r.address?.toLowerCase().includes(filter.toLowerCase())
        )
        : [];


    const filteredUsers = Array.isArray(users)
        ? users.filter((u) =>
            `${u.firstName ?? ""} ${u.lastName ?? ""}`
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
            u.email?.toLowerCase().includes(filter.toLowerCase()) ||
            u.address?.toLowerCase().includes(filter.toLowerCase()) ||
            u.role?.toLowerCase().includes(filter.toLowerCase())
        )
        : [];



    const filteredStores = (stores || []).filter((s) =>
        [s.name, s.email, s.address].some((field) =>
            field?.toLowerCase().includes(filter.toLowerCase())
        )
    );

    const handleAddUser = async () => {
        try {
            // Send POST request to backend
            const res = await axios.post("http://localhost:5000/api/auth/register", newUser);

            console.log(res);


            setUsers([...users, res.data.user]);
            window.location.reload()

            // Reset form
            setShowAddUserForm(false);
            setNewUser({ firstName: "", lastName: "", email: "", password: "", address: "", role: "User" });
            if (res.data.success) {

            } else {
                alert("Failed to register user: " + res.data.message);
            }
        } catch (err) {
            console.error("Error registering user:", err);
            toast.error(err.message)
        }
    };


    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);



    const handleLogout = () => {
        logout();

        navigate('/');
    };
    const handleAccept = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/users/requests/accept/${id}`);
            console.log(res);

            if (res.status === 201) {
                toast.info(res.data.message);
                // refresh requests & stores list
                setRequest(prev => prev.filter(r => r._id !== id));
            }
        } catch (err) {
            console.error("Error accepting request:", err);
        }
    };


    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/requests/${id}`, { method: "DELETE" });
            console.log(res);
            toast.success("Request Deleted!");
            if (res.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditRole = async (id) => {
        const newRole = prompt("Enter new role (User, Admin, StoreOwner):");

        if (!newRole) return;

        try {
            const res = await axios.put(
                `http://localhost:5000/api/users/update-role/${id}`,
                { role: newRole },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.success) {
                alert("Role updated successfully!");
                // Refresh list or update state directly
                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === id ? { ...user, role: newRole } : user
                    )
                );
            } else {
                alert("Failed to update role");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating role");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow-lg rounded-xl p-4 text-center">
                    <h2 className="text-xl font-semibold">Total Users</h2>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-4 text-center">
                    <h2 className="text-xl font-semibold">Total Stores</h2>
                    <p className="text-2xl font-bold">{totalStores}</p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-4 text-center">
                    <h2 className="text-xl font-semibold">Total Requests</h2>
                    <p className="text-2xl font-bold">{request.length}</p>
                </div>
            </div>

            {/* Filter Input & Add User Button */}
            <div className="mb-6 flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Filter by Name, Email, Address, Role"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full md:w-1/2"
                />
                <button onClick={() => setFilter("")} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Clear</button>
                <button onClick={() => setShowAddUserForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add User</button>
            </div>

            {/* Add User Form */}
            <Addnewuserform
                showAddUserForm={showAddUserForm}
                setShowAddUserForm={setShowAddUserForm}
                newUser={newUser}
                setNewUser={setNewUser}
                handleAddUser={handleAddUser}

            />

            {/* Users Table */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Rating (if StoreOwner)</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...filteredUsers]
                            .sort((a, b) => a.firstName.localeCompare(b.firstName)) // sort alphabetically
                            .map((user, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-100">
                                    <td className="p-2">{user.firstName}</td>
                                    <td className="p-2">{user.email}</td>

                                    <td className="p-2">{user.role}</td>
                                    {user.role === "StoreOwner"
                                        ? (stores.find((s) => s.email === user.email)?.averageRating ?? "-") + "⭐"
                                        : "-"}
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleEditRole(user._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Edit Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>

            {/* Stores Table */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-2xl font-semibold mb-4">Stores</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Address</th>
                            <th className="p-2">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...filteredStores]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((store, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-100">
                                    <td className="p-2">{store.name}</td>
                                    <td className="p-2">{store.email}</td>
                                    <td className="p-2">{store.address}</td>
                                    <td className="p-2">{store.averageRating}⭐</td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
            <div className="mb-8 bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-2xl font-semibold mb-4">Requests</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">category</th>
                            <th className="p-2">Address</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-100">
                                <td className="p-2">{request.name}</td>
                                <td className="p-2">{request.email}</td>
                                <td className="p-2">{request.category}</td>
                                <td className="p-2">{request.address}</td>
                                <td className="p-2 flex gap-2">
                                    <button
                                        onClick={() => handleAccept(request._id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDelete(request._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Logout Button */}
            <div className="flex justify-end">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={handleLogout}
                >Logout</button>
            </div>
        </div>
    );
}
