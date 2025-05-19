"use client";

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

const Search = ({ query, setQuery }: Props) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search products"
      />
    </div>
  );
};

export default Search;
