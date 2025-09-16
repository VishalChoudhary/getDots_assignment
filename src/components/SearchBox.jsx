import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import searchData from "../data/searchData.json";
import "../styles/SearchBox.css";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredData([]);
      setLoading(false);
      return;
    }

    setLoading(true); // start loading when user types

    const handler = setTimeout(() => {
      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(results);
      setLoading(false); // stop loading once results are ready
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className={`search-container ${isOpen ? "active" : ""}`}>
      <div className="search-box">
        <Search className="icon" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {query && (
          <X className="clear-icon" onClick={() => setQuery("")} />
        )}
      </div>

      {isOpen && query && (
        <div className="search-results">
          {loading ? (
            <div className="loading">Searching...</div>
          ) : filteredData.length > 0 ? (
            filteredData.map(item => (
              <div key={item.id} className="result-item">
                {item.title}
              </div>
            ))
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}