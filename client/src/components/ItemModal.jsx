import React, { useState } from 'react';

const ItemModal = ({ item, onClose, onEnquire }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [enquiryMessage, setEnquiryMessage] = useState('');

  const allImages = [item.coverImage, ...item.additionalImages];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleEnquire = () => {
    onEnquire(item.name, enquiryMessage);
    setEnquiryMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-200 animate-fadeIn">
    <div className="flex justify-between items-center p-5 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-red-600 text-2xl"
      >
        &times;
      </button>
    </div>

    <div className="md:flex">
      <div className="md:w-1/2 relative p-6">
        <img
          src={allImages[currentImageIndex]}
          alt={item.name}
          className="w-full h-64 md:h-96 object-contain rounded-xl border border-gray-200"
        />
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-gray-600 hover:text-black p-2 rounded-full shadow-lg"
            >
              &lt;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-gray-600 hover:text-black p-2 rounded-full shadow-lg"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      <div className="md:w-1/2 p-6 space-y-5">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Type:</h3>
          <p className="text-gray-800">{item.type}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Description:</h3>
          <p className="text-gray-700">{item.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Enquiry:</h3>
          <textarea
            placeholder="Your enquiry message..."
            value={enquiryMessage}
            onChange={(e) => setEnquiryMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <button
          onClick={handleEnquire}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
        >
          Enquire
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ItemModal;