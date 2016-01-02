// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

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
          templateUrl: 'templates/browse.html'
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
