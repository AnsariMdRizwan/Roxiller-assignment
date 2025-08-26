import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoreRequestCard from './request-card';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stores/getall");
        setStores(res.data.stores || []);
      } catch (err) {
        console.error("Error fetching stores:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    address: "",
    image: "",
  });

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:5000/api/users/requests",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console

      toast.success(result.message);


      setShowForm(false);
      setFormData({ name: "", email: "", category: "", address: "", image: "" });
    } catch (error) {
      console.error("Error submitting request:", error.response?.data || error.message);
      toast.error(result.message);
    }
  };

  useEffect(() => {

    setTimeout(() => {

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRatingChange = (storeId, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [storeId]: rating
    }));
  };

  const submitRating = async (storeId) => {
    const rating = userRatings[storeId];
    if (!rating) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/stores/${storeId}/rate`,
        { rating },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const { averageRating, totalRatings, userRating } = res.data.store;


      setStores(prev =>
        prev.map(store =>
          store._id === storeId
            ? { ...store, averageRating, totalRatings, userSubmittedRating: userRating }
            : store
        )
      );


      setUserRatings(prev => {
        const newRatings = { ...prev };
        delete newRatings[storeId];
        return newRatings;
      });

      toast.success("Rating submited");
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || error.message);
      alert("Failed to submit rating. Please try again.");
    }
  };


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating)
          ? 'text-yellow-400 fill-current'
          : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
          }`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stores...</p>
        </div>
      </div>
    );
  }
  JSON.stringify(user)
  JSON.stringify(stores)




  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Store Ratings Platform</h1>
              <p className="text-sm text-gray-600">Welcome back,<span className='text-lime-500 text-xl'>{user.firstName}</span> !</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Logout
              </button>

              <button
                onClick={() => setShowForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Request Store Listing
              </button>
              <button
                onClick={() => navigate("/change-password")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            </div>


          </div>
        </div>
      </header>
      {showForm && (
        <StoreRequestCard
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitRequest}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Rate Your Favorite Stores</h2>
          <p className="text-gray-600">Share your experience and help others discover great stores</p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => {

            const userHasRatedThisStore = store.ratings.some(r => r.user === user.id);

            return (
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

                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {renderStars(store.averageRating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {store.averageRating} ({store.totalRatings} ratings)
                    </span>
                  </div>

                  {/* Rating Section */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Rate this store:</p>
                    <div className="flex items-center space-x-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingChange(store._id, star)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors ${userRatings[store._id] === star
                            ? 'border-yellow-400 bg-yellow-400 text-white'
                            : 'border-gray-300 hover:border-yellow-400'
                            }`}
                        >
                          {star}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => submitRating(store._id)}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      {userHasRatedThisStore ? "Update Rating" : "Submit Rating"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}



        </div>
      </main>
    </div>
  );
};

export default Dashboard;
