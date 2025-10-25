import { useState } from 'react';
import API from '../services/api';
import { motion } from 'framer-motion';

const BookCard = ({ book, refresh }) => {
  const backendURL = import.meta.env.VITE_API || 'http://localhost:5000';
  const [hover, setHover] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await API.delete(`/api/books/${book._id}`);
        refresh();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Something went wrong. Try again.');
      }
    }
  };

  const randomBookCover = `https://loremflickr.com/400/600/books?random=${Math.floor(Math.random() * 10000)}`;
  const imageSrc = book.cover ? `${backendURL}/uploads/${book.cover}` : randomBookCover;

  const statusColor = {
    'To Read': 'bg-yellow-300 text-yellow-800',
    'Reading': 'bg-blue-300 text-blue-800',
    'Read': 'bg-green-300 text-green-800',
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <img
        src={imageSrc}
        alt="cover"
        className="w-full h-56 object-cover transition-all duration-300"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://loremflickr.com/400/600/books?random=${Math.floor(Math.random() * 10000)}`;
        }}
      />
      
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
        <p className="text-gray-600"><span className="font-semibold">Author:</span> {book.author}</p>
        <p className="text-gray-600"><span className="font-semibold">Genre:</span> {book.genre}</p>

        {/* Status Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor[book.status]}`}>
          {book.status}
        </span>

        {/* Quick Actions (only on hover) */}
        {hover && (
          <div className="mt-3 flex gap-2">
            {/* Delete */}
            <button
              onClick={handleDelete}
              className="flex-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md py-1 transition"
            >
              Delete
            </button>

            {/* Mark as Read */}
            {book.status !== 'Read' && (
              <button
                onClick={async () => {
                  try {
                    await API.put(`/api/books/${book._id}`, { status: 'Read' });
                    refresh();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="flex-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md py-1 transition"
              >
                Mark as Read
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
