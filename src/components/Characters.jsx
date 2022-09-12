import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Characters = ({resident}) => {

    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios.get(resident).then((res) => setCharacter(res.data))
    }, []);

    console.log(character);

    return (
            <li className='container'>
                {character.name}
                <br />
                <img src={character.image} alt="" />
                <br />
                {character.status}
                <br />
                Origin: {character.origin?.name}
                <br />
                Episodes: {character.episode?.length}
            </li>
    );
};

export default Characters;