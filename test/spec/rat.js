var app, chai, expect, generate, randomRat, request, rootUrl, superagent;





// Imports
// =============================================================================

//app = require( '../../api.js' );
chai = require( 'chai' );
//request = require( 'express-mock-request' );
superagent = require( 'superagent' );
expect = chai.expect;

generate = require( '../generator' );





// Set up globals
// =============================================================================

rootUrl = 'http://localhost:8080/api';





// Before and After hooks
// =============================================================================





// PULL THE LEVER!
// =============================================================================

describe( 'POST /api/rats', function () {
  var rat;

  // Create a rescue object
  rat = generate.randomRat();

  it( 'should create a new rat', function ( done ) {

    superagent
    .post( rootUrl + '/rats' )
    .send( rescue )
    .end( function ( error, response ) {
      if ( error ) {
        return done( error );
      }

      // Make sure the POST succeeded
      expect( response.status ).to.equal( 201 );

      // Make sure there are no errors
      expect( response.body ).to.not.have.property( 'errors' );

      // Make sure our response is correctly constructed
      expect( response.body.data ).to.be.an( 'object' );

      // Check all of the properties on the returned object

      expect( response.body.data.CMDRname ).to.equal( rat.CMDRname );
      expect( response.body.data.gamertag ).to.equal( rat.gamertag );
      expect( response.body.data.drilled ).to.equal( rat.drilled );
      expect( response.body.data.nickname ).to.equal( rat.nickname );

      done();
    });
  });
});





describe( 'GET /api/rats', function () {

  it( 'should return a list of rats', function ( done ) {
    superagent
    .get( rootUrl + '/rats' )
    .end( function ( error, response ) {
      if ( error ) {
        return done( error );
      }

      // Make sure the GET succeeded
      expect( response.status ).to.equal( 200 );

      // Make sure there are no errors
      expect( response.body ).to.not.have.property( 'errors' );

      // Make sure our response is correctly constructed
      expect( response.body.data ).to.be.an( 'array' );

      done( error );
    });
  });
});









describe( 'GET /api/rats/:id', function () {

  var rat;

  // Create a rescue object
  rat = generate.randomRat();

  // Create a new rescue to test against
  before( function ( done ) {
    superagent
    .post( rootUrl + '/rats' )
    .send( rat )
    .end( function ( error, response ) {
      if ( error ) {
        return done( error );
      }

      rat.id = response.body.data.id;

      done();
    });
  });

  it( 'should return a rescue', function ( done ) {
    superagent
    .get( rootUrl + '/rescues/' + rescue.id )
    .end( function ( error, response ) {
      if ( error ) {
        return done( error );
      }

      // Make sure the request succeeded
      expect( response.status ).to.equal( 200 );

      // Make sure there are no errors
      expect( response.body ).to.not.have.property( 'errors' );

      // Make sure our response is correctly constructed
      expect( response.body.data ).to.be.an( 'object' );

      // Make sure our response has the right data
      expect( response.body.data.id ).to.equal( rat.id );

      done();
    });
  });
});





describe( 'PUT /api/rats/:id', function () {
  var newNickname, rat;

  // Create a rescue object
  rat = generate.randomRat();

  // Create a new rescue to test against
  before( function ( done ) {
    superagent
    .post( rootUrl + '/rats' )
    .send( rat )
    .end( function ( error, response ) {
      if ( error ) {
        return done( error );
      }

      rat.id = response.body.data.id;

      done();
    });
  });

  it( 'should update a rat', function ( done ) {
    superagent
    .put( rootUrl + '/rats/' + rescue.id )
    .send({
      nickname: 'Edited Test Rat ' + ( Date.now() - parseInt( ( Math.random() * Math.random() ) * 1000000 ) ).toString( 36 )
    })
    .end( function ( error, response ) {
      if ( error ) {
        return done( error );
      }

      // Make sure the POST succeeded
      expect( response.status ).to.equal( 200 );

      done();
    });
  });
});

