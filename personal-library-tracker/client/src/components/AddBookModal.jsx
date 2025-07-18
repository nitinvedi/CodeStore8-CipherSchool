import { useState } from 'react';
import API from '../services/api';

const AddBookModal = ({ close, refresh }) => {
  const [form, setForm] = useState({
    title: '', author: '', genre: '', status: 'To Read'
  });
  const [cover, setCover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (cover) data.append('cover', cover);

    try {
      await API.post('/api/books', data);
      close();
      refresh();
    } catch (err) {
      alert('Failed to add book');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Add New Book</h2>
        <input className="w-full border p-2" placeholder="Title" required onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="w-full border p-2" placeholder="Author" required onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input className="w-full border p-2" placeholder="Genre" onChange={(e) => setForm({ ...form, genre: e.target.value })} />
        <select className="w-full border p-2" onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option>To Read</option>
          <option>Reading</option>
          <option>Read</option>
        </select>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        <div className="flex justify-between">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add</button>
          <button className="text-gray-600" type="button" onClick={close}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddBookModal;
