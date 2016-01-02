angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('wampum', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/wampum.html'
    })
      
    
      
        
    .state('wampum.home', {
      url: '/home',
      views: {
        'side-menu21': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
        
      
    
      
        
    .state('addItem', {
      url: '/additem',
      templateUrl: 'templates/addItem.html',
      controller: 'addItemCtrl'
    })
        
      
    
      
        
    .state('browse', {
      url: '/browse',
      templateUrl: 'templates/browse.html',
      controller: 'browseCtrl'
    })
        
      
    
      
        
    .state('wampum.myItems', {
      url: '/myitems',
      views: {
        'side-menu21': {
          templateUrl: 'templates/myItems.html',
          controller: 'myItemsCtrl'
        }
      }
    })
        
      
    
      
        
    .state('wampum.chat', {
      url: '/chat',
      views: {
        'side-menu21': {
          templateUrl: 'templates/chat.html',
          controller: 'chatCtrl'
        }
      }
    })
        
      
    
      
        
    .state('wampum.settings', {
      url: '/settings',
      views: {
        'side-menu21': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu21');

});