import API from '../services/api';

const BookCard = ({ book, refresh }) => {
  const backendURL = import.meta.env.VITE_API || 'http://localhost:5000';

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

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
      {book.cover && (
        <img
        src={
          book.cover
            ? book.cover.startsWith('http')
              ? book.cover
              : `${backendURL}/uploads/${book.cover}`
            : '/default-cover.png'
        }
        alt={book.title || 'Book Cover'}
        className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
        <p className="text-gray-600"><span className="font-semibold">Author:</span> {book.author}</p>
        <p className="text-gray-600"><span className="font-semibold">Genre:</span> {book.genre}</p>
        <p className="text-gray-600"><span className="font-semibold">Status:</span> {book.status}</p>
        <button
          onClick={handleDelete}
          className="mt-2 inline-block text-sm text-red-500 hover:text-red-700 hover:underline transition border-2 rounded-md p-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
