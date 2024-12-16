'use strict';

var is = require('object-is');
var forEach = require('for-each');
var protochain = require('protochain');
var ownKeys = require('reflect.ownkeys');
var safeConcat = require('safe-array-concat');
var callBound = require('call-bound');

var $push = callBound('Array.prototype.push');
var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var gOPD = Object.getOwnPropertyDescriptor;

var getDescriptor = function getPropertyDescriptor(object, key) {
	if (gOPD) {
		return gOPD(object, key);
	}
	return {
		configurable: false,
		enumerable: $isEnumerable(object, key),
		value: object[key],
		writable: true
	};
};

var getOwnPropertiesWithValue = function getOwnProperties(object, value) {
	var props = [];
	var addTupleIfValue = function addTupleIfValueMatches(key) {
		try {
			if (is(object[key], value)) {
				$push(props, [
					object,
					key,
					getDescriptor(object, key)
				]);
			}
		} catch (e) { /**/ }
	};
	forEach(ownKeys(object), addTupleIfValue);
	return props;
};

var findKeys = function findKey(within, value) {
	var found = [];
	forEach(safeConcat([within], protochain(within)), function (proto) {
		found = safeConcat(found, getOwnPropertiesWithValue(proto, value));
	});
	return found;
};

module.exports = function findValueLocation(object, value) {
	if (typeof object === 'undefined' || object === null) {
		throw new TypeError('object param must not be null or undefined');
	}
	return findKeys(object, value);
};
