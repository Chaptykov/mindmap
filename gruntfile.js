'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        clean: {
            dist: ['dist/*']
        },

        concat: {
            js: {
                src: ['src/**/*.js'],
                dest: 'dist/mindmap.js'
            },
            css: {
                src: ['src/**/*.css'],
                dest: 'dist/mindmap.css'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['src/**/*.js', 'gruntfile.js']
        },

        uglify: {
            regular: {
                files: {
                    'dist/mindmap.min.js': ['<%= concat.js.dest %>']
                }
            }
        },

        csso: {
            regular: {
                files: {
                    'dist/mindmap.min.css': ['<%= concat.css.dest %>']
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ''
                }
            }
        },

        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['js'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            css: {
                files: ['src/**/*.css'],
                tasks: ['css'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('js', ['jshint', 'concat:js', 'uglify']);
    grunt.registerTask('css', ['concat:css', 'csso']);
    grunt.registerTask('default', ['clean', 'js', 'css']);
    grunt.registerTask('dev', ['default', 'connect', 'watch']);

};
