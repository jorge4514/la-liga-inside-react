import React, { useState, useEffect } from 'react';
import PlayerCard from './playerCard';
import PlayerSearch from './playerSearch'; // Importa el componente PlayerSearch
import '../css/playersPage.css';

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const apiUrl = window.location.hostname === 'localhost'
          ? 'https://liga-fantasy-backend-python-dev-ctab.1.ie-1.fl0.io/get_all_json'
          : `${window.location.origin}/get_all_json`;
        console.log(window.location.origin);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setPlayers(data);
        setFilteredPlayers(data);  // Inicialmente, muestra todos los jugadores
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataFromAPI();
  }, []);

  const handleSearch = (searchTerm) => {
    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());

    const filtered = players.filter(player => {
      const normalizedPlayerNickname = removeAccents(player.nickname.toLowerCase());
      return normalizedPlayerNickname.includes(normalizedSearchTerm);
    });
    setFilteredPlayers(filtered);
  };


  return (
    <div className='root'>
      <div className='row justify-content-md-center'>
        <div className='col-md-8'>
          <PlayerSearch onSearch={handleSearch} />
        </div>
      </div>

      <div className="main-container col-md-11 mx-auto justify-content-md-center">
        <div className="card-deck">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>

  );
};

export default PlayersPage;


