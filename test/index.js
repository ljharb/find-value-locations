'use strict';

var test = require('tape');
var findValue = require('../');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
var assign = require('object.assign');
var hasProto = require('has-proto')();

var defaultDescriptor = {
	configurable: true,
	enumerable: true,
	writable: true
};

test('requires something coercible to an object', function (t) {
	// @ts-expect-error
	t['throws'](function () { findValue(null); }, TypeError, 'null throws');
	// @ts-expect-error
	t['throws'](function () { findValue(); }, TypeError, 'undefined throws');
	t.end();
});

var value = {};

test('finds own properties', function (t) {
	var toStr = Object.prototype.toString;
	var obj = { a: toStr };
	var tuples = findValue(obj, toStr);
	t.deepEqual(
		tuples,
		[
			[obj, 'a', assign({ value: toStr }, defaultDescriptor)],
			[Object.prototype, 'toString', assign({}, defaultDescriptor, { enumerable: false, value: toStr })]
		],
		'an own property is found'
	);
	t.end();
});

test('finds multiple values', function (t) {
	/** @constructor */
	var Foo = function Foo() {};
	/** @constructor */
	var Bar = function Bar() {};
	/** @constructor */
	var Baz = function Baz() {};

	Bar.prototype = new Baz();
	Foo.prototype = new Bar();

	Baz.prototype.property = value;
	// @ts-expect-error TODO FIXME
	Foo.prototype.property = value;

	var tuples = findValue(new Foo(), value);

	t.deepEqual(
		tuples,
		[
			[Foo.prototype, 'property', assign({}, defaultDescriptor, { value: value })],
			[Baz.prototype, 'property', assign({}, defaultDescriptor, { value: value })]
		],
		'new Foo has string properties that hold "value"'
	);

	t.deepEqual(
		findValue(Number, Function.apply),
		[
			[Function.prototype, 'apply', assign({}, defaultDescriptor, { enumerable: false, value: Function.apply })]
		],
		'Number has Function.apply on Function.prototype at "apply"'
	);

	t.end();
});

test('finds Symbols too', { skip: !hasSymbols }, function (t) {
	var sym = Symbol('symbol');

	/** @constructor */
	var Foo = function Foo() {};
	/** @constructor */
	var Bar = function Bar() {};
	/** @constructor */
	var Baz = function Baz() {};

	Bar.prototype = new Baz();
	Foo.prototype = new Bar();

	Baz.prototype.property = value;
	// @ts-expect-error TODO FIXME
	Foo.prototype[sym] = value;
	// @ts-expect-error TODO FIXME
	Foo.prototype.property = value;

	var tuples = findValue(new Foo(), value);

	t.deepEqual(
		tuples,
		[
			[Foo.prototype, 'property', assign({}, defaultDescriptor, { value: value })],
			[Foo.prototype, sym, assign({}, defaultDescriptor, { value: value })],
			[Baz.prototype, 'property', assign({}, defaultDescriptor, { value: value })]
		],
		'new Foo has string and symbol properties that hold "value"'
	);

	/** @type {import('..').ValueLocation[]} */
	var expectedTuples = [
		[
			Array.prototype,
			Symbol.iterator,
			assign({}, defaultDescriptor, { enumerable: false, value: Array.prototype[Symbol.iterator] })
		]
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

test('null objects', { skip: !hasProto }, function (t) {
	var obj = { __proto__: null, a: 42, b: null };
	t.deepEqual(
		findValue(obj, null),
		[[obj, 'b', assign({ value: null }, defaultDescriptor)]],
		'own property on a null object is found'
	);

	var nested = { __proto__: obj, c: 42, d: null };
	t.deepEqual(
		findValue(nested, null),
		[
			[nested, 'd', assign({ value: null }, defaultDescriptor)],
			[obj, 'b', assign({ value: null }, defaultDescriptor)]
		],
		'own property on a nested null object is found'
	);
	t.deepEqual(
		findValue(nested, 42),
		[
			[nested, 'c', assign({ value: 42 }, defaultDescriptor)],
			[obj, 'a', assign({ value: 42 }, defaultDescriptor)]
		],
		'own property on a nested null object is found'
	);

	t.end();
});
