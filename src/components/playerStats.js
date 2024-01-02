import React, { useState } from 'react';
import '../css/playerStats.css';

const PlayerStats = ({ sumaEstadisticas, sumaPuntos, translations, getClassForValue, player, onClose }) => {
  const statNames = Object.keys(sumaEstadisticas);

  const playerPosition = {
    Portero: ['PT', 'hsl(46.88deg 100% 56.08%)'],
    Defensa: ['DF', 'hsl(211deg 100% 47.06%)'],
    Centrocampista: ['MC', 'hsl(147.91deg 58.9% 42.94%)'],
    Delantero: ['DL', 'hsl(2.95deg 74.69% 48.04%)']
  };

  function totalMatches(stats) {
    let totalMatches = 0;
    for (let i = 0; i < stats.length; i++) {
      if (stats[i].stats.mins_played[0] > 0) {
        totalMatches++;
      }
    }
    return totalMatches;
  }

  function getTeamId(teamString) {
    const match = teamString.match(/t(\d+)/);  // Matches "t" followed by one or more digits
    if (match && match[1]) {
      return match[1];  // Return the extracted number as a string
    }
    return null;
  }

  function renderPos(position) {
    let pos = playerPosition[position];
    return pos;
  }

  const [mostrarStats, setMostrarStats] = useState(false);

  function closeStats() {
    console.log(!mostrarStats);
    setMostrarStats(!mostrarStats);
  }

  return (
    <div className="stats-overlay col-md-12" style={{ maxHeight: '100%', overflow: 'auto' }}>
      <div className="page-stats-container col-md-7">

        <div className='playerCard-Stats col-md-3'>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
            <span>
              <img src={'https://assets-fantasy.llt-services.com/players/t' + getTeamId(player.team.badgeColor) + '/p' + player.id + '/256x256/p' + player.id + '_t' + getTeamId(player.team.badgeColor) + '_1_001_000.png'} alt={player.nickname} className="card-img-top" style={{ alignSelf: 'flex-end', maxWidth: '250px', heigh: '245px' }} />
              <div className='card-details-player'>
                <div className="card-details">
                  <span><img src={player.team.badgeColor} alt='team' style={{ alignSelf: 'flex-end', width: '45px', padding: '5px' }} /></span>
                  <span className='card-text position-container' style={{ backgroundColor: renderPos(player.position)[1] }}>{renderPos(player.position)[0]}</span>
                  <span className="card-title" style={{ fontWeight: 400, textAlign: 'center', marginTop: '10px', fontSize: '26px', marginLeft: '10px' }}>{player.nickname}</span>
                </div>
              </div>
            </span>
          </div>
          <div className='attr-container'>
            <div className='attr-class'>Pts: {player.points}</div>
            <div className='attr-class'>Pts media: {player.averagePoints.toFixed(2)}</div>
            {player.lastSeasonPoints !== undefined ? (
              <div className="attr-class">Temp. anterior: {player.lastSeasonPoints}</div>
            ) : null}
            <div className='attr-class'>Partidos jugados: {totalMatches(player.playerStats)}</div>
          </div>
        </div>

        <div className='col-md-1'></div>

        <div className='player-stats-container col-md-8' style={{ maxHeight: '100%' }}>
          <div><button className='boton-cierre' onClick={onClose}>X</button></div>
          <div className="row">
            {statNames.map((statName, index) => {
              const translatedStatName = translations[statName] || statName;
              const isZeroSum = sumaEstadisticas[statName] === 0 && sumaPuntos[statName] === 0;

              if (!isZeroSum) {
                return (
                  <div className="col-md-6 pb-3" key={index}>
                    <div className="stat-item" style={{ padding: '10px' }}>
                      <div className={`stat-info ${sumaEstadisticas[statName] === 0 ? 'zero' : ''}`}>
                        <span className="stat-name">{translatedStatName}</span>
                        <span className={`stat-value ${getClassForValue(sumaEstadisticas[statName])}`}>
                          {sumaEstadisticas[statName]}
                        </span>
                      </div>
                      <div className={`stat-info ${sumaPuntos[statName] === 0 ? 'zero' : ''}`}>
                        <span className="stat-label">Puntos</span>
                        <span className={`stat-value ${getClassForValue(sumaPuntos[statName])}`}>
                          {sumaPuntos[statName]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>      


      </div>
    </div>
  );
};

export default PlayerStats;


