"use client";

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

const Search = ({ query, setQuery }: Props) => {
  return (
    <div className="flex justify-end items-center w-full mb-4 px-4">
      <input
        type="text"
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-full text-base bg-white transition-colors focus:outline-none focus:border-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search products"
      />
    </div>
  );
};

export default Search;
