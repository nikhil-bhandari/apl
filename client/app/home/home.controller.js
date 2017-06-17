angular
    .module("apl")
    .controller("HomeCtrl", function (MatchAPI) {
        var self = this;
        var searchOpts = {
            max: 15,
            page: 1
        };

        self.next = function () {
            searchOpts.page++;
            MatchAPI
                .query(searchOpts)
                .$promise
                .then(function (matches) {
                    self.matches = self.matches.concat(matches);
                })
                .catch(function () {

                });
        };

        (function () {
            MatchAPI
                .query(searchOpts)
                .$promise
                .then(function (matches) {
                    self.matches = matches;
                })
                .catch(function () {

                });
        })();
    });