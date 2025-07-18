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

        <div className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📚 My Books</h1>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}
                >
                    + Add Book
                </button>
            </div>

            <FilterBar filters={filters} setFilters={setFilters} />

            <div className="grid md:grid-cols-3 gap-4 mt-4">
                {books.map(book => (
                    <BookCard key={book._id} book={book} refresh={fetchBooks} />
                ))}
            </div>

            {showModal && <AddBookModal close={() => setShowModal(false)} refresh={fetchBooks} />}

            <h2 className="text-xl font-semibold mt-6 mb-2">🔎 Search Google Books</h2>
            <BookSearch onBookAdd={fetchBooks} />
        </div>
    );
};

export default Dashboard;
