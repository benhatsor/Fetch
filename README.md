# Fetch

Improved `fetch`.

## Examples

```JS
await Fetch.get('/movies', {
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
await Fetch.get('/movies/1/desc', {
  prefix: 'https://api.example.com',
  respType: 'text',
  onlyBody: false
});

/*
Response {
  body: 'This is an example movie.',
  ok: true,
  status: 200,
  ...
}
*/
```


## API

```JS
const resp = await Fetch.{method}.{?respType}(resource, ?options);
```

### `method`

A lowercased [HTTP request method].

### `respType`

Parses `resp` with the provided method, and sets `resp.body` to the result.

Can be either a method string or an array of multiple method strings.

If multiple method strings are provided, they will act as fallbacks.

[Available methods.](https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods)

Default: `['json', 'text']`.

> Change the default with `Fetch.options.defaultRespType`.

### `options`

`fetch` options, with:

#### `onlyBody`

Return only `resp.body`.

Default: `true`.

#### `prefix`

If `resource` is a string or is [string-coercible], `prefix` will be prepended to its coerced value.


[HTTP request method]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
[string-coercible]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion

