angular.module('wampum.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('tabs', {
        abstract: true,
        templateUrl: 'templates/tabsController.html'
      })

      .state('tabs.home', {
        url: '/home',
        views: {
          'home': {
            templateUrl: 'templates/home.html',
            controller: 'homeController'
          }
        }
      })

      .state('tabs.browse', {
        url: '/browse',
        views: {
          'browse': {
            templateUrl: 'templates/browse.html',
            controller: 'browseController'
          }
        }
      })

      .state('tabs.chat', {
        url: '/chat',
        views: {
          'chat': {
            templateUrl: 'templates/chat.html',
            controller: 'chatController'
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  });
