# Request

Improved `fetch`.

## Examples

```JS
await Request.get('/movies', {
  prefix: 'https://api.example.com'
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
await Request.get.text('/movies/1/desc', {
  prefix: 'https://api.example.com',
  onlyBody: false
});

/*
Response {
  text: 'This is an example movie.',
  ok: true,
  status: 200,
  ...
}
*/
```


## API

```JS
const response = await Request.{method}.{?responseType}(resource, ?options);
```

### `method`

A lowercased [HTTP request method].

### `responseType`

Sets `response.body` to the respective parsed response.

Can be either `json` (default), `text`, or `stream`.

> Change the default with `Request.options.defaultResponseType`.

### `options`

`Request` options, with:

#### `prefix`

If `resource` is a string or is [string-coercible], `prefix` will be prepended to its coerced value.

#### `onlyBody`

Return only `response.body`.

Default: `true`.


[HTTP request method]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
[string-coercible]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion

