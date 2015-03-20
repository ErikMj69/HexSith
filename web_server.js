/* * * * * * * * * * *  HEXSITH SERVER  * * * * * * * * * * */

var http = require( 'http' ),
    url = require( 'url' ),
    fs = require( 'fs' );

var indexURL = 'app';
    logSrc = "server/logs/";

var req = {};

var routes = JSON.parse( fs.readFileSync( './server/config/routes.json', 'utf8' ) );

http.createServer( function( request, response ) {

  if( request.url !== "/" ) {
    fs.exists( indexURL + request.url, function( exists ) {
      if( exists )
        req.file = fs.readFileSync( indexURL + request.url );
      else
        req.file = fs.readFileSync( indexURL + "/404.html" );
    });
  } else
    req.file = fs.readFileSync( indexURL + routes.initPage );
  
  fs.writeFile( logSrc + "error/errno00.txt", request.url, function( err ) {
    if( err ) console.log( err );
  });
  response.writeHead( 200, { 'Content-Type': 'text/html' } );
  response.end( req.file );

}).listen( 36912 );

console.log( "Listening in port 36912" );