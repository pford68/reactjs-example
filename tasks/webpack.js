/**
 * Created by paford on 1/1/16.
 */
var gulp = require("gulp");
var gutil = require("gulp-util");
var config = require("config");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../webpack.config");


/**
 * Builds the JavaScript bundle
 */
gulp.task("build:js", function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins || []; // Preventing NPE at line 17.

    if (process.env.NODE_ENV === 'production') {
        // modify some webpack config options
        myConfig.plugins = myConfig.plugins.concat(
            new webpack.DefinePlugin({
                "process.env": {
                    // This has effect on the react lib size
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        );

        // run webpack
        webpack(myConfig, function(err, stats) {
            if(err) throw new gutil.PluginError("build:js", err);
            gutil.log("[webpack:build]", stats.toString({
                colors: true
            }));
            callback();
        });
    } else {
        webpack(myConfig, function (err, stats) {
            if (err) throw new gutil.PluginError("build:js", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
    }
});


/**
 * Starts a simple Node dev server, only meant to serve the client.
 */
gulp.task("webpack:dev", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    // The dev-server requires an absolute path to the location of the JavaScript bundle.
    myConfig.output.path = __dirname + "/build/js";

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        contentBase: './build',  // By default files are served from the CWD.  We want them served from build.
        publicPath: "./" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});