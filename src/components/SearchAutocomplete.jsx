import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../data/medicines';
import './SearchAutocomplete.css';

const SearchAutocomplete = ({ isMobile = false }) => {
  const { searchQuery, setSearchQuery } = useCart();
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const productSuggestions = normalizedQuery
    ? MOCK_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(normalizedQuery)
      )
        .sort((a, b) => {
          const aStarts = a.name.toLowerCase().startsWith(normalizedQuery);
          const bStarts = b.name.toLowerCase().startsWith(normalizedQuery);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;

          return a.name.localeCompare(b.name);
        })
        .filter(
          (product, index, array) =>
            index ===
            array.findIndex(
              (item) => item.name.toLowerCase() === product.name.toLowerCase()
            )
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectSuggestion = (product) => {
    setSearchQuery(product.name);
    setIsSuggestionsOpen(false);
    navigate('/products');
  };

  const handleKeyDown = (e) => {
    if (!isSuggestionsOpen || !normalizedQuery) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < productSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < productSuggestions.length) {
        selectSuggestion(productSuggestions[activeSuggestionIndex]);
      } else {
        setIsSuggestionsOpen(false);
        navigate('/products');
      }
    } else if (e.key === 'Escape') {
      setIsSuggestionsOpen(false);
    }
  };

  return (
    <div className={`search-autocomplete ${isMobile ? 'mobile-mode' : 'desktop-mode hidden-mobile'}`} ref={containerRef}>
      <div className={`search-input-wrapper ${isMobile ? 'search-bar-mobile' : 'search-bar'}`}>
        {!isMobile && (
          <input
            type="search"
            className="search-input"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setIsSuggestionsOpen(true);
              setActiveSuggestionIndex(-1);
            }}
            onFocus={() => {
              if (searchQuery.trim()) {
                setIsSuggestionsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search medicines, composition, generics..."
            role="combobox"
            aria-expanded={isSuggestionsOpen}
            aria-controls={isMobile ? "mobile-medicine-suggestions" : "desktop-medicine-suggestions"}
            aria-autocomplete="list"
            aria-activedescendant={
              activeSuggestionIndex >= 0
                ? `medicine-suggestion-${activeSuggestionIndex}`
                : undefined
            }
          />
        )}
        
        {isMobile && (
          <input
            type="search"
            className="search-input"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setIsSuggestionsOpen(true);
              setActiveSuggestionIndex(-1);
            }}
            onFocus={() => {
              if (searchQuery.trim()) {
                setIsSuggestionsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search medicines, composition, generics..."
            role="combobox"
            aria-expanded={isSuggestionsOpen}
            aria-controls={isMobile ? "mobile-medicine-suggestions" : "desktop-medicine-suggestions"}
            aria-autocomplete="list"
            aria-activedescendant={
              activeSuggestionIndex >= 0
                ? `medicine-suggestion-${activeSuggestionIndex}`
                : undefined
            }
            autoFocus
          />
        )}

        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setIsSuggestionsOpen(false);
              setActiveSuggestionIndex(-1);
            }}
            className="clear-search-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              marginRight: isMobile ? '0' : '0.5rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        
        {!isMobile && (
          <button type="button" className="search-btn" aria-label="Search" onClick={() => navigate('/products')}>
            <Search size={18} />
          </button>
        )}
      </div>

      {isSuggestionsOpen && normalizedQuery && (
        <div
          id={isMobile ? "mobile-medicine-suggestions" : "desktop-medicine-suggestions"}
          className="search-suggestions"
          role="listbox"
        >
          {productSuggestions.length > 0 ? (
            productSuggestions.map((product, index) => (
              <button
                key={product.id}
                id={`medicine-suggestion-${index}`}
                type="button"
                className={`search-suggestion-item ${
                  index === activeSuggestionIndex ? 'is-active' : ''
                }`}
                role="option"
                aria-selected={index === activeSuggestionIndex}
                onMouseDown={(event) => {
                  event.preventDefault(); // Prevents input blur
                  selectSuggestion(product);
                }}
              >
                {product.name}
              </button>
            ))
          ) : (
            <div className="search-no-results">No medicines found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
