module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  concat_deps: {
    options: {
        out:   'out/out.js'
    },
    files:   {
        src:  'Propulsor.JS/**/*.js'
    },
  },
})

  

grunt.loadNpmTasks('grunt-concat-deps');

// Default task(s).
  grunt.registerTask('default', ['concat_deps']);

};