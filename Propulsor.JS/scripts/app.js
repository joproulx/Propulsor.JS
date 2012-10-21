
// Do not start your path with '/' otherwise it won't work

require.config({
    paths: {
        'libs/jquery/jqueryLib': 'libs/jquery/jquery',
        'libs/underscore/underscoreLib': 'libs/underscore/underscore',
        'libs/sylvester/sylvesterLib': 'libs/sylvester/sylvester'
    },
    shim: {
        'libs/underscore/underscoreLib': {
            exports: '_'
        },
        'libs/jquery/jqueryLib': {
            exports: '$'
        },
        'libs/sylvester/sylvesterLib': {
            exports: '$M'
        }
    }
});
