; (function ($, _, undefined) {
    "use strict";

    pr.controller.register('ui.flashMessage', {
        initialize: function () {
            this.fire();
        },

        fire: function () {
            new FlashMessage(this.scope.html(), 2).show();
        }
    });
}(jQuery, _));