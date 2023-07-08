
import NoteState from './context/note/stateContext';


import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';

function App() {
  return (
    <div className="App">
    <NoteState>
    <Router>
    <Navbar />
    <Alert massage={"This is the alert massage"}/>
    <div className="container">
      <Routes>
        <Route exact path='/' Component={Home}></Route>
        <Route exact path='/about' Component={About}></Route>
      </Routes>
    </div>
    </Router>
    </NoteState>
    </div>
  );
}

export default App;
