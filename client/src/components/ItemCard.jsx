import React from 'react';

const ItemCard = ({ item, onItemClick }) => {
  return (
   <div
  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100"
  onClick={() => onItemClick(item)}
>
  <img
    src={item.coverImage}
    alt={item.name}
    className="w-full h-52 object-cover rounded-t-2xl"
  />
  <div className="p-4">
    <h3 className="text-xl font-bold text-gray-800 text-center tracking-wide">
      {item.name}
    </h3>
  </div>
</div>

  );
};

export default ItemCard;