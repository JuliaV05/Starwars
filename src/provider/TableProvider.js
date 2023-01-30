import { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';

// aqui está a minha tabela com as informações dos planetas ( requisição da api que está no App)
function TableProvider() {
  const { planets } = useContext(TableContext);
  const [searchInput, setSearchInput] = useState('');
  const [filterInput, setFilterInput] = useState({ column: 'population',
    comparison: 'maior que',
    number: 0 });
  const [filterList, setFilterList] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [controlFilter, setControlFilter] = useState({
    population: '',
  });

  useEffect(() => {
    const newArrPlanets = planets.filter((planet) => planet.name.toLowerCase()
      .includes(searchInput.toLowerCase()));
    setFilteredPlanets(newArrPlanets);
  }, [searchInput]);

  const objectFilter = () => {
    setFilterList([...filterList, filterInput]);
    setFilterInput({ column: 'population', comparison: 'maior que', number: 0 });
    setControlFilter({ ...controlFilter, population: 'population' });
    const data = Object.values(filterInput);
    setControlFilter({ ...controlFilter, [data[0]]: data.join(' ') });
  };

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  useEffect(() => {
    const newArrPlanets = filterList.reduce((arrPlanets, currFilter) => (
      arrPlanets.filter((planet) => {
        switch (currFilter.comparison) {
        case 'maior que': {
          return Number(planet[currFilter.column]) > Number(currFilter.number); }
        case 'menor que': {
          return Number(planet[currFilter.column]) < Number(currFilter.number); }
        default: {
          return Number(planet[currFilter.column]) === Number(currFilter.number); }
        }
      })
    ), planets);
    console.log(newArrPlanets);
    setFilteredPlanets(newArrPlanets);
  }, [filterList]);

  return (
    <main>
      <select
        value={ filterInput.column }
        data-testid="column-filter"
        onChange={ ({ target }) => setFilterInput(
          { ...filterInput, column: target.value },
        ) }
      >
        { !controlFilter.population && <option value="population">population</option> }
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ filterInput.comparison }
        data-testid="comparison-filter"
        onChange={ ({ target }) => setFilterInput(
          { ...filterInput, comparison: target.value },
        ) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ filterInput.number }
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setFilterInput(
          { ...filterInput, number: target.value },
        ) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ objectFilter }
      >
        Filtrar
      </button>

      <label htmlFor="filter-name">
        Projeto Star Wars-Trybe
        <br />
        <input
          data-testid="name-filter"
          type="text"
          id="filter-name"
          name="searchInput"
          onChange={ (e) => setSearchInput(e.target.value) }
        />

      </label>

      {filterList.map((list, index) => (
        <h1 key={ index }>
          { `${list.column} ${list.comparison} ${list.number}`}
        </h1>
      ))}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <th>{planet.rotation_period}</th>
              <th>{planet.orbital_period}</th>
              <th>{planet.diameter}</th>
              <th>{planet.climate}</th>
              <th>{planet.gravity}</th>
              <th>{planet.terrain}</th>
              <th>{planet.surface_water}</th>
              <th>{planet.population}</th>
              <th>{planet.films}</th>
              <th>{planet.created}</th>
              <th>{planet.edited}</th>
              <th>{planet.url}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default TableProvider;
