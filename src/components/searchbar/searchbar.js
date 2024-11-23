import React, { useState } from 'react';
import '../css/searchbar.css';

export default function SearchBar({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchValue); // Llama al callback del padre con el valor de búsqueda
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                name="searchInput"
                placeholder="Busca repartidores por nombre..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} // Actualiza el estado interno
            />
            <button type="submit" className="search-btn">Buscar</button>
        </form>
    );
}
