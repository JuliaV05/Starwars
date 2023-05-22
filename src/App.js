// import React, { useEffect, useState } from 'react';
import './App.css';
import RequestApi from './components/RequestApi';
import ButtonRemove from './components/ButtonRemove';
import Table from './components/Table';
import PlanetsProvider from './provider/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Table />
      <RequestApi />
      <ButtonRemove />
    </PlanetsProvider>
  );
}

export default App;
