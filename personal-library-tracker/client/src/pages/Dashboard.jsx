import { useEffect, useState } from 'react';
import API from '../services/api';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import FilterBar from '../components/FilterBar';
import BookSearch from '../components/BookSearch';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ title: '', author: '', status: '' });
  const [showModal, setShowModal] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/api/books', { params: filters });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  return (
    <div className="max-w-[90vw] mx-auto p-6 bg-[#e6f9ff]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Book Management</h1>
        <button
          className="bg-green-600 hover:bg-green-700 transition duration-200 text-white font-medium px-5 py-2 rounded-lg shadow"
          onClick={() => setShowModal(true)}
        >
          + Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-xl shadow mb-6">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Book Grid */}
      {books.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No books found. Try adjusting your filters or add a new one.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard key={book._id} book={book} refresh={fetchBooks} />
          ))}
        </div>
      )}

      {/* Add Book Modal */}
      {showModal && <AddBookModal close={() => setShowModal(false)} refresh={fetchBooks} />}

      {/* Google Book Search */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3"> Search Books from Google</h2>
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <BookSearch onBookAdd={fetchBooks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
