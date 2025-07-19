import { useState } from 'react';
import API from '../services/api';

const AddBookModal = ({ close, refresh }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    status: 'To Read',
  });
  const [cover, setCover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in form) {
      data.append(key, form[key]);
    }
    if (cover) data.append('cover', cover);

    try {
      await API.post('/api/books', data);
      close();
      refresh();
    } catch (err) {
      console.error('Book upload failed:', err);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📘 Add New Book</h2>

        <div className="space-y-2">
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title *"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Author *"
            required
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2"
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          />
          <select
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>To Read</option>
            <option>Reading</option>
            <option>Read</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookModal;
