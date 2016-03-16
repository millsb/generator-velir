module.exports = [
    {
        value: 'css',
        name: 'Compile SASS files to CSS',
        file: 'css.js',
        checked: true
    },
    {
        value: 'js',
        name: 'Use Babel + Browserify to transpile and bundle project javascript',
        file: 'js.js',
        checked: true
    },
    {
        value: 'bower',
        name: 'Bundle third-party code installed via bower',
        file: 'bower.js',
        checked: true
    },
    {
        value: 'svg-sprite',
        name: 'Generate a bundle of SVG symbols from files',
        file: 'svg-sprite.js',
        checked: true
    },
    {
        value: 'copy',
        name: 'Copy ??? [Need description]',
        file: 'copy.js',
        checked: false
    },
    {
        value: 'patternlab',
        name: 'Generate a patternlab site',
        file: 'patternlab.js',
        checked: false
    },
    {
        value: 'browserSync',
        name: 'Run a development server with automatic refresh',
        file: 'browserSync.js',
        checked: true
    },
];
