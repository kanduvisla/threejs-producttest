// Gruntfile.js
module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload : true
                }
            }
        },
        sass: {
            default: {
                files: {
                    'css/screen.css' :
                    'sass/screen.scss'
                }
            }
        }
    });

    // grunt.registerTask('watch', []);
};