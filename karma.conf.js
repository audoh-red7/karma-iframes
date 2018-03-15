// Karma configuration
// Generated on Wed Oct 25 2017 07:04:47 GMT+0200 (CEST)

let BROWSERS = [];
let PLUGINS = [
	'karma-mocha',
	'karma-chai',
	require('./index.js')
]

if('KARMA_BROWSER' in process.env) {
	process.env.KARMA_BROWSER.split(/\s*,\s*/).forEach(browser => {
		BROWSERS.push(browser);
		PLUGINS.push(`karma-${browser.replace(/_.*$/, '').toLowerCase()}-launcher`);
	});
} else {
	BROWSERS.push('Firefox', 'Chrome');
	PLUGINS.push('karma-firefox-launcher', 'karma-chrome-launcher');
	if(process.platform === 'darwin') {
		BROWSERS.push('Safari');
		PLUGINS.push('karma-safari-launcher');
	}
}

let runInParent = process.env['RUN_IN_PARENT'] === 'true';
console.info(`runInParent is ${runInParent ? '' : 'in'}active.`);

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		runInParent,

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'iframes'],


		// list of files / patterns to load in the browser
		files: [
			'test/included/**/*.js',
			{
				pattern: 'test/not-included/**/*.js',
				included: false
			},
			'test/included-not-transformed/**/*.js'
		],


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/included/**/*.js': ['iframes'],
			'test/not-included/**/*.js': [],
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
		logLevel: config.LOG_WARN,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: BROWSERS,

		plugins: PLUGINS,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		customLaunchers: {
			Chrome_NoSandbox: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		}
	})
}
