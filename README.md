# find-value-locations <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Given an object, and a value, return a tuple of the property name, the object on which it is an own property, and the property descriptor.

Works with string keys, Symbol keys, both enumerable and non-enumerable keys, and crawls up the prototype chain to find the exact object it's located on.

## Example

```js
var findValue = require('find-value-locations');
var assert = require('assert');

var value = {};

function Foo() {}
function Bar() {}
function Baz() {}

Object.prototype.property = value;
Function.prototype.property = value;

Bar.prototype = Baz;

Foo.prototype = new Bar();
Foo.prototype.property = value;
var symbol = Symbol('a symbol property');
Foo.prototype[symbol] = value;

var tuples = findValue(new Foo(), value);

assert.deepEqual(tuples, [
	[Foo.prototype, 'property', Object.getOwnPropertyDescriptor(Foo.prototype, 'property')],
	[Foo.prototype, symbol, Object.getOwnPropertyDescriptor(Foo.prototype, symbol)],
	[Function.prototype, 'property', Object.getOwnPropertyDescriptor(Function.prototype, 'property')],
	[Object.prototype, 'property', Object.getOwnPropertyDescriptor(Object.prototype, 'property')]
]);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/find-value-locations
[npm-version-svg]: https://versionbadg.es/ljharb/find-value-locations.svg
[deps-svg]: https://david-dm.org/ljharb/find-value-locations.svg
[deps-url]: https://david-dm.org/ljharb/find-value-locations
[dev-deps-svg]: https://david-dm.org/ljharb/find-value-locations/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/find-value-locations#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/find-value-locations.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/find-value-locations.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/find-value-locations.svg
[downloads-url]: https://npm-stat.com/charts.html?package=find-value-locations
[codecov-image]: https://codecov.io/gh/ljharb/find-value-locations/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/find-value-locations/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/find-value-locations
[actions-url]: https://github.com/ljharb/find-value-locations/actions
