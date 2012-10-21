require.config({
    paths: {
        'libs/underscore/underscoreLib': 'libs/underscore/underscore'
    },
    shim: {
        'libs/underscore/underscoreLib': {
            exports: '_'
        }
    }
});
