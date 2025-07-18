import API from '../services/api';

const BookCard = ({ book, refresh }) => {
  const handleDelete = async () => {
    if (window.confirm("Delete this book?")) {
      await API.delete(`/api/books/${book._id}`);
      refresh();
    }
  };

  return (
    <div className="border p-4 rounded shadow space-y-2 bg-white">
      {book.cover && (
        <img
          src={`http://localhost:5000/uploads/${book.cover}`}
          alt="cover"
          className="w-full h-48 object-cover rounded"
        />
      )}
      <div>
        <h3 className="text-lg font-bold">{book.title}</h3>
        <p><span className="font-semibold">Author:</span> {book.author}</p>
        <p><span className="font-semibold">Genre:</span> {book.genre}</p>
        <p><span className="font-semibold">Status:</span> {book.status}</p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default BookCard;
