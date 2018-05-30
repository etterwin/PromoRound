; (function ($, _, undefined) {
    "use strict";

    pr.controller.register('reputation.change', {

        initialize: function () {
            this.on('click', '[data-action="changeRating"]', this.changeRating);
        },

        changeRating: function (e) {
            e.preventDefault();

            var self = this;

            var url = $(e.currentTarget).attr('href');
            var type = $(e.currentTarget).attr('data-type');

            $.ajax({
                method: "POST",
                url: url,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    reputation: type
                }
            })
                .done(function (data) {
                    if (data.status == 'ok') {
                        self.updateButtons(data.current);
                    }

                    self.updateColor(data.total);

                    self.scope.find('[data-role="counter"]').html(data.total);
                });
        },

        updateButtons: function (current) {
            var plus = this.scope.find('[data-type="+1"]');
            var minus = this.scope.find('[data-type="-1"]');

            if (current == 'liked') {
                plus.hide();
                minus.show();
            } else if (current == 'disliked'){
                minus.hide();
                plus.show();
            }
        },

        updateColor: function (reputation) {
            this.scope.removeClass('organizers__rating_positive organizers__rating_negative');

            if (reputation > 0) {
                this.scope.addClass('organizers__rating_positive');
            } else if (reputation < 0) {
                this.scope.addClass('organizers__rating_negative');
            }
        },
    });
}(jQuery, _));