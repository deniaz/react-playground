import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { hydrate, Resource } from './volte-face';
import { List } from './List';

const ContactList = hydrate(List, { url: 'http://swapi.co/api/people/', transform: () => {}, });

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <ContactList />

        <hr />

        <List items={[{ name: 'Alice', }, { name: 'Bob', } ]} />

        <hr />
        <Resource
          url='http://swapi.co/api/people/'
          transform={(json) => ({ items: json.results.map(item => ({ name: item.name })) })}
        >
          <List />
        </Resource>
      </div>
    );
  }
}

export default App;
