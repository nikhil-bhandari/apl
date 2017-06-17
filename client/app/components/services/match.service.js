angular
    .module("apl")
    .service("MatchAPI",function ($resource) {
        return $resource('/api/matches/:matchId', {matchId: '@id'});
    });
