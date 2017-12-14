import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Gallery from './containers/Gallery/Gallery';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Layout>
          <Gallery/>
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
