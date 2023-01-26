import { useContext } from 'react';
import TableContext from '../context/TableContext';

// aqui está a minha tabela com as informações dos planetas ( requsição da api que está no App)

function Table() {
  const { planets } = useContext(TableContext);

  return (
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
        { planets.map((planet) => (
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
  );
}
export default Table;
