# properties

  defines new or modifies existing properties on an object with descriptor and configured descriptor property

## Installation

```batch
$ component install wryk/properties
```


## API

### properties(object, definitions, defaultDescriptor = {}, usedDescriptorProperty = 'value')

  `defaultDescriptor` default value is [javascript default descriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description) as an empty object `{}`.


  #### default params

  Example is a simple es6 [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FObject%2Fis) monkey-patch.
  Object.is is now a not configurable, not enumerable and not writable property with a shim function as value.

```javascript
properties(Object, {
  is: function (a, b) {
    if (a === b) {
      if (a === 0) {
        return 1 / a === 1 / b;
      } else {
        return true;
      }
    }

    return a !== a && b !== b;
  }
});

Object.is(0, -0); //false
Object.is(NaN, 0/0); //true
Object.propertyIsEnumerable('is'); //false
```

  #### with custom `usedDescriptorProperty`

  Example is a part of ArrayLike class with getter function for length property on prototype.

```javascript
properties(ArrayLike.prototype, {
  length: function () {
    return this._length;
  }
}, null, 'get');

var a = new ArrayLike();
a.length; //a._length value, in this case: 0
```
```javascript
properties(ArrayLike.prototype, {
  length: function () {
    return this._length;
  }
}, null, 'get');

var a = new ArrayLike();
a.length; //a._length value, in this case: 0
```


## Running tests
  First, make sure dependencies are installed:
```batch
$ npm install
```

  and build __properties__ component as standalone file:
```batch
$ make build
```

  finally, run test:
```batch
$ make test
```

## License

  MIT