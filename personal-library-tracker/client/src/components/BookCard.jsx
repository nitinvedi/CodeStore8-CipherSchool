import { useState } from 'react';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

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
    'To Read': 'bg-yellow-200 text-yellow-800',
    'Reading': 'bg-blue-200 text-blue-800',
    'Read': 'bg-green-200 text-green-800',
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer flex flex-col h-full"
      whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.15)' }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      {/* Book Cover */}
      <div className="relative w-full h-64 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-xl">
        <motion.img
          src={imageSrc}
          alt="cover"
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://loremflickr.com/400/600/books?random=${Math.floor(Math.random() * 10000)}`;
          }}
        />
      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-800 truncate">{book.title}</h3>
          <p className="text-gray-600 text-sm truncate">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-600 text-sm truncate">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          {/* Status Badge */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColor[book.status]} transition-all duration-300`}
          >
            {book.status}
          </span>

          {/* Delete Button */}
          <AnimatePresence>
            {hover && (
              <motion.button
                onClick={handleDelete}
                className="ml-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1 transition"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                Delete
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
