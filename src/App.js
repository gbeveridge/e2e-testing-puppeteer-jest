import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login';
import './App.css';

class App extends Component {
  state = {
    complete: false,
    email: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ complete: true });
    document.cookie = `email=${this.state.email}`;
  }

  handleInput = (e) => {
    this.setState({ email: e.target.value });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.complete ?
            <p data-testid="success"> Logged In </p> :
            <Login submit={this.handleSubmit} onChange={this.handleInput}/>
        }
      </div>
    );
  }
}

export default App;
