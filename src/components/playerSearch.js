import React, { useState, useEffect } from 'react';
import '../css/playerSearch.css'; // Importa el CSS

const PlayerSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isPlaceholderHidden, setPlaceholderHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(searchTerm != ''){
                handleSearch();
            }            
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleFocus = () => {
        setPlaceholderHidden(true);
    };

    const handleBlur = () => {
        if (searchTerm === '') {
            setPlaceholderHidden(false);
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                placeholder={isPlaceholderHidden ? '' : 'Buscar por apodo...'}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div className="search-icon" onClick={handleSearch}>
                <i className="fas fa-search"></i> {/* Ícono de búsqueda de Font Awesome */}
            </div>
        </div>
    );
};

export default PlayerSearch;


