# Put your tests here in LiveScript (use mocha and include should)
# Take care about implicit `it` in describe callback with :
#	describe "description ..." (...) !->

# Require build component and external modules
require! {
	component: '../build/component'
}

describe "some useless tests" (...) !->
	it "should new empty string is an empty string" !->
		''.should.be.empty.and.an.instanceOf String

	it "should arguments object is not an array" !->
		args = do (1, 2, 3) -> return arguments
		args.should.not.be.an.instanceOf Array