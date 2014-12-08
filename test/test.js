/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	mstdev = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-mstdev', function tests() {

	it( 'should export a function', function test() {
		expect( mstdev ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mstdev( value , 3 );
			};
		}
	});

	it( 'should throw an error if provided a window size which is not a positive integer', function test() {
		var values = [
			'5',
			2.7,
			-3,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mstdev( [], value );
			};
		}
	});

	it( 'should throw an error if the window size is greater than the array size', function test() {
		var data = [ 1, 2, 3 ];

		expect( foo ).to.throw( TypeError );

		function foo() {
			mstdev( data, data.length+1 );
		}
	});

	it( 'should return an array of zeros if provided a window size equal to 1', function test() {
		var data, expected, actual;

		data = [ 1, 2, 3 ];
		expected = [ 0, 0, 0 ];
		actual = mstdev( data, 1 );

		assert.deepEqual( actual, expected );
	});

	it( 'should compute a moving sample standard deviation', function test() {
		var data, actual, expected, W;

		// Set the window size:
		W = 3;

		// Simulate some data...
		data = [ 2, 1, 3, 5, 7, 0, 2];

		// Expected values:
		expected = [ 1, 2, 2, Math.sqrt(13), Math.sqrt(13) ];

		// Actual values:
		actual = mstdev( data , W );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
	});

});
