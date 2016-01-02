angular.module('starter.routes', [])



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller:'cardsController'
        }
      }
    })
    .state('app.additem', {
      url: '/additem',
      views: {
        'menuContent': {
          templateUrl: 'templates/additem.html',
        }
      }
    })

    .state('app.itemmatched', {
      url: '/itemmatched',
      views: {
        'menuContent': {
          templateUrl: 'templates/itemmatched.html',
        }
      }
    })

    .state('app.myitem', {
      url: '/myitem',
      views: {
        'menuContent': {
          templateUrl: 'templates/myitem.html',
        }
      }
    })

    .state('app.inventory', {
      url: '/inventory',
      views: {
        'menuContent': {
          templateUrl: 'templates/inventory.html',
        }
      }
    })

    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'templates/chat.html',
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
        }
      }
    })

;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/additem');
});
