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
  const [loading, setLoading] = useState(false);

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/books', { params: filters });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <h1 className="text-3xl font-bold text-gray-800">My Library</h1>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchBooks()}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {searchQuery && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-all"
          onClick={() => setShowModal(true)}
        >
          + Add Book
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <FilterBar filters={filters} setFilters={setFilters} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-sm text-red-500 hover:text-red-700 transition"
          onClick={clearFilters}
        >
          Clear All Filters
        </motion.button>
      </div>

      {/* Book Grid */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10 text-lg">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No books found. Adjust your filters or add a new one.
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
                whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
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
            <AddBookModal close={() => setShowModal(false)} refresh={fetchBooks} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Book Search */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Search Books from Google
        </h2>
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow">
          <BookSearch onBookAdd={fetchBooks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
