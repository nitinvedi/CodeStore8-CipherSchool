const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={filters.title}
        onChange={e => setFilters({ ...filters, title: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Author"
        value={filters.author}
        onChange={e => setFilters({ ...filters, author: e.target.value })}
      />
      <select
        className="border p-2 w-full"
        value={filters.status}
        onChange={e => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="To Read">To Read</option>
        <option value="Reading">Reading</option>
        <option value="Read">Read</option>
      </select>
    </div>
  );
};

export default FilterBar;
