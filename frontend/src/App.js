import React from 'react';
import PlantDiagnosis from './components/PlantDiagnosis';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Plant Disease Diagnosis System</h1>
      </header>
      <main>
        <PlantDiagnosis />
      </main>
    </div>
  );
}

export default App; 