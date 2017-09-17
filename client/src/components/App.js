import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import '../style/App.css';
import Search from './Search'

const About = () => (
  <div>
    <h2>I'm the about page</h2>
  </div>
)

class App extends Component {
  render(){
    return(
      <Router>
      <div className="App">
        <div className="App-header">
          <h2>Vanity callsign search</h2>
        </div>
        <div>
          <ul>
            <li><Link to='/'>Search</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className='content-wrapper'>
          <Route exact path="/" component={Search}/>
          <Route path="/about" component={About}/>
        </div>
      </div>
    </Router>

    )
  }
}

export default App;
