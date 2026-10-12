import React, { useState } from 'react';
import { sanitizeInput } from '../utils/sanitizeInput';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Search field cannot be empty');
      return;
    }
    console.log('[Analytics] User interacted with End-to-End Frequent Flyer Portal');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Search Flyers"
        type="text"
        value={query}
        onChange={(e) => setQuery(sanitizeInput(e.target.value))}
      />
      <button type="submit">Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default SearchForm;
