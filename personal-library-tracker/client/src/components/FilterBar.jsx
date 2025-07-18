const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 bg-white p-4 rounded-xl shadow mb-4">
      <input
        className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Filter by Title"
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />
      <input
        className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Filter by Author"
        value={filters.author}
        onChange={(e) => setFilters({ ...filters, author: e.target.value })}
      />
      <select
        className="flex-1 border border-gray-300 p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="To Read">📖 To Read</option>
        <option value="Reading">📘 Reading</option>
        <option value="Read">✅ Read</option>
      </select>
    </div>
  );
};

export default FilterBar;
