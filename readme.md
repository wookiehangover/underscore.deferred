# Underscore.Deferred

v0.0.2

This is a port of jQuery.Deferred as an Underscore mixin, but it can be
used without any depencencies. It currently matches the Deferred specifications
and implementation from jQuery 1.6.4, with all the associated helpers.

## Deferred's are great, let's take them everywhere

jQuery offers a robust, consistent and well documented API; this project aims
to make it portable. jQuery added a handful of helper methods to their
implementation of the [Common.js Promise Spec][promise], and they're faithfully
reproduced without any dependencies.

Underscore.Deferred supports the following methods:

* done
* resolveWith
* resolve
* isResolved
* then
* always
* fail
* rejectWith
* reject
* isRejected
* pipe
* promise

For specific API documentation, look to the [jQuery Docs][jquery-docs].

## Build

One time setup command:

```
$ npm install
```

To build

```
$ jake
```


## Usage

Underscore.Deferred works on the server and in the browser.

In the browser, just require it like you would any other file. If you're
including Underscore on the page, make sure you include it before
Underscore.Deferred. If you don't have Underscore, the plugin attaches to
`window._`.

Addionally, underscore.Deferred can be used with the [Ender.js build
tool][ender], if you're into that sort of thing.

On the server, simply install via npm and require normally. If you'd like to
use it as an Underscore module, just do this:

    var _ = require('underscore')._
    _.mixin( require('underscore.deferred') );

But keep in mind the Underscore is not a strict requirement, and assigning it
to another namespace will always work.

## Roadmap

The goal is to slim the code footprint for robust deferreds as much as
possible while maintaining mixin integration with Underscore and faithfullness
to the jQuery API.

This is a work in progress, feel free to contribute.

MIT License.

[promise]: http://wiki.commonjs.org/wiki/Promises
[jquery-docs]: http://api.jquery.com/category/deferred-object/
[ender]: http://ender.no.de/
