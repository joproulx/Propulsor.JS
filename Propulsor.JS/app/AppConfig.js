require.config({
    paths: {
        'jquery': '../lib/jquery-2.1.1.min',
        'underscore': '../lib/underscore-min',
        'sylvester': '../lib/sylvester',
        'rbtree': '../lib/rbtree'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        sylvester: {
            exports: '$M'
        },
        rbstree: {
            exports: 'rbtree'
        }
    }
});

require(['jquery', 'underscore', 'sylvester', 'rbtree', 'AppMain'], function ($, _, $M, rbTree, main) {
    $(function () {
        var appMain = new main.AppMain();
        appMain.run();
    });
});
//# sourceMappingURL=AppConfig.js.map
