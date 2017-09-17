import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../style/App.css';
import Search from './Search'
import About from './About'
import CallsignDetails from './CallsignDetails'

class App extends Component {
  render(){
    return(
      <Router>
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div>
          <ul className='nav'>
            <li><Link to='/'>Search callsigns</Link></li>
            <li><Link to="/callsign">Callsign details</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className='content-wrapper'>
          <Route exact path="/" component={Search} />
          <Route path="/callsign/:callsign?" component={CallsignDetails} />
          <Route path="/about" component={About}/>
        </div>
      </div>
    </Router>

    )
  }
}

export default App;
