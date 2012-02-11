config.init({

  lint: {
    files: ["lib/*"]
  },

  jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      eqnull: true,
      browser: true,
      node: true
    },
    globals: {
      jQuery: true,
      ender: true
    }
  },

  min: {
    "dist/underscore.deferred.js": ["lib/underscore.deferred.js"]
  },

  qunit: {
    files: ["test/**/*.html"]
  },

  clean: {
    folder: "dist"
  }

});

// Run the following tasks...
task.registerTask("default", "lint min");
task.registerTask("test", "qunit clean min lint");
