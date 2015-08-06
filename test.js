'use strict';

var test = require('tape');
var findValue = require('./');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
var assign = require('object.assign');

var defaultDescriptor = {
	enumerable: true,
	configurable: true,
	writable: true
};

test('requires something coercible to an object', function (t) {
	t['throws'](function () { findValue(null); }, TypeError, 'null throws');
	t['throws'](function () { findValue(); }, TypeError, 'undefined throws');
	t.end();
});

var value = {};

test('finds own properties', function (t) {
	var toStr = Object.prototype.toString;
	var obj = { a: toStr };
	var tuples = findValue(obj, toStr);
	t.deepEqual(tuples, [
		[obj, 'a', assign({ value: toStr }, defaultDescriptor)],
		[Object.prototype, 'toString', assign({}, defaultDescriptor, { enumerable: false, value: toStr })]
	], 'an own property is found');
	t.end();
});

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
		[Foo.prototype, 'property', assign({}, defaultDescriptor, { value: value })],
		[Baz.prototype, 'property', assign({}, defaultDescriptor, { value: value })]
	], 'new Foo has string properties that hold "value"');

	t.deepEqual(findValue(Number, Function.apply), [
		[Function.prototype, 'apply', assign({}, defaultDescriptor, { enumerable: false, value: Function.apply })]
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
		[Foo.prototype, 'property', assign({}, defaultDescriptor, { value: value })],
		[Foo.prototype, sym, assign({}, defaultDescriptor, { value: value })],
		[Baz.prototype, 'property', assign({}, defaultDescriptor, { value: value })]
	], 'new Foo has string and symbol properties that hold "value"');

	var expectedTuples = [
		[Array.prototype, Symbol.iterator, assign({}, defaultDescriptor, { enumerable: false, value: Array.prototype[Symbol.iterator] })]
	];
	if ('values' in Array.prototype) {
		expectedTuples.unshift([Array.prototype, 'values', assign({}, defaultDescriptor, { enumerable: false, value: Array.prototype.values })]);
	}
	t.deepEqual(findValue([], Array.prototype[Symbol.iterator]), expectedTuples, 'Array has default iterator');

	t.end();
});

test('does not throw when a getter throws', { skip: typeof Object.defineProperty !== 'function' }, function (t) {
	t.doesNotThrow(function () { findValue(Function.prototype); }, 'Function.prototype.caller/arguments throw in newer v8');
	var thrower = { boom: '!' };
	Object.defineProperty(thrower, 'boom', {
		enumerable: true,
		get: function () { throw new RangeError('no property for you'); }
	});
	t['throws'](function () { return thrower.boom; }, RangeError, 'object with throw-on-get property throws on get');
	t.doesNotThrow(function () { findValue(thrower); }, 'object with throw-on-get property does not throw on findValue');
	t.end();
});
