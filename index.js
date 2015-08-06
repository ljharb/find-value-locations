'use strict';

var is = require('object-is');
var forEach = require('foreach');
var protochain = require('protochain');
var keys = require('object-keys');

var concat = Array.prototype.concat;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var getDescriptor = function getDescriptor(object, key) {
	if (Object.getOwnPropertyDescriptor) {
		return Object.getOwnPropertyDescriptor(object, key);
	}
	return {
		enumerable: isEnumerable.call(object, key),
		writable: true,
		configurable: false,
		value: object[key]
	};
};

var functionProto = Function.prototype;

var getOwnPropertiesWithValue = function getOwnProperties(object, value) {
    var props = [];
	var addTupleIfValue = function addTupleIfValue(key) {
		if (object === functionProto && (key === 'arguments' || key === 'caller')) {
			// v8 in iojs v3/Chrome will throw on Function.prototype.{arguments, caller}
			return;
		}
		if (is(object[key], value)) {
			props.push([object, key, getDescriptor(object, key)]);
		}
	};
	if (Object.getOwnPropertyNames) {
		forEach(Object.getOwnPropertyNames(object), addTupleIfValue);
	} else {
		forEach(keys(object), function (key) { addTupleIfValue(object, key); });
	}
	if (Object.getOwnPropertySymbols) {
		forEach(Object.getOwnPropertySymbols(object), addTupleIfValue);
	}
	return props;
};

var findKeys = function findKey(within, value) {
	var found = [];
	forEach(protochain(within), function (proto) {
		found = concat.call(found, getOwnPropertiesWithValue(proto, value));
	});
	return found;
};

module.exports = function findValueLocation(object, value) {
	if (typeof object === 'undefined' || object == null) {
		throw new TypeError('object param must not be null or undefined');
	}
	return findKeys(object, value);
};
