# find-value-locations <sup>[![Version Badge][2]][1]</sup>

[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

[![browser support][9]][10]

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

[1]: https://npmjs.org/package/find-value-locations
[2]: https://versionbadg.es/ljharb/find-value-locations.svg
[5]: https://david-dm.org/ljharb/find-value-locations.svg
[6]: https://david-dm.org/ljharb/find-value-locations
[7]: https://david-dm.org/ljharb/find-value-locations/dev-status.svg
[8]: https://david-dm.org/ljharb/find-value-locations#info=devDependencies
[11]: https://nodei.co/npm/find-value-locations.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/find-value-locations.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/find-value-locations.svg
[downloads-url]: https://npm-stat.com/charts.html?package=find-value-locations
