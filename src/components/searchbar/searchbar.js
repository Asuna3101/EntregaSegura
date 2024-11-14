import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/searchbar.css';

export default function SearchBar() {
    const navigate = useNavigate();

    const search = (e) => {
        e.preventDefault();
        navigate(`/search/${e.target.searchInput.value}`);
    };

    return (
        <form className="search-bar" onSubmit={search}>
            <input type="text" name="searchInput" placeholder="Busca repartidores por nombre..." />
            <button type="submit" className="search-btn">Buscar</button>
        </form>
    );
}