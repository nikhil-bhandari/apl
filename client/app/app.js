angular
    .module("apl", [
        "ui.router",
        "ngResource"
    ])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    });
