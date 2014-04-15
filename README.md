*This repository is a mirror of the [component](http://component.io) module [wryk/properties](http://github.com/wryk/properties). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/wryk-properties`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# properties

  defines new or modifies properties on an object with  data/accessor descriptor


## Installation

```batch
$ component install wryk/properties
```

## Usage
  

```js
//use properties for es6 Object.is and Object.mixin monkey-patch
var properties = require('properties');

var is = function (a, b) {
  //code for es6 Object.is shim
};

var mixin = function (target, source) {
  //code for es6 Object.mixin shim
};


properties(Object)
  //use sugar form for is
  .property('is')
    .configurable()
    .writable()
    .enumerable(false)
    .value(is)
    .define()

  //use basic form for mixin
  .property('mixin', {
    configurable: true,
    writable: true,
    enumerable: false,
    value: mixin
  })
;



//or you can use default method
properties(Object)
  //default descriptor
  .default({ writable: true, configurable: true, enumerable: false })

  //sugar form
  .property('is')
    .value(is)
    .define()

  //basic form
  .property('mixin', {
    value: mixin
  })
;
```



## API

### properties(object)
### properties(object).default(descriptor)
### properties(object).property(property)
### properties(object).property(property).configurable([value = true])
### properties(object).property(property).writable([value = true])
### properties(object).property(property).enumerable([value = true])
### properties(object).property(property).getter(value)
### properties(object).property(property).setter(value)
### properties(object).property(property).value(value)
### properties(object).property(property).define()
 

## Running tests
  First, make sure dependencies are installed:
```batch
$ npm install
```

  and run test:
```batch
$ make test
```

## License

  MIT
