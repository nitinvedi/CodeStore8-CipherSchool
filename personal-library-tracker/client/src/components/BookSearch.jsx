import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = ({ onBookAdd }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setResults(res.data.items || []);
    } catch (err) {
      console.error('Google Books search error:', err);
    }
  };

  const handleAddBook = async (book) => {
    const volume = book.volumeInfo;
    const newBook = {
      title: volume.title || 'Untitled',
      author: volume.authors?.join(', ') || 'Unknown',
      genre: volume.categories?.[0] || 'Unknown',
      status: 'To Read',
      coverImage: volume.imageLinks?.thumbnail || '',
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/books', newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onBookAdd();
    } catch (err) {
      console.error('Error adding book to library:', err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search To Add Books From Google</h2>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Type book title or author..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {results.map((book) => {
          const info = book.volumeInfo;
          const hasImage = info.imageLinks?.thumbnail;

          return (
            <div
              key={book.id}
              className="flex items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={hasImage ? info.imageLinks.thumbnail : '/default-cover.png'}
                alt={info.title || 'No Title'}
                className="w-20 h-28 object-cover rounded border"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{info.title || 'Untitled'}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {info.authors?.join(', ') || 'Unknown'}
                </p>
                <button
                  onClick={() => handleAddBook(book)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded transition"
                >
                  ➕ Add to My Library
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookSearch;
