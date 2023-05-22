import { useContext, useEffect } from 'react';
import TableContext from '../context/TableContext';
import Table from './Table';

function RequestApi() {
  const { value: {
    setPlanets,
    setLoading,
    setError } } = useContext(TableContext);
  //   const [planets, setPlanets] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

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
    //   const context = {
    //     planets,
    //     loading,
    //     error,
    //   };

  useEffect(() => {
    apiPlanets();
  }, []);
  return (
    <Table />
  );
}
export default RequestApi;
