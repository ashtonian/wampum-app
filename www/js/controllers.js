angular.module('starter.controllers', ['ionic.contrib.ui.tinderCards2'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })
  .controller('cardsController', function($scope, TDCardDelegate, $timeout, BarterItemService) {

    $scope.cards = {
      active: []
    };

    $scope.cards.active = BarterItemService.Get();

    $scope.cardDestroyed = function(index) {
      $scope.cards.active.splice(index, 1);
    };

    $scope.refreshCards = function() {
      // Set $scope.cards to null so that directive reloads
      $scope.cards.active = null;
      $timeout(function() {
        $scope.cards.active = BarterItemService.Get();
      });
    };


    $scope.cardSwipedLeft = function(index) {

    };

    $scope.cardSwipedRight = function(index) {

    };

  })
  .controller('myItemController', function($scope, $timeout, BarterItemService) {

    $scope.items = BarterItemService.Get();


  })

.controller('AddItemController', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, BarterItemService) {

  $scope.images = [];

  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: 'Take photo'
      }, {
        text: 'Photo from library'
      }],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  };

  $scope.addImage = function(type) {
    $scope.hideSheet();
    ImageService.getImageFromSource(type).then(function(imgUrls) {
      $scope.images.push.apply($scope.images, imgUrls);
    });
  };

  $scope.removeImage = function(imgUrl) {
    $scope.images = $scope.images.filter(function(el) {
      return el !== imgUrl;
    });
  };

  $scope.addItem = function(barterItemForm) {
    // create barter item object
    // send barter item object to data service
    var barterItem = {
      image: $scope.images[0],
      images: $scope.images,
      title: barterItemForm.title,
      description: barterItemForm.description,

    };
    BarterItemService.Add(barterItem);
  };
})

.controller('MyItemsController', function($scope, BarterItemService) {

  $scope.listCanSwipe = true;

  // TODO: async/onload?
  $scope.items = BarterItemService.GetMine();

});
