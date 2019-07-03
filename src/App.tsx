import React from 'react';
import { ReactComponent as Mylogo } from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Mylogo style={{ fill: "#add8e6" }} className="App-logo" />
        <h1>Which Bus? 🤷</h1>

      </header>
    </div>
  );
}

export default App;
