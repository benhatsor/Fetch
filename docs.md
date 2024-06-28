# Fetch

Improved `fetch`.


## API

```JS
await Fetch.{method}.{?responseType}(url, ?options);
```

### `options.onlyBody`

Returns only `Response.body`.


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

## Options

Accessed via `Fetch.options`.

### `defaultResponseType`

Changes the response type of `Fetch.{method}(url, ?options)`.

