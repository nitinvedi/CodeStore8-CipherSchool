import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterBar = ({ filters, setFilters }) => {
  const handleClear = () => {
    setFilters({ title: '', author: '', status: '' });
  };

  const removeFilter = (key) => {
    setFilters({ ...filters, [key]: '' });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      {/* Input Fields */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <input
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <input
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Filter by Author"
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
        />
        <select
          className="flex-1 border border-gray-300 p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="To Read">📖 To Read</option>
          <option value="Reading">📘 Reading</option>
          <option value="Read">✅ Read</option>
        </select>
      </div>

      {/* Active Filter Chips */}
      <div className="flex flex-wrap gap-2 mt-3">
        <AnimatePresence>
          {filters.title && (
            <motion.div
              key="title"
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Title: {filters.title}
              <button onClick={() => removeFilter('title')} className="font-bold">&times;</button>
            </motion.div>
          )}
          {filters.author && (
            <motion.div
              key="author"
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Author: {filters.author}
              <button onClick={() => removeFilter('author')} className="font-bold">&times;</button>
            </motion.div>
          )}
          {filters.status && (
            <motion.div
              key="status"
              className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Status: {filters.status}
              <button onClick={() => removeFilter('status')} className="font-bold">&times;</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear All Button */}
      {(filters.title || filters.author || filters.status) && (
        <div className="mt-3 text-right">
          <button
            onClick={handleClear}
            className="text-sm text-gray-600 hover:text-gray-800 transition underline"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
