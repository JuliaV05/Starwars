import { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

// aqui está a minha tabela com as informações dos planetas ( requsição da api que está no App)

function Table() {
  const { planets } = useContext(TableContext);
  const [searchInput, setSearchInput] = useState('');
  const [filterInput, setFilterInput] = useState({ column: 'population',
    comparison: 'maior que',
    number: 0 });

  const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase()
    .includes(searchInput.toLowerCase()));
  console.log(filteredPlanets);

  // const buttonFilter = ({target}) => {
  //   setFilterInput(...filterInput, target.value )
  // };

  return (
    <main>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setFilterInput({...filterInput, target.value)} }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setFilterInput(...filterInput, target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setFilterInput(...filterInput, target.value) }
      />
      <button type="button" data-testid="button-filter">
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
export default Table;
