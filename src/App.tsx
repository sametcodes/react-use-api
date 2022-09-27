import './App.css';
import useAPI from './hooks/api';
import Form from './Form';

function App() {
  const API = useAPI("/users");
  const [{ loading, error, data, variables, response }, get] = API.get({ _sort: "id", _order: "desc", _limit: 5, _page: 1 });
  const [mutationResponse, post] = API.post();

  const loadMore = () => {
    get({ ...variables, _page: variables._page + 1 }, (response, store) => {
      return [...store, ...response];
    });
  }

  const onSearch = (event: any) => {
    if (event.keyCode === 13)
      get({ q: event.target.value })
  }

  const getNextPage = (event: any) => {
    get({ ...variables, _page: variables._page + 1 });
  }

  const getPrevPage = (event: any) => {
    get({ ...variables, _page: variables._page - 1 });
  }

  const onSubmit = (values: any) => {
    post({
      body: values, headers: { "Content-Type": "application/json" }
    }, (response: any, data: any) => {
      return [response, ...data];
    })
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
              <li key={user.id}>({user.id}) {user.name}</li>
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
