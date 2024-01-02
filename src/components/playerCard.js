// src/components/playerCard.js

import React, { useState } from 'react';
import '../css/statsStyles.css';
import PlayerStats from './playerStats';

const PlayerCard = ({ player }) => {
  const translations = {
    ball_recovery: 'Recuperación de balón',
    effective_clearance: 'Despeje efectivo',
    goal_assist: 'Asistencias de gol',
    goals: 'Goles',
    goals_conceded: 'Goles en contra',
    marca_points: 'Puntos relevo',
    mins_played: 'Minutos jugados',
    offtarget_att_assist: 'Asistencia de tiro sin gol',
    own_goals: 'Autogoles',
    pen_area_entries: 'Balones al área',
    penalty_conceded: 'Penaltis cometidos',
    penalty_failed: 'Penalti fallado',
    penalty_save: 'Penalti atajado',
    penalty_won: 'Penaltis provocados',
    poss_lost_all: 'Posesiones perdidas',
    red_card: 'Tarjeta roja',
    saves: 'Atajadas',
    second_yellow_card: 'Segunda tarjeta amarilla',
    total_scoring_att: 'Total de intentos de anotación',
    won_contest: 'Regates',
    yellow_card: 'Tarjeta amarilla',
  };

  const playerPosition = {
    Portero: ['PT', 'hsl(46.88deg 100% 56.08%)'],
    Defensa: ['DF', 'hsl(211deg 100% 47.06%)'],
    Centrocampista: ['MC', 'hsl(147.91deg 58.9% 42.94%)'],
    Delantero: ['DL', 'hsl(2.95deg 74.69% 48.04%)']
  };

  const getClassForValue = (value) => {
    if (value === 0) {
      return 'zero';
    } else if (value > 0) {
      return 'positive';
    } else {
      return 'negative';
    }
  };

  const [mostrarStats, setMostrarStats] = useState(false);

  function openStats() {
     
    setMostrarStats(!mostrarStats);
  
  }

  const handleCloseStats = () => {
    setMostrarStats(false);
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

  if (player.position === "Entrenador" || player.playerStats === undefined) {
    return (
      <div className="card col-md-3">
        <div className="card-body">
          <h5 className="card-title">{player.name}</h5>
          <p className="card-text">Posición: {player.position}</p>
          <p className="card-text">Edad: {player.age}</p>
          <p className="card-text">Estadísticas no disponibles</p>
        </div>
      </div>
    );
  }

  if (player && player.playerStats && player.playerStats[0] && player.playerStats[0].stats) {
    // Obtener todos los datos de playerStats
    const allPlayerStats = player.playerStats;
    console.log(player.playerStats);

    // Objeto para almacenar la suma de cada estadística
    const sumaEstadisticas = {};

    // Objeto para almacenar la suma de puntos ganados
    const sumaPuntos = {};

    // Iterar sobre cada partido
    allPlayerStats.forEach(partidoStats => {
      // Iterar sobre cada estadística en el partido
      for (const [statName, [value, puntosGanados]] of Object.entries(partidoStats.stats)) {
        // Sumar el valor de la estadística
        sumaEstadisticas[statName] = (sumaEstadisticas[statName] || 0) + value;

        // Sumar los puntos ganados
        sumaPuntos[statName] = (sumaPuntos[statName] || 0) + puntosGanados;
      }
    });

    return (
      <div className="card col-md-3">
        <div>
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div className="card-details">
                <span><img src={player.team.badgeColor} alt='team' style={{ alignSelf: 'flex-end', width: '45px', padding: '5px' }} /></span>
                <span className='card-text position-container' style={{ backgroundColor: renderPos(player.position)[1] }}>{renderPos(player.position)[0]}</span>
                <div className='attr-container'>
                  <div className='attr-class'>Pts: {player.points}</div>
                  <div className='attr-class'>Pts media: {player.averagePoints.toFixed(2)}</div>
                  {player.lastSeasonPoints !== undefined ? (
                    <div className="attr-class">Temp. anterior: {player.lastSeasonPoints}</div>
                  ) : null}
                  <div className='attr-class'>Partidos jugados: {totalMatches(player.playerStats)}</div>
                </div>
              </div>
              <span>
                <img src={'https://assets-fantasy.llt-services.com/players/t' + getTeamId(player.team.badgeColor) + '/p' + player.id + '/256x256/p' + player.id + '_t' + getTeamId(player.team.badgeColor) + '_1_001_000.png'} alt={player.nickname} className="card-img-top" style={{ alignSelf: 'flex-end', maxWidth: '200px' }} />
                <h5 className="card-title" style={{ fontWeight: 400, textAlign: 'center', marginTop: '10px' }}>{player.nickname}</h5>
              </span>
            </div>
            <div>
              <div className="btn stats-button" style={{ width: '100%' }} onClick={openStats}>
                <div className="button-content">
                  <span className="button-text">Registro de acciones</span>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {mostrarStats && (<PlayerStats
          sumaEstadisticas={sumaEstadisticas}
          sumaPuntos={sumaPuntos}
          translations={translations}
          getClassForValue={getClassForValue}
          player={player}
          onClose={handleCloseStats}
        />)}        
    </div>
    );


  }



};

export default PlayerCard;


