module("Basic Requirements");

test("its should be part of Underscore", function() {
  ok( _.VERSION );
  equal( typeof _.Deferred, 'function' );
});

//module("Basic Functionality");

//test("_.when", function(){
  //_.when( true ).done(function(){
    
  //});
//});
