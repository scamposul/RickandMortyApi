import React from 'react';
import { useState } from 'react';

const Pagination = ({page, setPage, max}) => {

    const [input, setInput] = useState(1);

    const nextPage = () => {
        if(page < max) {
            setInput(input + 1);
            setPage(page + 1);
        }else{
            setInput(max);
            setPage(max);
        }
    };

    const prevPage = () => {
        if(page > 1) {
            setInput(input - 1);
            setPage(page - 1);
        }else {
            setInput(1);
            setPage(1);
        }
    }
    return (
        <div className='Pagination'>
            <button onClick={prevPage}>Prev</button>
            <input name='page' autocomplete='off' value={input}/>
            <p>of {max}</p>
            <button onClick={nextPage}>Next</button>
        </div>
    );
};

export default Pagination;