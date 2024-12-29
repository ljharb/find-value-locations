'use strict';

var is = require('object-is');
var forEach = require('for-each');
var protochain = require('protochain');
var ownKeys = require('own-keys');
var safeConcat = require('safe-array-concat');
var callBound = require('call-bound');
var gOPD = require('gopd');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

/** @type {NonNullable<typeof gOPD>} */
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

/** @type {(obj: {}, value: unknown) => import('.').ValueLocation[]} */
var getOwnPropertiesWithValue = function getOwnProperties(object, value) {
	/** @type {import('.').ValueLocation[]} */
	var props = [];
	forEach(ownKeys(object), function (key) {
		try {
			if (is(object[key], value)) {
				props[props.length] = [
					object,
					key,
					// eslint-disable-next-line no-extra-parens
					/** @type {PropertyDescriptor} */ (getDescriptor(object, key))
				];
			}
		} catch (e) { /**/ }
	});
	return props;
};

/** @type {(obj: {}, value: unknown) => import('.').ValueLocation[]} */
var findKeys = function findKey(within, value) {
	/** @type {import('.').ValueLocation[]} */
	var found = [];
	forEach(safeConcat([within], protochain(within)), function (proto) {
		found = safeConcat(found, getOwnPropertiesWithValue(proto, value));
	});
	return found;
};

/** @type {import('.')} */
module.exports = function findValueLocations(object, value) {
	if (typeof object === 'undefined' || object === null) {
		throw new TypeError('object param must not be null or undefined');
	}
	return findKeys(object, value);
};
