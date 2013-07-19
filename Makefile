
build: components index.js
	@component build -d -n properties
	@component build -d -n properties.standalone -s properties

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	@./node_modules/.bin/mocha --reporter spec --require should

.PHONY: build clean test