import React from 'react'

const Demo = () => {
    return (
        <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-md text-sm text-gray-700">
            <p className="font-semibold mb-3 text-center">Demo Credentials</p>

            <div className="grid grid-cols-1 gap-4">
                {/* Normal User */}
                <div className="bg-white border rounded-lg p-3 shadow-sm">
                    <p className="font-semibold text-indigo-600">Normal User</p>
                    <p>Email: <span className="font-mono">priya.nair@example.com</span></p>
                    <p>Email: <span className="font-mono">kabir.verma@example.com</span></p>
                    <p>Password: <span className="font-mono font-bold">A@123456</span></p>
                </div>

                {/* Admin */}
                <div className="bg-white border rounded-lg p-3 shadow-sm">
                    <p className="font-semibold text-green-600">Admin</p>
                    <p>Email: <span className="font-mono">ar@gmail.com</span></p>
                    <p>Password: <span className="font-mono font-bold">Rizwan@7878</span></p>
                </div>

                {/* Store Owner */}
                <div className="bg-white border rounded-lg p-3 shadow-sm">
                    <p className="font-semibold text-purple-600">Store Owner</p>
                    <p>Email: <span className="font-mono">ishita.gupta@example.com</span></p>
                    <p>Email: <span className="font-mono">rohan.kapoor@example.com</span></p>
                    <p>Email: <span className="font-mono">aarav.sharma@example.com</span></p>
                    <p>Password: <span className="font-mono font-bold">A@123456</span></p>
                </div>
            </div>
        </div>

    )
}

export default Demo
