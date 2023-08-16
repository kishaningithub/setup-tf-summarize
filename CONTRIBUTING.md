# Contributing

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

Before raising the PR run the following command
```bash
$ npm run all
```
this single command runs build, format, lint, package and test

## References

- [Template repository](https://github.com/actions/typescript-action)
- [Actions versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
