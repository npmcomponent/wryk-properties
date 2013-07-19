properties = require('../build/properties.standalone');

describe('properties(object, definitions, defaultDescriptor, usedDescriptorProperty)', function () {
	it('should return `object` param', function () {
		var o = {};

		properties(o, {}).should.equal(o);
	});

	it('should defines new or modifies existing values properties on `object` using `definitions` map', function () {
		var o = {
			existingProperty: 'old value for existing property',
			otherExistingProperty: 'old value for other existing property'
		};

		properties(o, {
			newProperty: 'new value for new property',
			existingProperty: 'new value for existing property'
		});

		o.should.have.property('newProperty', 'new value for new property');
		o.should.have.property('existingProperty', 'new value for existing property');
		o.should.have.property('otherExistingProperty', 'old value for other existing property');
	});

	it('should use `defaultDescriptor` as descriptor for all properties', function () {
		var o = {}, descriptor;

		properties(o, {
			property: 'propertyValue'
		}, {
			configurable: true,
			enumerable: true,
			writable: true,
		});

		descriptor = Object.getOwnPropertyDescriptor(o, 'property');

		descriptor.configurable.should.be.true;
		descriptor.enumerable.should.be.true;
		descriptor.writable.should.be.true;
		descriptor.value.should.be.equal('propertyValue');
		descriptor.should.not.have.property('get');
		descriptor.should.not.have.property('set');
	});

	it('should use `usedDescriptorProperty` for change the descriptor property used with `definitions` values', function () {
		var o = {}, 
			_get = '_get value',
			_set = '_set value';

		properties(o, {
			get: function () { return _get; }
		}, null, 'get');

		properties(o, {
			set: function (newValue) { _set = newValue; }
		}, null, 'set');

		
		o.get.should.be.equal(_get);

		o.set = 'new _set value';
		_set.should.be.equal('new _set value');
	});
});