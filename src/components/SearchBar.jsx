import { IoSearchOutline } from "react-icons/io5";
export default function SearchBar({
  city,
  setCity,
  suggestions,
  fetchSuggestions,
  handleSearch,
  handleSuggestionClick,
}) {
  return (
    <div className="relative mb-5 sm:mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search City"
        className="w-full px-5 py-3 rounded-full bg-white/10 placeholder-white text-white focus:outline-none border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-lg"
      />
      <button
        onClick={handleSearch}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-xl hover:scale-110 transition-transform cursor-pointer"
      >
        <IoSearchOutline />
      </button>

      {suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-900 rounded-lg z-10 border border-white/20">
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => handleSuggestionClick(s.name)}
              className="px-4 py-2 hover:bg-white/20 cursor-pointer text-white"
            >
              {s.name}, {s.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
