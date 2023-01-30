import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import TableContext from './context/TableContext';
import TableProvider from './provider/TableProvider';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Requisição da api de planetas:
  const apiPlanets = () => {
    setLoading(true);
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => {
        const dataObj = data.results.map((result) => {
          delete result.residents;
          return result;
        });
        return setPlanets(dataObj);
      })
      .catch((err) => setError(err))
      .finally(setLoading(false));
  };
  const context = {
    planets,
    loading,
    error,
  };

  useEffect(() => {
    apiPlanets();
  }, []);
  return (
    <TableContext.Provider value={ context }>
      <Table />
      <TableProvider />
    </TableContext.Provider>
  );
}

export default App;
