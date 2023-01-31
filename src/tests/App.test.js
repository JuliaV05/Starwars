// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from '../App';
// import Table from '../components/Table';
// import TableProvider from '../provider/TableProvider';
// import { afterEach, beforeEach } from 'mocha';

//   // Para pesquisa: 
// const row = screen.getByRole('row', {
//   name: /name rotation period orbital period diameter climate gravity terrain surface water population films created edited url/i
// });

// within(row).getByRole('columnheader', {
//   name: /films/i
// });

// test('Projeto Star Wars tests', () => {
//   beforeEach(async () => {
//       jest.spyOn(global, 'fetch' ).mockResolvedValue ({

//         json: jest.fn().mockResolvedValue(mockData),
//       })
//       await act(async () => {
//         render(
//           <TableContext.Provider value={ context }>
//       <Table />
//     </TableContext.Provider>
//     )
//   });
//   });
//   afterEach(() => jest.resetAllMocks());;

//   it('', () => {

//   })
// });


import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
describe('Testa se a tabela está na tela', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('test', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot();
  })
  test('se todas as colunas são renderizadas na tela', async () => {
    await act(() => render(<App />));
    const planetsTable = screen.getAllByRole('row');
    expect(planetsTable.length).toBe(11);
  });
  test('se "Name" está na tela', async () => {
    await act(() => render(<App />));
    const nameColumn = screen.getByRole('columnheader',
      { name: /name/i });
    expect(nameColumn).toBeInTheDocument();
  });
  test('se "Rotation Period" está na tela', async () => {
    await act(() => render(<App />));
    const rotationPeriodColumn = screen.getByRole('columnheader',
      { name: /rotation period/i });
    expect(rotationPeriodColumn).toBeInTheDocument();
    expect(rotationPeriodColumn).toBeInTheDocument();
  });
  test('se "Orbital Diameter" está na tela', async () => {
    await act(() => render(<App />));
    const orbitalPeriodColumn = screen.getByRole('columnheader',
      { name: /rotation period/i });
    expect(orbitalPeriodColumn).toBeInTheDocument();
  });
  test('se "Climate" está na tela', async () => {
    await act(() => render(<App />));
    const climateColumn = screen.getByRole('columnheader',
      { name: /climate/i });
    expect(climateColumn).toBeInTheDocument();
  });
  test('se "Gravity" está na tela', async () => {
    await act(() => render(<App />));
    const gravityColumn = screen.getByRole('columnheader',
      { name: /gravity/i });
    expect(gravityColumn).toBeInTheDocument();
  });


  test('se "Planet search" é renderizado na tela', async () => {
    await act(() => render(<App />));
    const textFilter = screen.getByRole('textbox',
      { name: /projeto star wars/i });
    expect(textFilter).toBeInTheDocument();
  });
  test('se "Coluna" é renderizado na tela', async () => {
    await act(() => render(<App />));
    const columnFilter = screen.getByTestId("column-sort");
    expect(columnFilter).toBeInTheDocument();
  });
  test('se "Operator" é renderizado na tela', async () => {
    await act(() => render(<App />));
    const operatorFilter = screen.getByTestId("column-filter");
    expect(operatorFilter).toBeInTheDocument();
  });
  test('se "Number" é renderizado na tela', async () => {
    await act(() => render(<App />));
    const numberFilter = screen.getByTestId("value-filter");
    expect(numberFilter).toBeInTheDocument();
  });
  test('Teste se "name-filter" executa o filtro certo', async () => {
    await act(() => render(<App />));
    const filterByPlanetName = screen.getByTestId('name-filter');
    expect(filterByPlanetName).toBeInTheDocument;
    userEvent.type(filterByPlanetName, 'ald');
    const filteredPlanet = screen.getByRole('cell',
      { name: /alderaan/i });
    expect(filteredPlanet).toBeInTheDocument();
  });
  test('Teste se "population" executa o filtro certo', async () => {
    await act(() => render(<App />));
    const filterByColumn = screen.getByTestId('column-filter');
    const filterByOperator = screen.getByTestId('column-filter');
    const buttonFilter = screen.getByRole('button', { name: /filtrar/i })
    expect(filterByColumn).toBeInTheDocument;
    expect(filterByOperator).toBeInTheDocument;
    userEvent.type(filterByColumn, 'population');
    userEvent.type(filterByOperator, 'maior que');
    userEvent.click(buttonFilter);
    const filteredPlanet = screen.getByRole('cell',
      { name: /coruscant/i });
    expect(filteredPlanet).toBeInTheDocument();
  });
  test('inputs order asc e desc e button', async () => {
    await act(() => render(<App />))
    const ASC = screen.getByTestId('column-sort-input-asc')
    const order = screen.getByRole('button', { name: /ordenar/i })

    userEvent.click(ASC);
    userEvent.click(order);


    const DESC = screen.getByTestId('column-sort-input-desc')
    userEvent.click(DESC);
    userEvent.click(order);
  });
});
