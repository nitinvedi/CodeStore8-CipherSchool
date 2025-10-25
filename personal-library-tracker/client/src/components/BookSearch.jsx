import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const BookSearch = ({ onBookAdd }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setResults(res.data.items || []);
    } catch (err) {
      console.error('Google Books search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (book) => {
    const volume = book.volumeInfo;
    const newBook = {
      title: volume.title || 'Untitled',
      author: volume.authors?.join(', ') || 'Unknown',
      genre: volume.categories?.[0] || 'Unknown',
      status: 'To Read',
      cover: volume.imageLinks?.thumbnail || '',
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://library-backend-w3ha.onrender.com/api/books', newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onBookAdd();
    } catch (err) {
      console.error('Error adding book to library:', err);
      alert('Failed to add book. Try again.');
    }
  };

  // ✅ Fix: use onKeyDown for Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchBooks();
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Search & Add Books from Google
      </h2>

      {/* Search Input */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Type book title or author..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // <- Enter key works now
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Loading & Empty States */}
      {loading && (
        <p className="text-gray-500 text-center my-4">Loading books...</p>
      )}

      {!loading && results.length === 0 && query && (
        <p className="text-gray-500 text-center my-4">No books found for "{query}"</p>
      )}

      {/* Book Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {results.map((book) => {
            const info = book.volumeInfo;
            const hasImage = info.imageLinks?.thumbnail;

            return (
              <motion.div
                key={book.id}
                className="flex flex-col bg-gray-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <img
                  src={hasImage ? info.imageLinks.thumbnail : '/default-cover.png'}
                  alt={info.title || 'Untitled'}
                  className="w-full h-48 object-cover rounded-t-xl border-b"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-800 truncate">{info.title || 'Untitled'}</h3>
                    <p className="text-sm text-gray-600 truncate">
                      {info.authors?.join(', ') || 'Unknown Author'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddBook(book)}
                    className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded transition self-start"
                    title="Add to My Library"
                  >
                    ➕ Add to Library
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookSearch;
