# Fetch

Improved `fetch`.

## Examples

```JS
const resp = await Fetch.get('https://api.example.com/movies');

/*
[{
  name: 'Example',
  year: 1975,
  id: 1
}]
*/
```

```JS
const resp = await Fetch.get('/movies/1/desc', {
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

Attempts to parse `resp` to the provided type(s), then sets `resp.body` to the result.

[Available types.](https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods)

Can be either a string or an array of multiple strings.

If multiple strings are provided, they will act as fallbacks for when parsing fails.

Default: `['json', 'text']`.

> Change the default with `Fetch.fetchOptions.defaultRespType`.

### `options`

`fetch` options, with:

#### `onlyBody`

Return only `resp.body`.

Default: `true`.

#### `prefix`

If `resource` and `prefix` are both either strings or [string-coercible], they'll be coerced, and `prefix` will be prepended to `resource`.


[HTTP request method]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
[string-coercible]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion

