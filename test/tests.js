module("Basic Requirements");

test("its should be part of Underscore", function() {
  ok( _.VERSION );
  equal( typeof _.Deferred, 'function' );
});

