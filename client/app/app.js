angular
    .module("apl", [
        "ui.router",
        "ngResource",
        "infinite-scroll",
    ])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    });
