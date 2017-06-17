angular
    .module("apl")
    .controller("HomeCtrl", function (MatchAPI) {
        var self = this;
        self.matches = [];
        self.searchOpts = {
            max: 16,
            page: 1,
            q: ""
        };

        self.q = "";

        var searchMatches = function (replace) {
            MatchAPI
                .query(self.searchOpts)
                .$promise
                .then(function (matches) {
                    self.matches = replace ? matches : self.matches.concat(matches);
                })
                .catch(function () {

                });
        };

        self.search = function () {
            self.searchOpts.page = 1;
            self.searchOpts.q = self.q;

            searchMatches(true);
        };

        self.next = function () {
            self.searchOpts.page++;
            searchMatches();
        };

        (function () {
            searchMatches();
        })();
    });