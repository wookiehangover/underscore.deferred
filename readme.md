# Underscore.Deferred

v0.0.2

This is a port of jQuery.Deferred as an Underscore mixin, but it can be
used independently.. It currently matches the Deferred specifications
and implementation from jQuery 1.6.4, with all the associated helpers.

## Deferred's are great, lets take them everywhere

And let's adopt a sane, consistent API and make it portable. jQuery
added a handful of helper methods to their implementation of the
[Common.js Promise Spec][promise], and they're faithfully
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

## Roadmap

The goal is to slim the code footprint for robust deferreds as much as
possible while maintaining mixin integration with Underscore.

This is a work in progress, feel free to contribute.

MIT License.

[promise]: http://wiki.commonjs.org/wiki/Promises
