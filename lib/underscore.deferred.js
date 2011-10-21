/*jshint onevar: false,*/
(function(root){

  // Let's borrow a couple of things from Underscore that we'll need

  // _.each
  var breaker = {},
      AP = Array.prototype,
      OP = Object.prototype,

      hasOwn = OP.hasOwnProperty,
      toString = OP.toString,
      forEach = AP.forEach,
      slice = AP.slice;

  var _each = function(obj, iterator, context) {
    if ( obj == null ) return;
    if ( forEach && obj.forEach === forEach ) {
      obj.forEach( iterator, context );
    } else if ( obj.length === +obj.length ) {
      for ( var i = 0, l = obj.length; i < l; i++ ) {
        if ( i in obj && iterator.call(context, obj[i], i, obj ) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if ( hasOwn.call(obj, key) ) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // _.isFunction
  var _isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  // _.extend
  var _extend = function(obj) {
    _each( slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // And some jQuery specific helpers

  var class2type = { "[object Array]": "array", "[object Function]": "function" };

  var _type = function( obj ) {
    return obj == null ?
      String( obj ) :
      class2type[ toString.call(obj) ] || "object";
  };

  // Now start the jQuery-cum-Underscore implementation. Some very
  // minor changes to the jQuery source to get this working.

  var promiseMethods = "done fail isResolved isRejected promise then always pipe".split(" ");

  // Internal Deferred namespace
  var _d = {};

  // The single base Deferred Obj
  _d._Deferred = function() {
    var // callbacks list
      callbacks = [],
      // stored [ context , args ]
      fired,
      // to avoid firing when already doing so
      firing,
      // flag to know if the deferred has been cancelled
      cancelled,
      // the deferred itself
      deferred  = {

        // done( f1, f2, ...)
        done: function() {
          if ( !cancelled ) {
            var args = arguments,
              i,
              length,
              elem,
              type,
              _fired;
            if ( fired ) {
              _fired = fired;
              fired = 0;
            }
            for ( i = 0, length = args.length; i < length; i++ ) {
              elem = args[ i ];
              type = _type( elem );
              if ( type === "array" ) {
                deferred.done.apply( deferred, elem );
              } else if ( type === "function" ) {
                callbacks.push( elem );
              }
            }
            if ( _fired ) {
              deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
            }
          }
          return this;
        },

        // resolve with given context and args
        resolveWith: function( context, args ) {
          if ( !cancelled && !fired && !firing ) {
            // make sure args are available (#8421)
            args = args || [];
            firing = 1;
            try {
              while( callbacks[ 0 ] ) {
                callbacks.shift().apply( context, args );
              }
            }
            finally {
              fired = [ context, args ];
              firing = 0;
            }
          }
          return this;
        },

        // resolve with this as context and given arguments
        resolve: function() {
          deferred.resolveWith( this, arguments );
          return this;
        },

        // Has this deferred been resolved?
        isResolved: function() {
          return !!( firing || fired );
        },

        // Cancel
        cancel: function() {
          cancelled = 1;
          callbacks = [];
          return this;
        }
      };

    return deferred;
  };

  // Full fledged deferred (two callbacks list)
  _d.Deferred = function( func ) {
    var deferred = new _d._Deferred(),
      failDeferred = new _d._Deferred(),
      promise;
    // Add errorDeferred methods, then and promise
    _extend( deferred, {
      then: function( doneCallbacks, failCallbacks ) {
        deferred.done( doneCallbacks ).fail( failCallbacks );
        return this;
      },
      always: function() {
        return deferred.done.apply( deferred, arguments ).fail.apply( this, arguments );
      },
      fail: failDeferred.done,
      rejectWith: failDeferred.resolveWith,
      reject: failDeferred.resolve,
      isRejected: failDeferred.isResolved,
      pipe: function( fnDone, fnFail ) {
        return _d.Deferred(function( newDefer ) {
          _each( {
            done: [ fnDone, "resolve" ],
            fail: [ fnFail, "reject" ]
          }, function( data, handler ) {
            var fn = data[ 0 ],
              action = data[ 1 ],
              returned;
            if ( _isFunction( fn ) ) {
              deferred[ handler ](function() {
                returned = fn.apply( this, arguments );
                if ( returned && _isFunction( returned.promise ) ) {
                  returned.promise().then( newDefer.resolve, newDefer.reject );
                } else {
                  newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                }
              });
            } else {
              deferred[ handler ]( newDefer[ action ] );
            }
          });
        }).promise();
      },
      // Get a promise for this deferred
      // If obj is provided, the promise aspect is added to the object
      promise: function( obj ) {
        if ( obj == null ) {
          if ( promise ) {
            return promise;
          }
          promise = obj = {};
        }
        var i = promiseMethods.length;
        while( i-- ) {
          obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ];
        }
        return obj;
      }
    });
    // Make sure only one callback list will be used
    deferred.done( failDeferred.cancel ).fail( deferred.cancel );
    // Unexpose cancel
    delete deferred.cancel;
    // Call given func if any
    if ( func ) {
      func.call( deferred, deferred );
    }
    return deferred;
  };

  // Deferred helper
  _d.when = function( firstParam ) {
    var args = arguments,
    i = 0,
    length = args.length,
    count = length,
    deferred = length <= 1 && firstParam && _isFunction( firstParam.promise ) ?
      firstParam :
      _d.Deferred();
    function resolveFunc( i ) {
      return function( value ) {
        args[ i ] = arguments.length > 1 ? slice.call( arguments, 0 ) : value;
        if ( !( --count ) ) {
          // Strange bug in FF4:
          // Values changed onto the arguments object sometimes end up as undefined values
          // outside the $.when method. Cloning the object into a fresh array solves the issue
          deferred.resolveWith( deferred, slice.call( args, 0 ) );
        }
      };
    }
    if ( length > 1 ) {
      for( ; i < length; i++ ) {
        if ( args[ i ] && _isFunction( args[ i ].promise ) ) {
          args[ i ].promise().then( resolveFunc(i), deferred.reject );
        } else {
          --count;
        }
      }
      if ( !count ) {
        deferred.resolveWith( deferred, args );
      }
    } else if ( deferred !== firstParam ) {
      deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
    }
    return deferred.promise();
  };

  // Try exporting as a Common.js Module
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _d;

  // Or mixin to Underscore.js
  } else if (typeof root._ !== 'undefined') {
    root._.mixin(_d);

  // Or assign it to window._
  } else {
    root._ = _d;
  }

})(this || window);

