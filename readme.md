# Underscore.Deferred

[![Build Status](https://secure.travis-ci.org/wookiehangover/underscore.deferred.png?branch=master)](http://travis-ci.org/wookiehangover/underscore.deferred)

v0.2.0 (jQuery 1.8.0)

This is a port of jQuery.Deferred as an Underscore mixin, but it can be
used without any depencencies. It currently matches the Deferred specifications
and implementation from jQuery 1.8.0, with all the associated helpers.

**Please note that as of 0.1.4 underscore.deferred will be ALL LOWERCASE on
npm.** The camelcasing was a mistake from the outset, please update your
`package.json` appropriately.


## Deferreds are great, let's take them everywhere

jQuery offers a robust, consistent and well documented API; this project aims
to make it portable. jQuery added a handful of helper methods to their
implementation of the [Common.js Promises Spec][promise], and they're faithfully
reproduced without any dependencies.

underscore.deferred provides complete pairity with the jQuery Deferred
API. Here are some of the method implemented:

* [always](http://api.jquery.com/deferred.always/)
* [done](http://api.jquery.com/deferred.done/)
* [fail](http://api.jquery.com/deferred.fail/)
* [notify](http://api.jquery.com/deferred.notify/)
* [notifyWith](http://api.jquery.com/deferred.notifywith/)
* [pipe](http://api.jquery.com/deferred.pipe/)
* [promise](http://api.jquery.com/deferred.promise/)
* [reject](http://api.jquery.com/deferred.reject/)
* [rejectWith](http://api.jquery.com/deferred.rejectWith/)
* [resolve](http://api.jquery.com/deferred.resolve/)
* [resolveWith](http://api.jquery.com/deferred.resolve/)
* [state](http://api.jquery.com/deferred.notifywith/)
* [then](http://api.jquery.com/deferred.then/)
* [when](http://api.jquery.com/jQuery.when/)

For the complete API documentation, look to the [jQuery Docs][jquery-docs].

This project wouldn't exist if not for the the hard work and effort put
into jQuery by its core team and contributors--thanks for making this
possible!

## Usage

underscore.deferred works on the server and in the browser.

In the browser, just require it like you would any other file. If you're
including Underscore on the page, make sure you include it before
underscore.deferred. If you don't have Underscore, the plugin attaches to
`window._`.

Addionally, underscore.Deferred can be used with the [Ender.js build
tool][ender], if you're into that sort of thing.

On the server, simply install via npm and require normally. If you'd like to
use it as an Underscore module, just do this:

    var _ = require('underscore')._
    _.mixin( require('underscore.deferred') );

But keep in mind that Underscore is not a strict requirement, and assigning it
to another namespace will always work.

## Build

One time setup command:

```
$ npm install
```

To build with [grunt](https://github.com/cowboy/grunt)

```
$ grunt
```

To run headless Qunit tests (must have phantomjs in your path)

```
$ grunt qunit
```

## Contributors

* [rwldrn](https://github.com/rwldrn)
* [tbranyen](https://github.com/tbranyen)
* [taxillian](https://github.com/taxilian)
* [danheberden](https://github.com/danheberden)

## Roadmap

The goal is to slim the code footprint for robust deferreds as much as
possible while maintaining mixin integration with Underscore and faithfullness
to the jQuery API.

This is a work in progress, feel free to contribute.

MIT License.

[promise]: http://wiki.commonjs.org/wiki/Promises
[jquery-docs]: http://api.jquery.com/category/deferred-object/
[ender]: http://ender.no.de/
