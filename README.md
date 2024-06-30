# Fetch

Improved `fetch`.
- Simpler API
- Logs descriptors for request error codes


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
  text: 'This is an example movie.',
  ...
}
*/
```


## API

```JS
const response = await Fetch.{method}.{?responseType}(resource, ?options);
```

### `method`

A lowercased [HTTP request method].

### `responseType`

Sets `response.responseType` to the respective parsed response.

Can be either `json` (default), `text`, or `stream`.

> Change the default with `Fetch.options.defaultResponseType`.

### `options`

`fetch` options, with:

#### `prefix`

If `resource` is a string or is [string-coercible], `prefix` will be prepended to its coerced value.

#### `onlyBody`

Return only `response.{responseType}`.


[HTTP request method]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
[string-coercible]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion

