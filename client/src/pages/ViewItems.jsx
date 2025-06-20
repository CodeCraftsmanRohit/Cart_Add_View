import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch items on mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/view")
      .then((res) => setItems(res.data.items))
      .catch((err) => {
        console.error("Error fetching items:", err);
        toast.error("Failed to fetch items");
      });
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setCarouselIndex(0);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const nextImage = () => {
    if (selectedItem?.additionalImages?.length > 1) {
      setCarouselIndex((carouselIndex + 1) % selectedItem.additionalImages.length);
    }
  };

  const prevImage = () => {
    if (selectedItem?.additionalImages?.length > 1) {
      setCarouselIndex(
        (carouselIndex - 1 + selectedItem.additionalImages.length) %
          selectedItem.additionalImages.length
      );
    }
  };

  const handleEnquire = async () => {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");

    if (!name || !email) return alert("Name and email are required!");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/api/enquire", {
        name,
        email,
        itemName: selectedItem.name,
      });
      toast.success(res.data.message || "Enquiry sent!");
    } catch (err) {
      console.error("Enquiry error:", err);
      toast.error("Failed to send enquiry.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-white to-gray-100 min-h-screen">
    <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-wide border-b-4 border-green-500 inline-block">
      View Items
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => openModal(item)}
          className="bg-white rounded-xl shadow-lg p-5 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100"
        >
          <img
            src={item.coverImage}
            alt={item.name}
            className="h-52 w-full object-cover rounded-lg mb-4 shadow-sm"
          />
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            {item.name}
          </h3>
        </div>
      ))}
    </div>

    {/* Modal */}
    {selectedItem && (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-[600px] p-6 relative animate-fadeIn">
          <button
            onClick={closeModal}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            {selectedItem.name}
          </h2>
          <p className="mb-5 text-gray-600">{selectedItem.description}</p>

          {/* Image Carousel */}
          {selectedItem.additionalImages.length > 0 ? (
            <div className="relative mb-6">
              <img
                src={selectedItem.additionalImages[carouselIndex]}
                alt={`Image ${carouselIndex + 1}`}
                className="w-full h-64 object-cover rounded-xl border border-gray-200 shadow"
              />
              {selectedItem.additionalImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-600 hover:text-black px-3 py-1 rounded-full shadow-md"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-600 hover:text-black px-3 py-1 rounded-full shadow-md"
                  >
                    &#8594;
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="text-gray-400 italic">No additional images</p>
          )}

          <button
            onClick={handleEnquire}
            disabled={loading}
            className={`w-full py-2 mt-2 text-lg font-semibold rounded-lg transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
          >
            {loading ? "Sending..." : "Enquire"}
          </button>
        </div>
      </div>
    )}
  </div>
);
}
export default ViewItems;