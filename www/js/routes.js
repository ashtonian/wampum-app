angular.module('wampum.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('login', {
      url: '/login',
      views: {
        'login': {
          templateUrl: 'templates/login.html',
          controller: 'loginController'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        'signup': {
          templateUrl: 'templates/signup.html',
          controller: 'signupController'
        }
      }
    })
    .state('browse', {
      abstract: true,
      url: '/browse'
    })
    .state('browse.list', {
      url: '',
      templateUrl: 'templates/browse.list.html',
    //  controller: 'itemListController'
    })
    .state('browse.details', {
      url: '/details/:id',
      templateUrl: 'templates/browse.detail.html',
    //  controller: 'itemDetailController'
    })


  // browseController
  // browseList
  // browseDetail

  // myItems
  // myItemsList
  // myItemsDetail
  // myItemsNew

  // chat
  // chatList
  // chatDetail

  .state('settings', {
    url: '/settings',
    views: {
      'settings': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
