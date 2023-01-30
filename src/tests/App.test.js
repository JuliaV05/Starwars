import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Table from '../components/Table';
import TableProvider from '../provider/TableProvider';

  // Para pesquisa: 
  // const row = screen.getByRole('row', {
  //   name: /name rotation period orbital period diameter climate gravity terrain surface water population films created edited url/i
  // });
  
  // within(row).getByRole('columnheader', {
  //   name: /films/i
  // });

test('test if the text "Projeto Star Wars"', () => {
  render(<App />);
  const linkElement = screen.getByText(/projeto star wars\-trybe/i)
  expect(linkElement).toBeInTheDocument();
});

it('Table tests', () => {
  render(<TableProvider />)
  
  const inputName = screen.getByRole('columnheader', { name: /name/i })
  const inputRotation = screen.getByRole('columnheader', { name: /rotation period/i })
  const inputOrbital = screen.getByRole('columnheader', { name: /orbital period/i })
  const inputDiameter = screen.getByRole('columnheader', { name: /diameter/i })
  const inputClimate = screen.getByRole('columnheader', {  name: /climate/i })
  const inputGravity = screen.getByRole('columnheader', {  name: /gravity/i })
  const inputTerrain = screen.getByRole('columnheader', {  name: /terrain/i })
  const inputSurface = screen.getByRole('columnheader', {  name: /surface water/i })
  const inputPopulation = screen.getByRole('columnheader', { name: /population/i })
  const inputFilms = screen.getByRole('columnheader', { name: /films/i })
  const inputCreated = screen.getByRole('columnheader', {  name: /created/i })
  const inputEdited = screen.getByRole('columnheader', {  name: /edited/i })
  const inputUrl = screen.getByRole('columnheader', {  name: /url/i })

  expect(inputName).toBeInTheDocument();
  expect(inputRotation).toBeInTheDocument();
  expect(inputOrbital).toBeInTheDocument();
  expect(inputDiameter).toBeInTheDocument();
  expect(inputClimate).toBeInTheDocument();
  expect(inputGravity).toBeInTheDocument();
  expect(inputTerrain).toBeInTheDocument();
  expect(inputSurface).toBeInTheDocument();
  expect(inputPopulation).toBeInTheDocument();
  expect(inputFilms).toBeInTheDocument();
  expect(inputCreated).toBeInTheDocument();
  expect(inputEdited).toBeInTheDocument();
  expect(inputUrl).toBeInTheDocument();
})
// it('options test', () => {
//   global.fetch = jest.fn(async () => ({
//     json: async () => mockData,
//   }));
//   renderWithRouterAndRedux(<TableProvider />)
//   const buttonExpenses = screen.getByRole('button', { name: /maior igual/i });
//   userEvent.type(, '');
// })
