import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";

function App() {
  const [location, setLocation] = useState({});
  const [typeID, setTypeID] = useState(1);
  const [page, setPage] = useState(1);
  const [eachPage, setEachPage] = useState(5);

  const max = Math.trunc(location.residents?.length / eachPage) + 1;


  const randomLocation = Math.floor(Math.random() * 126);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${randomLocation}`)
      .then((res) => setLocation(res.data));
  }, []);

  const searchType = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${typeID}`)
      .then((res) => 
      setLocation(res.data));
      setPage(1);
  };


  const enterKey = (event) => {
    if (event.key === "Enter") {
      searchType();
      setPage(1);
    }
  };

  return (
    <div className="App">
      <nav></nav>
      <input
        type="text"
        value={typeID}
        onChange={(e) => setTypeID(e.target.value)}
        onKeyDown={enterKey}
      />
      <button type="sumbit" onClick={searchType}>
        Search
      </button>
      <div className="locData">
      <p>population: {location.residents?.length}</p>
      <br />
      <h2>{location.name}</h2>
      <br />
      <p>type: {location.type}</p>
      <br />
      <p>Dimension: {location.dimension}</p>
      <br />
      </div>
      <div className="box">
        {location.residents?.
        slice((page - 1) * eachPage, (page - 1) * eachPage + eachPage)
        .map((resident) => (
          <Characters resident={resident} key={resident} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} max={max}/>
    </div>
  );
}

export default App;
