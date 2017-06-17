angular
    .module("apl")
    .config(function ($stateProvider) {
        $stateProvider
            .state("match", {
                url: "/match/:id",
                templateUrl: "/app/match/match.html",
                controller: "MatchCtrl as ctrl"
            })
    });