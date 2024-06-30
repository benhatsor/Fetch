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
  text: 'This is an example movie.',
  ...
}
*/
```


## API

```JS
await Fetch.{method}.{?responseType}(resource, ?options);
```

### `responseType`

Sets `Response.{responseType}` to `Response.{responseType}()` (unless it's `stream`).

Defaults to [`defaultResponseType`](#defaultResponseType).

### `options`

`fetch` options, with:

#### `prefix`

If `resource` is a string or is [string-coercible], `prefix` will be prepended to its coerced value.

#### `onlyBody`

Return only `Response.{responseType}()`.


## Additional Options

Accessed via `Fetch.options`.

### `defaultResponseType`

The response type of `Fetch.{method}(...)`.


[string-coercible]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion

