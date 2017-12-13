import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Gallery from './containers/Gallery/Gallery';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Gallery/>
        </Layout>
      </div>
    );
  }
}

export default App;
