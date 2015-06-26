'use strict';

var is = require('object-is');
var forEach = require('foreach');
var protochain = require('protochain');

var concat = Array.prototype.concat;
var hasOwn = Object.prototype.hasOwnProperty;

var getOwnPropertiesWithValue = function getOwnProperties(object, value) {
    var props = [];
	var addTupleIfValue = function addTupleIfValue(key) {
		if (is(object[key], value)) {
			props.push([object, key]);
		}
	};
	if (Object.getOwnPropertyNames) {
		forEach(Object.getOwnPropertyNames(object), addTupleIfValue);
	} else {
		for (var key in object) {
			if (hasOwn.call(object, key)) {
				addTupleIfValue(object, key);
			}
		}
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
