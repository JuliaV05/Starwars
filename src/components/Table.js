import { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

// aqui está a minha tabela com as informações dos planetas ( requsição da api que está no App)

function Table() {
  const { planets } = useContext(TableContext);
  const [searchInput, setSearchInput] = useState('');

  const filteredPlanets = planets.filter((planet) => planet.name.toLowerCase()
    .includes(searchInput.toLowerCase()));
  console.log(filteredPlanets);

  // 1 - Renderiza o campo de texto para o filtro de nomes;
  // 2 - Filtra os planetas que possuem a letra "o" no nome;
  // 3 - Filtra planetas que possuem a letra "oo" no nome;
  // 4 - Realiza os dois filtros acima em sequência e após, testa a remoção do filtro por texto.

  return (
    <main>
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
