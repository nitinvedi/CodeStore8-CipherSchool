import { useEffect, useState } from 'react';
import API from '../services/api';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import FilterBar from '../components/FilterBar';
import BookSearch from '../components/BookSearch';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ title: '', author: '', status: '' });
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await API.get('/api/books', { params: filters });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Debounce search input
  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters((prev) => ({ ...prev, title: searchQuery }));
    }, 300);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const clearFilters = () => {
    setFilters({ title: '', author: '', status: '' });
    setSearchQuery('');
  };

  return (
    <div className="max-w-[95vw] mx-auto p-6 bg-[#f6f8f8] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Book Management</h1>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition w-60"
          />
          {searchQuery && (
            <button
              className="text-gray-500 hover:text-gray-800 transition"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 transition duration-200 text-white font-medium px-5 py-2 rounded-lg shadow transform hover:scale-105"
          onClick={() => setShowModal(true)}
        >
          + Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-xl shadow mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <FilterBar filters={filters} setFilters={setFilters} />
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:text-red-700 transition"
        >
          Clear All Filters
        </button>
      </div>

      {/* Book Grid */}
      {books.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No books found. Try adjusting your filters or add a new one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {books.map((book) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard book={book} refresh={fetchBooks} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Book Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AddBookModal
              close={() => setShowModal(false)}
              refresh={fetchBooks}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Book Search */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Search Books from Google
        </h2>
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <BookSearch onBookAdd={fetchBooks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
