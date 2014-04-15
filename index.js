var defaults = require('avetisk-defaults');

module.exports = function (object) {
	return new Wrapper(object);
};



// Wrapper
function Wrapper (object, property, parent) {
	this._object = object;

	this._property = property;
	this._parent = parent;

	this._descriptor = {};
	this._default = {};
}

Wrapper.prototype.default = function (descriptor) {
	this._default = descriptor;
	return this;
};

Wrapper.prototype.property = function (property, descriptor) {
	var child = new Wrapper(
		this._property ? this._object[this._property] : this._object,
		property,
		this
	);
	
	if (descriptor) {
		child._descriptor = descriptor;
		return child.define();
	}

	return child;
};

Wrapper.prototype.define = function () {
	var descriptors = [this._descriptor];
	var wrapper = this;

	while (wrapper = wrapper._parent) {
		descriptors.push(wrapper._default);
	}

	Object.defineProperty(this._object, this._property, defaults.apply(null, descriptors));
	return this._parent;
};



Wrapper.prototype.configurable = function (value) {
	this._descriptor.configurable = value === undefined ? true : value;
	return this;
};

Wrapper.prototype.enumerable = function (value) {
	this._descriptor.enumerable = value === undefined ? true : value;
	return this;
};

Wrapper.prototype.value = function (value) {
	this._descriptor.value = value === undefined ? this._object[this._property] : value;
	return this;
};

Wrapper.prototype.writable = function (value) {
	this._descriptor.writable = value === undefined ? true : value;
	return this;
};

Wrapper.prototype.getter = function (value) {
	this._descriptor.get = value;
	return this;
};

Wrapper.prototype.setter = function (value) {
	this._descriptor.set = value;
	return this;
};