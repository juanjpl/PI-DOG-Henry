import './App.css';
import Navbar from './components/navbar/navbar'
import DogCard from './components/dogCard/dogCard'
import AddDog from './components/addDog'
import Landing from './components/landing/landing'
import Home from './components/home/home'
import {Switch , Route} from 'react-router'
import Henry from './components/henry';
import About from './components/about'

function App() {
  return (
    <div className="App">
       <Navbar/>
      <Switch>

        <Route  path="/home">
          <Home/>
        </Route>

        <Route exact  path="/add">
          <AddDog />
        </ Route >

       

        <Route exact path="/about">
          <About/>
        </Route>

        <Route exact path="/henry">
          <Henry/>
        </Route>

        <Route exact path="/:name">
          <DogCard/>
        </Route>

  
        <Route path="/">
         
          <Landing/>
        </Route>

      </Switch>
      

   
    </div>
  );
}

export default App;
