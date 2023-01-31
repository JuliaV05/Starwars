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
    orbital_period: '',
    diameter: '',
    rotation_period: '',
    surface_water: '',
  });
  const [select, setSelect] = useState({ order: { column: 'population', sort: 'ASC' } });

  useEffect(() => {
  }, [filteredPlanets]);

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
    setFilteredPlanets(newArrPlanets);
  }, [filterList]);

  const buttonEraser = (target) => {
    const { value } = target;
    console.log(target.value);
    const resultArrFilter = filterList.filter((filtro) => filtro.column !== target.value);
    setFilterList(resultArrFilter);
    setControlFilter({ [value]: '' });
  };

  const cleanButton = () => {
    setFilterList([]);
  };
  // primeira condicional: do menor para o maior; segunda condicional: do maior para o menor.
  const columnAscDesc = () => {
    const sort = filteredPlanets.sort((asc, desc) => (
      select.order.sort !== 'ASC' ? asc[select.order.column] - desc[select.order.column]
        : desc[select.order.column] - asc[select.order.column]));
    setFilteredPlanets([...sort.reduce((acc, curr) => {
      if (curr[select.order.column] === 'unknown') {
        acc.push(curr);
      } else {
        acc.unshift(curr);
      }
      return acc;
    }, [])]);
  };
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
        { !controlFilter.orbital_period
        && <option value="orbital_period">orbital_period</option> }
        { !controlFilter.diameter && <option value="diameter">diameter</option> }
        { !controlFilter.rotation_period
        && <option value="rotation_period">rotation_period</option> }
        { !controlFilter.surface_water
        && <option value="surface_water">surface_water</option> }
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
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setSelect(
          { order: { ...select.order, column: target.value } },
        ) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="asc">
        Ascendente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="asc"
          name="sort"
          value="ASC"
          onChange={ ({ target }) => setSelect(
            { order: { ...select.order, sort: target.value },
            },
          ) }
        />
      </label>
      <label htmlFor="desc">
        Descendente
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          id="desc"
          value="DESC"
          onChange={ ({ target }) => setSelect(
            { order: { ...select.order, sort: target.value } },
          ) }
        />
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ columnAscDesc }
      >
        Ordenar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ cleanButton }
      >
        Apagar filtros
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
        <h1
          key={ index }
          data-testid="filter"
        >
          { `${list.column} ${list.comparison} ${list.number}`}
          <button
            value={ list.column }
            onClick={ ({ target }) => buttonEraser(target) }
          >
            X
          </button>
        </h1>
      ))}

      <table id="table">
        <thead>
          <tr id="row">
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
              <td data-testid="planet-name">{planet.name}</td>
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
