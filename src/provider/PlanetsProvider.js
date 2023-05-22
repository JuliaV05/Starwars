import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TableContext from '../context/TableContext';

export default function PlanetsProvider({ children }) {
  // estados responsavéis pelo retorno da api de planetas
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const value = {
    planets,
    loading,
    error,
    setPlanets,
    setLoading,
    setError,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <TableContext.Provider value={ value }>
      { children }
    </TableContext.Provider>
  );
}
PlanetsProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
