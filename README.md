# Fetch

Upgraded [`fetch`].

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
const resp = await Fetch.method(resource, ?options);
```

### method

A lowercased [HTTP request method].

### options

[`fetch` options], plus:

#### respType

[Available types] (plus `stream`).

Attempts to parse `resp` to the provided type(s), then sets `resp.body` to the result.

Can be either a string or an array of multiple strings.  
If multiple strings are provided, they'll be used as fallbacks for when parsing fails.

Default: `['json', 'text']`.

> Change the default with `Fetch.defaults.respType`.

#### prefix

A prefix to prepend to `resource`.

> Will only be prepended if `resource` and `prefix` are both either strings or [string-coercible].

#### onlyBody

Whether only `resp.body` should be returned, instead of the entire response.

Default: `true`.

> Change the default with `Fetch.defaults.onlyBody`.


[`fetch`]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[HTTP request method]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
[Available types]: https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods
[`fetch` options]: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
[string-coercible]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion
