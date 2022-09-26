import './App.css';
import useApi from './hooks/api';
import Form from './Form';

function App() {
  const [{ response, data, error, loading, variables }, sendQuery] = useApi.get('/users', { _limit: 20, _page: 1 });
  const [ lastUser ] = useApi.get('/users', { _limit: 1, _sort: 'id', _order: 'desc' });
  const [ postResponse, sendMutation ] = useApi.post('/users');

  const loadMore = () => {
    sendQuery({ _page: (variables._page || 1) + 1 }, (response: any, state: any) => {
      return [...state, ...response];
    });
  }

  const onSearch = (event: any) => {
    if (event.keyCode === 13)
      sendQuery({ q: event.target.value });
  }

  const getNextPage = (event: any) => {
    sendQuery({ _page: (variables._page || 1) + 1 });
  }

  const getPrevPage = (event: any) => {
    sendQuery({ _page: (variables._page || 1) - 1 });
  }

  const onSubmit = (values: any) => {
    const lastId = lastUser.data?.[0].id;
    sendMutation({id: Number(lastId) + 1, ...values}, { 'Content-type': "application/json" })
  }

  return (
    <div className="App">
      <h3>Custom Hook API</h3>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <input type="text" onKeyDown={onSearch} />
      {!loading && <>
        {data.length ?
          <ul>
            {data?.map((user: any) =>
              <li key={user.id}>{user.name}</li>
            )}
          </ul>
          : <p>No results found</p>}

        <button disabled={response.length === 0} onClick={loadMore}>Load more</button>
        <br /><br />

        <button onClick={getPrevPage} disabled={variables._page <= 1}>Prev page</button>
        <button onClick={getNextPage} disabled={response.length === 0}>Next page</button>
      </>
      }

      <Form onSubmit={onSubmit} />
    </div>
  );
}

export default App;
