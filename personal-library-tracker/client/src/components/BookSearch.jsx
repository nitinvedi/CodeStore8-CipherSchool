import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = ({ onBookAdd }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchBooks = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setResults(res.data.items || []);
    } catch (err) {
      console.error('Google Books search error:', err);
    }
  };

  const handleAddBook = async (book) => {
    const volume = book.volumeInfo;
    const newBook = {
      title: volume.title || 'Untitled',
      author: (volume.authors && volume.authors.join(', ')) || 'Unknown',
      genre: volume.categories ? volume.categories[0] : 'Unknown',
      status: 'To Read',
      coverImage: volume.imageLinks?.thumbnail || '',
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/books', newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onBookAdd(); // Refresh book list
    } catch (err) {
      console.error('Error adding book to library:', err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-2">📚 Search & Add from Google Books</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for books..."
          className="border p-2 flex-1 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((book) => {
          const info = book.volumeInfo;
          return (
            <div key={book.id} className="border p-4 rounded shadow flex gap-4 items-center">
              <img
                src={info.imageLinks?.thumbnail}
                alt={info.title}
                className="w-20 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold">{info.title}</h3>
                <p className="text-sm text-gray-600">by {info.authors?.join(', ')}</p>
                <button
                  onClick={() => handleAddBook(book)}
                  className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
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
