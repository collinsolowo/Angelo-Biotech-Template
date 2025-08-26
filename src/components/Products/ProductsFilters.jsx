import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

const ProductsFilters = ({ filters, onFilterChange, totalResults = 0 }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filterRef = useRef();
  const searchRef = useRef();

  const categories = [
    'All Categories',
    'Nutritional Health',
    'Household',
    'Home Technology',
    'Beauty & Skin Care'
  ];

  const formats = [
    'All Formats',
    'capsule',
    'powder',
    'device',
    'serum',
    'cream',
    'spray',
    'softgel'
  ];

  const goals = [
    'cognition',
    'sleep',
    'energy',
    'immunity',
    'longevity',
    'digestion',
    'anti-aging',
    'cleaning',
    'air quality'
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Best Matches' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'newest', label: 'New Arrivals' }
  ];

  // Mock search suggestions
  const allSuggestions = [
    'vitamin c', 'sleep support', 'cognitive enhancement', 'anti-aging',
    'immune boost', 'energy formula', 'digestive health', 'air purifier',
    'retinol', 'omega-3', 'probiotic', 'collagen'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > 600;
      setIsSticky(shouldBeSticky);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onFilterChange({ search: value });
    
    if (value.length > 1) {
      const suggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onFilterChange({ search: suggestion });
    setShowSuggestions(false);
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ 
      category: category === 'All Categories' ? '' : category 
    });
  };

  const handleGoalToggle = (goal) => {
    const newGoals = filters.goals.includes(goal)
      ? filters.goals.filter(g => g !== goal)
      : [...filters.goals, goal];
    onFilterChange({ goals: newGoals });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      category: '',
      format: '',
      goals: [],
      sort: 'relevance'
    });
  };

  const activeFilterCount = [
    filters.search,
    filters.category,
    filters.format,
    ...filters.goals
  ].filter(Boolean).length;

  const stickyStyle = isSticky ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border)',
    zIndex: 100,
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  } : {};

  return (
    <>
      <div 
        ref={filterRef}
        style={{
          ...stickyStyle,
          marginBottom: isSticky ? '0' : '2rem'
        }}
      >
        <div className="container" style={{marginTop: '100px'}}>
          {/* Main Filter Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: showFilters ? '1rem' : '0'
          }}>
            {/* Search */}
            <div style={{ position: 'relative', minWidth: '300px', flex: 1 }} ref={searchRef}>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={18} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--text-sub)' 
                  }} 
                />
                <input
                  type="text"
                  placeholder="Search products, ingredients, or benefits..."
                  value={filters.search}
                  onChange={handleSearchChange}
                  onFocus={() => filters.search.length > 1 && setShowSuggestions(true)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    border: '2px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: '16px',
                    transition: 'border-color 0.2s ease'
                  }}
                  aria-label="Search products"
                />
              </div>
              
              {showSuggestions && searchSuggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 10,
                  marginTop: '2px'
                }}>
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        borderBottom: index < searchSuggestions.length - 1 ? '1px solid var(--border)' : 'none'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'var(--bg)'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Category Pills */}
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              flexWrap: 'wrap',
              flex: window.innerWidth > 1024 ? 'none' : '1'
            }}>
              {categories.slice(1, 5).map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: filters.category === category ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: filters.category === category ? 'var(--primary)' : 'var(--white)',
                    color: filters.category === category ? 'white' : 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (filters.category !== category) {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.color = 'var(--primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filters.category !== category) {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.color = 'var(--text-primary)';
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filter Toggle & Sort */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--white)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <Filter size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span style={{
                    background: 'var(--accent)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <select
                value={filters.sort}
                onChange={(e) => onFilterChange({ sort: e.target.value })}
                style={{
                  padding: '10px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--white)',
                  cursor: 'pointer',
                  minWidth: '140px'
                }}
                aria-label="Sort products"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div style={{
              padding: '1.5rem',
              background: 'var(--bg)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
              }}>
                {/* Format Filter */}
                <div>
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Format</h4>
                  <select
                    value={filters.format}
                    onChange={(e) => onFilterChange({ format: e.target.value === 'All Formats' ? '' : e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      background: 'var(--white)'
                    }}
                  >
                    {formats.map(format => (
                      <option key={format} value={format}>
                        {format === 'All Formats' ? format : format.charAt(0).toUpperCase() + format.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Goals Filter */}
                <div>
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Health Goals</h4>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.5rem' 
                  }}>
                    {goals.map(goal => (
                      <button
                        key={goal}
                        onClick={() => handleGoalToggle(goal)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '16px',
                          border: filters.goals.includes(goal) ? '2px solid var(--primary)' : '1px solid var(--border)',
                          background: filters.goals.includes(goal) ? 'var(--primary)' : 'var(--white)',
                          color: filters.goals.includes(goal) ? 'white' : 'var(--text-primary)',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {goal.charAt(0).toUpperCase() + goal.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={clearFilters}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      background: 'var(--white)',
                      cursor: 'pointer',
                      color: 'var(--text-sub)'
                    }}
                  >
                    <X size={14} />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div style={{ 
            marginTop: '1rem',
            color: 'var(--text-sub)',
            fontSize: '14px'
          }}>
            {totalResults} {totalResults === 1 ? 'product' : 'products'} found
          </div>
        </div>
      </div>
      
      {/* Spacer when sticky */}
      {isSticky && <div style={{ height: '120px' }} />}
    </>
  );
};

export default ProductsFilters;