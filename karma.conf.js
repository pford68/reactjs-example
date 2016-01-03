// Karma configuration
// Generated on Wed Apr 09 2014 07:37:53 GMT-0400 (Eastern Daylight Time)
var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = "inline-source-map";
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [,
            //'test/shims/*.js',  // The shim is not working when loaded this way.
            //'node_modules/react-addons-test-utils/*.js', // Putting this here didn't help.
            'test/spec/**'
        ],


        // list of preprocessors
        preprocessors: {
            'test/**/*.js': ['webpack', 'sourcemap']  // Without 'webpack' here, you get "Can't find variable require" errors.
        },


        webpack: webpackConfig,


        webpackMiddleware: {
            stats: {
                colors: true
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,



        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
