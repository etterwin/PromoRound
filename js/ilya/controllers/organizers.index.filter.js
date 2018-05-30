; (function ($, _, undefined) {
    "use strict";

    pr.controller.register('organizers.index.filter', {

        area: null,

        url: null,
        page: 1,

        verified: null,
        category: null,
        sortOption: 'created_at',
        sortDirection: 'desc',
        search: null,

        initialize: function () {
            this.on('change', '[name="organizers__verified"]', this.toggleVerified);
            this.on('selectmenuchange', '[name="organizers__category"]', this.toggleCategory);
            this.on('selectmenuchange', '[name="organizers__sort"]', this.toggleSortOption);
            this.on('keyup', '[name="organizers__search"]', this.doSearch);
            this.on('click', '[data-action="loadMore"]', this.loadMore);

            this.setup();
        },

        setup: function () {
            this.listingArea = this.scope.find('.organizers__area');

            this.buildUrl();
        },

        updateResults: function () {
            this.page = 1;
            this.buildUrl();

            var self = this;

            console.log(this.url);

            $.ajax({
                method: "GET",
                url: this.url
            })
                .done(function (data) {
                    self.listingArea.html(data);
                });
        },

        updateUrl: function (urlPath) {
            window.history.pushState({}, "", urlPath);
        },

        buildUrl: function () {
            var path = "";

            path = path + (this.verified ? "&verified=" + this.verified : "");
            path = path + (this.category ? "&category=" + this.category : "");
            path = path + (this.sortOption != 'created_at' ? "&sortOption=" + this.sortOption : "");
            path = path + (this.sortDirection != 'desc' ? "&sortDirection=" + this.sortDirection : "");
            path = path + (this.page != 1 ? "&page=" + this.page : "");
            path = path + (this.search ? "&search=" + this.search : "");

            this.url = "/organizers" + path.replace(/^&/, "?");

            this.updateUrl(this.url);
        },

        toggleVerified: function (e) {
            this.type = null;

            if ($(e.currentTarget).prop('checked')) {
                this.type = 1;
            }

            this.updateResults();
        },

        toggleCategory: function (e) {
            this.category = $(e.currentTarget).find(':checked').attr('value');

            this.updateResults();
        },

        toggleSortOption: function (e) {
            this.sortOption = $(e.currentTarget).find(':checked').attr('value');

            this.updateResults();
        },

        doSearch: function (e) {
            var query = $(e.currentTarget).val();

            this.search = null;

            // Don't search for 1-2 symbols
            if (query.length > 2) {
                this.search = query;
            }

            // Update only in case field is empty or contains more than two symbols
            if (query.length == 0 || query.length > 2) {
                this.updateResults();
            }
        },

        loadMore: function (e) {
            this.page += 1;
            this.buildUrl();

            var self = this;

            console.log(this.url);

            $.ajax({
                method: "GET",
                url: this.url
            })
                .done(function (data) {
                    $(e.currentTarget).parent().remove();

                    self.listingArea.append(data);
                });
        },
    });
}(jQuery, _));