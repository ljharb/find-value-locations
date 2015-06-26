'use strict';

var test = require('tape');
var findValue = require('./');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

test('requires something coercible to an object', function (t) {
	t['throws'](function () { findValue(null); }, TypeError, 'null throws');
	t['throws'](function () { findValue(); }, TypeError, 'undefined throws');
	t.end();
});

var value = {};

test('finds multiple values', function (t) {
	var Foo = function Foo() {};
	var Bar = function Bar() {};
	var Baz = function Baz() {};

	Bar.prototype = new Baz();
	Foo.prototype = new Bar();

	Baz.prototype.property = value;
	Foo.prototype.property = value;

	var tuples = findValue(new Foo(), value);

	t.deepEqual(tuples, [
		[Foo.prototype, 'property'],
		[Baz.prototype, 'property']
	], 'new Foo has string properties that hold "value"');

	t.deepEqual(findValue(Number, Function.apply), [
		[Function.prototype, 'apply']
	], 'Number has Function.apply on Function.prototype at "apply"');

	t.end();
});

test('finds Symbols too', { skip: !hasSymbols }, function (t) {
	var sym = Symbol('symbol');

	var Foo = function Foo() {};
	var Bar = function Bar() {};
	var Baz = function Baz() {};

	Bar.prototype = new Baz();
	Foo.prototype = new Bar();

	Baz.prototype.property = value;
	Foo.prototype[sym] = value;
	Foo.prototype.property = value;

	var tuples = findValue(new Foo(), value);

	t.deepEqual(tuples, [
		[Foo.prototype, 'property'],
		[Foo.prototype, sym],
		[Baz.prototype, 'property']
	], 'new Foo has string and symbol properties that hold "value"');

	t.deepEqual(findValue([], Array.prototype[Symbol.iterator]), [
		[Array.prototype, Symbol.iterator]
	], 'Array has default iterator');

	t.end();
});
