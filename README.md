# react-use-api

> Do not use. This is an experimental package for now.
 
## Usage

This package provides request management with an inner state on React components. It's built with query-mutation request pattern.

### `APIContext` 

`APIContext` must be used to as a parent node to provide endpoints, options and configurations of requests. Once it's used, the `useAPI` hook function can be used in components.

```javascript
const options = {
  base_url: 'http://localhost:3000'
}

root.render(
  <APIContext options={options}>
    <App />
  </APIContext>
);
```

### `useAPI` and HTTP method hook functions

`useAPI` exposes HTTP method functions for the given endpoint as parameter. Method options, body or query parameters can be passed as arguments into the functions.

The method-hook function returns values: *store* and the method function itself. The reason of returning the method function in the results is resending the request. The variables object will be saved into the `store.variables`.

#### Example with the query method

```javascript
const App = () => {
    const [{data, variables}, get] = useAPI("/users").get({ page: 1 });

    const nextPage = () => {
        get({ page: variables.page + 1 })
    }

    return <div>
        {data.map(user) => <div key={user.id}>
            <span>{user.name}</span>
        </div>}

        <button onClick={nextPage}>Next page</button>
    </div>
}

```

If any error will be thrown during the request, the error will be saved into the `error` object and it can be reached as `store.error` during rendering process.

The `data` and `response` values might be confusing. The `data` value holds the same value with `response` value, but it can be changed by defining an `updateStore` callback function as the second parameter of the returned method function from the hook value. The main idea is the `data` value is that it provides storing responses of more then one request, such as "loding more" functionality.

```javascript
const App = () => {
    const [{data, variables}, get] = useAPI("/users").get({ page: 1 });

    const loadMore = () => {
        get({ page: variables.page + 1 }, (response, store) => {
            return [...store, ...response] 
        })
    }

    return <div>
        {data.map(user) => <div key={user.id}>
            <span>{user.name}</span>
        </div>}

        <button onClick={loadMore}>Load more</button>
    </div>
}
```

#### Example with the mutation methods

Mutation methods can be used to send `POST`, `PUT`, `PATCH` and `DELETE` requests. The functions can be taken a custom path, if they don't, they will use the main path that is passed in the `useAPI()` hook.

Unlike the `.get` method, the mutation methods don't be triggered initially when the component has mounted. They must be triggered by using the returned method function in the hook results. The `updateStore` callback function works in the same way as we've seen above.

```javascript
const App = () => {
    const [{ loading, error, data }, post] = useAPI("/users").post();

    const onSubmit = (values) => {
        post({ body: values }, (response, store) => {
            return [response, ...store];
        })
    }

    return <div>
        <Form onSubmit={onSubmit}>
    </div>
}
```

#### Example with using query and mutation methods together

We can assign the `useAPI()` returning value into a variable to use multiple HTTP methods and it will provide us a basic state management. Let's use `.get`, `.post` and `.delete` methods together without having a local state in the component.

Custom path can be re-defined and it's allowed to interpolate parameters into a pre-defined custom path right before sending the request. Check `API.delete` hook call and the `params` argument passed into the `remove` function.

```javascript
const App = () => {
    const API = useAPI("/users");
    const [{ loading, error, data }, get] = API.get();

    const [postLoading, post] = API.post(); // no custom path used, so the path is /users
    const [, remove] = API.delete("/users/:id"); // custom path can be re-defined 

    const onSubmit = (values) => {
        post({ body: values }, (response, store) => {
            return [response, ...store];
        })
    }

    const onDelete = (id) => {
        remove({ params: { id } }, (response, store) => {
            return store.filter((item: any) => item.id !== id)
        })
    }

    const loadMore = () => {
        get({ page: variables.page + 1 }, (response, store) => {
            return [...store, ...response] 
        })
    }

    return <div>
        {data.map(user) => <div key={user.id}>
            <span>{user.name}</span>
            <span onClick={() => onDelete(user.id)}></span>
        </div>}

        <button onClick={loadMore}>Load more</button>

        <Form onSubmit={onSubmit}>
    </div>
}
```