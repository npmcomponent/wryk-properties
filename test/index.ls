require! {
	properties: '../build/properties'
}

describe "properties(object)" (...) !->

	describe ".default(descriptor)" (...) !->
		it "should set default descriptor used in define process" !->
			object = {}

			properties object
				.default { -enumerable, +configurable, +writable }
				.property 'foo' { +enumerable, -writable }

			descriptor = Object.getOwnPropertyDescriptor object, 'foo'

			descriptor.enumerable.should.be.true
			descriptor.configurable.should.be.true
			descriptor.writable.should.be.false


	describe ".property(property, descriptor)" (...) !->
		it "should set data and accessor descriptor for this property" !->
			object = {}

			properties object
				.property 'foo' { value: 'bar', +writable }

			descriptor = Object.getOwnPropertyDescriptor object, 'foo'

			descriptor.value.should.be.equal 'bar'
			descriptor.writable.should.be.true


	describe ".property(property)" (...) !->
		describe ".configurable(value)" (...) !->
			it "should set the configurable descriptor property" !->
				object = {}

				properties object
					.property 'foo'
						.configurable true
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.configurable.should.be.true

			it "should have true as default value" !->
				object = {}

				properties object
					.property 'foo'
						.configurable!
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.configurable.should.be.true


		describe ".enumerable(value)" (...) !->
			it "should set the enumerable descriptor property" !->
				object = {}

				properties object
					.property 'foo'
						.enumerable true
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.enumerable.should.be.true

			it "should have true as default value" !->
				object = {}

				properties object
					.property 'foo'
						.enumerable!
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.enumerable.should.be.true


		describe ".value(value)" (...) !->
			it "should set the value descriptor property" !->
				object = {}

				properties object
					.property 'foo'
						.value 'baz'
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.value.should.be.equal 'baz'

			it "should have the current defined value as default value" !->
				object = { foo: 'baz' }

				properties object
					.property 'foo'
						.value!
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.value.should.be.equal 'baz'


		describe ".writable(value)" (...) !->
			it "should set the writable descriptor property" !->
				object = {}

				properties object
					.property 'foo'
						.writable true
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.writable.should.be.true

			it "should have true as default value" !->
				object = {}

				properties object
					.property 'foo'
						.writable!
						.define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.writable.should.be.true


		describe ".getter(value)" (...) !->
			it "should set the get accessor descriptor property" !->
				object = {}

				properties object
					.property 'foo'
						.getter -> 'bar'
						.define!

				object.foo.should.be.equal 'bar'


		describe ".setter(value)" (...) !->
			it "should set the set accessor descriptor property" !->
				object = {}

				properties object
					.property 'foo'
						.setter !-> @fuu = it
						.define!

				object.foo = 'fuuu'
				object.fuu.should.be.equal 'fuuu'


		describe ".define()" (...) !->
			it "should define property with the current configured descriptor" !->
				object = {}

				properties object
					.property 'foo'
						.configurable!writable!value 'fuu' .define!

				descriptor = Object.getOwnPropertyDescriptor object, 'foo'

				descriptor.configurable.should.be.true
				descriptor.writable.should.be.true
				descriptor.value.should.be.equal 'fuu'