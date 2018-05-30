; (function ($, _, undefined) {
    "use strict";

    pr.controller.register('contests.index.filter', {

        area: null,

        url: null,
        page: 1,

        type: null,
        status: null,
        category: null,
        sortOption: 'created_at',
        sortDirection: 'desc',
        search: null,

        initialize: function () {
            this.on('click', '[data-action="toggleType"]', this.toggleType);
            this.on('click', '[name="contests__status"]', this.toggleStatus);
            this.on('selectmenuchange', '[name="contests__category"]', this.toggleCategory);
            this.on('selectmenuchange', '[name="contests__sort"]', this.toggleSortOption);
            this.on('keyup', '[name="contests__search"]', this.doSearch);
            this.on('click', '[data-action="loadMore"]', this.loadMore);

            this.setup();
        },

        setup: function () {
            this.listingArea = this.scope.find('.contests__area');

            this.buildUrl();
        },

        updateResults: function () {
            this.page = 1;
            this.buildUrl();

            var self = this;

            $.ajax({
                    method: "GET",
                    url: this.url
                })
                .done(function (data) {
                    self.listingArea.html(data);

                    $(document).trigger('contentChange', [self.scope]);
                });
        },

        updateUrl: function (urlPath) {
            window.history.pushState({}, "", urlPath);
        },

        buildUrl: function () {
            var path = "";

            path = path + (this.type ? "&type=" + this.type : "");
            path = path + (this.status ? "&status=" + this.status : "");
            path = path + (this.category ? "&category=" + this.category : "");
            path = path + (this.sortOption != 'created_at' ? "&sortOption=" + this.sortOption : "");
            path = path + (this.sortDirection != 'desc' ? "&sortDirection=" + this.sortDirection : "");
            path = path + (this.page != 1 ? "&page=" + this.page : "");
            path = path + (this.search ? "&search=" + this.search : "");

            this.url = "/contests" + path.replace(/^&/, "?");

            this.updateUrl(this.url);
        },

        toggleType: function (e) {
            this.type = $(e.currentTarget).attr('data-value');

            this.updateResults();
        },

        toggleStatus: function (e) {
            this.status = null;

            if ($(e.currentTarget).attr('value') !== 'all') {
                this.status = $(e.currentTarget).attr('value');
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

            $.ajax({
                method: "GET",
                url: this.url
            })
                .done(function (data) {
                    $(e.currentTarget).parent().remove();

                    self.listingArea.append(data);

                    $(document).trigger('contentChange', [self.scope]);
                });
        },
    });
}(jQuery, _));