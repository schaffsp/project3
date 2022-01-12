import './App.css';
import Restaurants from './Components/Restaurants';
import RestaurantDetailed from './Components/RestaurantDetailed';
import RestaurantOptions from './Components/RestaurantMeasurements';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { loadLatitude, loadLongitude } from './actions.js'

function App() {
  const dispatch = useDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  } 

  function getCoordinates(position) {
    dispatch(loadLatitude(position.coords.latitude));
    dispatch(loadLongitude(position.coords.longitude));
  }

  getLocation();

  return (
    <div className="App">
      <div className="App-Container">
        <h1>Drive Through App</h1>
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/:chain_id" element={<RestaurantDetailed />} />
          <Route path="/:chain_id/:rest_id" element={<RestaurantOptions />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
