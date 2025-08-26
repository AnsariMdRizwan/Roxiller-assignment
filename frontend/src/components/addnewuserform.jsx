import React from 'react'

const Addnewuserform = ({ showAddUserForm, newUser, setNewUser, handleAddUser, setShowAddUserForm }) => {
    return (
        <>
            {showAddUserForm && (
                <div className="mb-8 bg-white rounded-xl shadow-lg p-4">
                    <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="firstName"
                            value={newUser.firstName}
                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                            className="border rounded-lg px-4 py-2"
                        />
                        <input
                            type="text"
                            placeholder="lastName"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                            className="border rounded-lg px-4 py-2"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="border rounded-lg px-4 py-2"
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="border rounded-lg px-4 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Role (User/Admin/StoreOwner)"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="border rounded-lg px-4 py-2"
                        />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <button onClick={handleAddUser} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save</button>
                        <button onClick={() => setShowAddUserForm(false)} className="px-4 py-2 bg-gray-400 rounded-lg hover:bg-gray-500">Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Addnewuserform
