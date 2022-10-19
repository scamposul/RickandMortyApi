import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Characters = ({ resident }) => {
  const [character, setCharacter] = useState({});
  const [circleColor, setCircleColor] = useState('');

  useEffect(() => {
    axios.get(resident).then((res) => setCharacter(res.data));
  }, []);

  const status = character.status;

  useEffect(() => {
    if(status === 'Dead') {
        setCircleColor('red');
      }
      if(status === 'Alive') {
        setCircleColor('green');
      }
      if(status === 'unknown') {
        setCircleColor('gray');
      }
  }, [character]);



  return (
    <li className="container">
        <img src={character.image} alt="" />
      <div className="info">
        <h4>{character.name}</h4>
        <p className="infoLabel">Origin: </p> 
        <p>{character.origin?.name}</p>
        <p><i className="fa-solid fa-circle" id="circle" style={{color: `${circleColor}`}}></i> {character.status} - {character.species}</p>
        <p className="infoLabel">Episodes where appear:</p>
        <p className="infoLabel">{character.episode?.length}</p>
      </div>
    </li>
  );
};

export default Characters;
