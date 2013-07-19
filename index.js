'use strict';

var defaults = require('defaults');

/**
 * @param {Object} object
 * @param {Object} definitions
 * @param {Object} [defaultDescriptor = {}]
 * @param {String} [usedDescriptorProperty = 'value']
 *
 * @return {Object}
**/
module.exports = function (object, definitions, defaultDescriptor, usedDescriptorProperty) {
	defaultDescriptor = defaultDescriptor || {};
	usedDescriptorProperty = usedDescriptorProperty || 'value';

	Object.keys(definitions).forEach(function (property) {
		var descriptor = {};
		descriptor[usedDescriptorProperty] = definitions[property];

		Object.defineProperty(object, property, defaults(descriptor, defaultDescriptor));
	});

	return object;
};