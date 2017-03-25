var root = {
    grunt: './Gruntfile.js',
    app: './app/',
    components: './app/components/',
    directives: './app/directives/',
    layout: './app/layout/',
    css: './app/assets/css/',
    images: './app/assets/images/',
    js: './app/assets/js/',
    fonts: './app/assets/fonts/',
    views: './app/views/',
    less: './app/less/',
    vendor: './vendor/',
    dist: './dist/',
    distjs: './dist/js/',
    distcss: './dist/css/'
};

module.exports = function (grunt) {
    // CONFIGURE GRUNT ===========================================================
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n */\n',

        // CONFIGURE JSHINT FOR VALIDATE JS FILES ========================================================
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                root.grunt,
                root.views + '**/*.js',
                root.layout + '**/*.js',
                root.directives + '**/*.js',
                root.views + '**/**/*.js'
            ],

        },

        // INSTALL EXTERNAL RESOURCES ========================================================
        bower: {
            install: {
                options: {
                    targetDir: 'vendor',
                    cleanBowerDir: true
                }
            }
        },

        // CONFIGURE CONCAT FOR CAONCATE GROUP OF FILES ========================================================
        concat: {
            options: {
                banner: "<%= banner %>"
            },
            build: {
                options: {
                    process: function (src, filepath) {
                        var fileSize = fs.statSync(filepath).size;
                        console.log("Processing '" + filepath + "' (" + fileSize + " bytes)");
                        return src;
                    },
                },
                src: [
                    root.vendor + 'angular/angular.js',
                    root.vendor + 'jquery/jquery.js',
                    root.vendor + 'angular-ui-router/angular-ui-router.js',
                    root.vendor + 'angular-cookies/angular-cookies.js',
                    root.vendor + 'bootstrap/bootstrap.js',
                    root.vendor + 'moment/moment.js'
                ],
                dest: root.js + 'vendor.js'
            }
        },

        // CONFIGURE LESS==================================================
        tags: {
            build: {
                src: [
                    root.css + 'vendor.min.css',
                    root.css + '*.css',
                    root.js + 'vendor.min.js',
                    root.app + '*.module.js',
                    root.app + '*.config.js',
                    root.app + '*.run.js',
                    root.app + '*.constant.js',
                    root.app + '*.controller.js',
                    root.app + '*.service.js',
                    root.directives + '**/*.js',
                    root.components + '**/*.js',
                    root.layout + '**/*.js',
                    root.views + '**/*.module.js',
                    root.views + '**/*.controller.js',
                    root.views + '**/*.service.js',
                    root.views + '**/*.factory.js'
                ],
                dest: 'app/index.html'
            },
            production: {
                src: [
                    root.distcss+ 'vendor.min.css',
                    root.distcss+ '<%= pkg.name %>.min.css',
                    root.distjs+ 'vendor.min.js',
                    root.distjs+ '<%= pkg.name %>.min.js',
                    root.distjs+ 'template.js'
                ],
                dest: 'dist/index.html'
            }
        },

        // CONFIGURE CSSMIN FOR MINIFY CSS FILES ========================================================
        cssmin: {
            options: {
                banner: "<%= banner %>"
            },
            build: {
                files: {
                    'app/assets/css/vendor.min.css': [root.vendor + '**/*.css']
                }
            }
        },

        // CONFIGURE LESS==================================================
        less: {
            build: {
                src: [root.less + '*.less', root.views + '**/*.less'],
                dest: root.css + '<%= pkg.name %>.min.css',
                options: {
                    compress: true
                }
            }
        },

        // CONFIGURE CLEAN ========================================================
        clean: {
            build: [root.dist]
        },

        // CONFIGURE COPY ========================================================
        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: root.app + 'assets/',
                        src: ['**'],
                        dest: root.dist
                    }
                ],
            },
            index: {
                files: [
                    {
                        expand: true,
                        cwd: root.app,
                        src: 'index.html',
                        dest: root.dist,
                        filter: 'isFile'
                    }
                ],
            }
        },

        // CONFIGURE HTML2JS ========================================================
        html2js: {
            production: {
                options: {
                    banner: "<%= banner %>",
                    base: 'app'
                },
                src: [root.views + '**/*.html', root.layout + '**/*.html', root.directives + '**/*.html'],
                dest: root.distjs + 'template.js',
                module: 'app.html'
            }
        },

        // CONFIGURE UGLIFY FOR MINIFY JS FILES ========================================================
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            build: {
                src: [
                    root.vendor + 'angular/angular.js',
                    root.vendor + 'jquery/jquery.js',
                    root.vendor + 'angular-ui-router/angular-ui-router.js',
                    root.vendor + 'angular-cookies/angular-cookies.js',
                    root.vendor + 'angular-scroll/angular-scroll.js',
                    root.vendor + 'bootstrap/bootstrap.js',
                    root.vendor + 'moment/moment.js',
                    root.vendor + 'ng-file-upload/ng-file-upload.js'
                ],
                dest: root.js + 'vendor.min.js'
            },
            production: {
                src: [
                    root.app + '*.module.js',
                    root.app + '*.config.js',
                    root.app + '*.run.js',
                    root.app + '*.constant.js',
                    root.app + '*.controller.js',
                    root.app + '*.service.js',
                    root.directives + '**/*.js',
                    root.components + '**/*.js',
                    root.layout + '**/*.js',
                    root.views + '**/*.module.js',
                    root.views + '**/*.controller.js',
                    root.views + '**/*.service.js',
                    root.views + '**/*.factory.js'
                ],
                dest: root.distjs + '<%= pkg.name %>.min.js'
            }
        },

        // CONFIGURE WATCH FOR AUTO UPDATE ========================================================
        watch: {
            build: {
                files: [
                    root.app + '*.js',
                    root.views + '**/*.js',
                    root.views + 'app.less',
                    root.views + '**/*.less'
                ],
                tasks: [
                    'jshint',
                    'less:build',
                    'tags:build'
                ],
                options: {
                    livereload: true,
                }
            }
        },

        // CONFIGURE JSCS FOR IDE ========================================================
        jscs: {
            all: {
                src: [
                    'Gruntfile.js',
                    root.views + '*.js',
                    root.views + '**/*.js'
                ]
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'app/'
                }
            }
        }

    });

    // LOAD GRUNT PLUGINS ========================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-html2js');
    //grunt.loadNpmTasks('grunt-cache-breaker');


    // CREATE TASKS ==============================================================
    grunt.registerTask('install', ['bower:install', 'tags:build', 'uglify:build', 'cssmin:build']);
    grunt.registerTask('production', ['less:build', 'uglify:build', 'clean', 'copy', 'html2js', 'uglify:production', 'tags:production']);
    grunt.registerTask('development', ['jshint', 'less:build', 'tags:build']);
    grunt.registerTask('build', ['development', 'connect', 'watch']);
    grunt.registerTask('default', []);

};
