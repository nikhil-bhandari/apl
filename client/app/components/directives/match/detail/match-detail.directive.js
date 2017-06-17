angular
    .module("apl")
    .directive("aplMatchDetail", function () {
        return {
            restrict: "A",
            scope: {
                match: "="
            },
            bindToController: true,
            templateUrl: "app/components/directives/match/detail/match-detail.html",
            controller: "MatchDetailCtrl as ctrl"
        }
    });