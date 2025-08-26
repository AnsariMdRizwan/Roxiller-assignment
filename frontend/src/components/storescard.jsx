import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Storescard = () => {
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/stores/getall");
                setStores(res.data.stores || []); // backend should send { stores: [...] }
            } catch (err) {
                console.error("Error fetching stores:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStores();
    }, []);
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                    <div key={store._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 overflow-hidden">
                            <img
                                src={store.image}
                                alt={store.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {store.category}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">{store.address}</p>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Storescard
