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

## Options

That's `Fetch.options`.

### `defaultResponseType`

Changes the response type of `Fetch.{method}`.

