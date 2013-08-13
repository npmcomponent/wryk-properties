var defaults = require('defaults');

module.exports = function (object) {
	return new RootWrapper(object);
};



// RootWrapper
function RootWrapper (object) {
	this._object = object;
	this._default = {};
};

RootWrapper.prototype.default = function (descriptor) {
	this._default = descriptor;
};

RootWrapper.prototype.property = function (property) {
	return new PropertyWrapper(this._object, property);
};




// PropertyWrapper
function PropertyWrapper (object, property, parent) {
	this._object = object;
	this._default = {};
	this._property = property;
	this._parent = parent;
	this._descriptor = {};
}

PropertyWrapper.prototype.default = RootWrapper.prototype.default;

PropertyWrapper.prototype.property = function (property, descriptor) {
	var child = new PropertyWrapper(this._object[this._property], property, this);
	
	if (descriptor) {
		child._descriptor = descriptor;
		return child.define();
	} else {
		return child;
	}
};

PropertyWrapper.prototype.define = function () {
	var descriptors = [this._descriptor];
	var wrapper = this;

	while (wrapper = wrapper._parent) {
		descriptors.push(wrapper._descriptor);
	}

	Object.defineProperty(this._object, this._property, defaults.apply(null, descriptors));
	return this._parent;
};



PropertyWrapper.prototype.configurable = function (value) {
	this._descriptor.configurable = value === undefined ? true : value;
};

PropertyWrapper.prototype.enumerable = function (value) {
	this._descriptor.enumerable = value === undefined ? true : value;
};

PropertyWrapper.prototype.value = function (value) {
	this._descriptor.value = value === undefined ? this._object[this._property] : value;
};

PropertyWrapper.prototype.writable = function (value) {
	this._descriptor.writable = value === undefined ? true : value;
};

PropertyWrapper.prototype.getter = function (value) {
	this._descriptor.get = value;
};

PropertyWrapper.prototype.setter = function (value) {
	this._descriptor.set = value;	
};