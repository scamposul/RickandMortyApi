import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";

function App() {
  const [location, setLocation] = useState({});
  const [allLocations, setAllLocations] = useState([]);
  const [singleLocation, setSingleLocation] = useState('');
  const [typeID, setTypeID] = useState();
  const [page, setPage] = useState(1);
  const [eachPage, setEachPage] = useState(5);

  const max = Math.trunc(location.residents?.length / eachPage) + 1;

  const randomLocation = Math.floor(Math.random() * 126);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${randomLocation}`)
      .then((res) => setLocation(res.data));
  }, []);


  const getLocationId = () =>  {
    axios.get('https://rickandmortyapi.com/api/location')
      .then(res => setAllLocations(res.data.results));
      const filtered = allLocations.filter((location) =>
      location.name.toLowerCase().includes(typeID.toLowerCase()));
    setSingleLocation(filtered);
    axios
    .get(`https://rickandmortyapi.com/api/location/${singleLocation[0]?.id ? singleLocation[0]?.id : 1}`)
    .then((res) => setLocation(res.data));
     setPage(1);
  }

  const enterKey = (event) => {
    if (event.key === "Enter") {
      getLocationId();
      setPage(1);
    }
  };

  return (
    <div className="App">
      <nav></nav>
      <div className="all">
        <h1>Rick & Morty Wiki</h1>
        <input
          type="text"
          value={typeID}
          onChange={(e) => setTypeID(e.target.value)}
          onKeyDown={enterKey}
          placeholder="Type a location name"
        />
        <button type="sumbit" onClick={getLocationId}>
          Search
        </button>
        <h2>{location.name}</h2>
        <div className="locData">
          <div className="population">
            <p><b>Population: </b></p>
            <p>{location.residents?.length}</p>
          </div>
          <br />
          <div className="location">
            <p><b>Type: </b></p>
            <p>{location.type}</p>
          </div>
          <br />
          <div className="dimension">
            <p><b>Dimension: </b></p>
            <p>{location.dimension}</p>
          </div>
          <br />
        </div>
        <br />
        <h2>Residents</h2>
        <Pagination page={page} setPage={setPage} max={max} />
        <div className="box">
          {location.residents
            ?.slice((page - 1) * eachPage, (page - 1) * eachPage + eachPage)
            .map((resident) => (
              <Characters resident={resident} key={resident} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
