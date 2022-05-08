import './App.css';
import {Route, Routes} from "react-router-dom";
import LandingPage from './components/landingPage/landingPage';
import Home from './components/home/home';
import DogDetail from './components/dogDetail/dogDetail';
import CreateDog from './components/createDog/createDog';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/Dogs" element={<Home/>}/>
      <Route path="Dogs/:id" element={<DogDetail/>}/>
      <Route path="/Create" element={<CreateDog/>}/>
      </Routes>
    </div>
  );
}

export default App;
