; (function ($) {
    "use strict";

    function FlashMessage(message, delay, position) {
        this.message = message;
        this.delay = delay ? delay : 4;
        this.position = position ? position : 'topCenter';

        this.element = $('<div/>').hide().html(message);

        $('body').append(this.element);
    }

    FlashMessage.prototype.show = function () {
        var self = this;

        this.element
            .css({ zIndex: 2000 })
            .attr('class', '')
            .addClass('flashMessage')
            .addClass('flashMessage_' + this.position)
            .addClass('animated fadeInDown')
            .show()
            .animationComplete(function () {
                setTimeout(function () {
                    self.element.addClass('animated fadeOutDown');
                }, self.delay * 1000);
            });
    }

    window.FlashMessage = FlashMessage;

}(jQuery));