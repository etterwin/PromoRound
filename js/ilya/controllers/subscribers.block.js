; (function ($, _, undefined) {
    "use strict";

    pr.controller.register('subscribers.block', {

        initialize: function () {
            this.on('click', '[data-action="subscribe"]', this.updatePreference);
            this.on('click', '[data-action="unsubscribe"]', this.updatePreference);
        },

        updatePreference: function (e) {
            e.preventDefault();

            var self = this;

            var url = $(e.currentTarget).attr('href');

            $.ajax({
                method: "POST",
                url: url,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            })
                .done(function (data) {
                    if (data.status == 'ok') {
                        self.updateButton(data.current);
                    }

                    self.updateCounter(data.total);
                });
        },

        updateButton: function (current) {
            var subscribe = this.scope.find('[data-action="subscribe"]');
            var unsubscribe = this.scope.find('[data-action="unsubscribe"]');

            if (current == 'subscribed') {
                subscribe.hide();
                unsubscribe.show();
            } else if (current == 'unsubscribed') {
                unsubscribe.hide();
                subscribe.show();
            }
        },

        updateCounter: function (number) {
            this.scope.find('[data-role="counter"]').html(number);
        },
    });
}(jQuery, _));