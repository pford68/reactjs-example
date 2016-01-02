/**
 * Created by paford on 1/1/16.
 */
var gulp = require("gulp");
var gutil = require("gulp-util");
var config = require("config");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config");

gulp.task("build:js", function(callback) {
    var myConfig = Object.create(webpackConfig);

    if (config.production === true) {
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


gulp.task("webpack:dev", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

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