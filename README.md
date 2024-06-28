# Fetch

Improved `fetch`.


## Examples

```JS
await Fetch.get('/movies', {
  prefix: 'https://api.example.com',
  onlyBody: true
});

/*
[{
  name: 'Example',
  year: 1975,
  id: 1
}]
*/
```

```JS
await Fetch.get.text('/movies/1/desc', {
  prefix: 'https://api.example.com'
});

/*
Response {
  body: 'This is an example movie.',
  ...
}
*/
```


## API

```JS
await Fetch.{method}.{?responseType}(url, ?options);
```

### `options`

`fetch` options, with:

#### `onlyBody`

Returns only `Response.body`.


## Additional Options

Accessed via `Fetch.options`.

### `defaultResponseType`

The response type of `Fetch.{method}(...)`.

