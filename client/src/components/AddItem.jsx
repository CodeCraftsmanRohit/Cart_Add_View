import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: []
  });
  const [success, setSuccess] = useState(false);
  const [additionalImage, setAdditionalImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddImage = () => {
    if (additionalImage.trim()) {
      setFormData({
        ...formData,
        additionalImages: [...formData.additionalImages, additionalImage]
      });
      setAdditionalImage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://cart-add-view.onrender.com/api/items', formData);
      setSuccess(true);
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: '',
        additionalImages: []
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Item</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Item successfully added
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Item Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Item Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Cover Image URL:</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full p-2 border rounded"

          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Additional Images:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={additionalImage}
              onChange={(e) => setAdditionalImage(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {formData.additionalImages.map((img, index) => (
              <div key={index} className="w-16 h-16">
                <img
                  src={img}
                  alt={`Additional ${index}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;