'use strict';

angular.module('starter.controllers', ['ionic.contrib.ui.tinderCards2']).controller('AppCtrl', ($scope, $ionicModal, $timeout) => {

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
    }).then(modal => {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = () => {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = () => {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = () => {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(() => {
            $scope.closeLogin();
        }, 1000);
    };
}).controller('cardsController', ($scope, TDCardDelegate, $timeout, BarterItemService) => {

    $scope.cards = {
        active: []
    };

    $scope.cardDestroyed = (index) => {
        $scope.cards.active.splice(index, 1);
    };
    $scope.refreshCards = RefreshCards;

    function RefreshCards() {
        // set cards.active to null to reload the directive
        $scope.cards.active = null;
        BarterItemService.GetRecommendations().$promise.then((recommendations) => {
            // set the first image for the card from the images array.
            recommendations.foreach(recommendation => {
                recommendation.image = recommendation.images[0];
            })
            
            $scope.cards.active = recommendations;
        });
    }
    RefreshCards();

    $scope.cardSwipedLeft = (index) => {};

    $scope.cardSwipedRight = (index) => {};

}).controller('AddItemController', ($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, BarterItemService) => {

    $scope.images = [];

    $scope.addMedia = () => {
        $scope.hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: 'Take photo'
            }, {
                text: 'Photo from library'
            }],
            titleText: 'Add images',
            cancelText: 'Cancel',
            buttonClicked: function buttonClicked(index) {
                $scope.addImage(index);
            }
        });
    };

    $scope.addImage = (type) => {
        $scope.hideSheet();
        ImageService.getImageFromSource(type).then((imgUrls) => {
            $scope.images.push.apply($scope.images, imgUrls);
        });
    };

    $scope.removeImage = (imgUrl) => {
        $scope.images = $scope.images.filter((el) => {
            return el !== imgUrl;
        });
    };

    $scope.addItem = (barterItemForm) => {
        // TODO: why does this get Triggered?
        if (barterItemForm) {
            var barterItem = {
                images: $scope.images.map(image => {
                    return {
                        devicePath: image,
                        fileExtension: image.substr(image.lastIndexOf('.'))
                    };
                }),
                title: barterItemForm.title,
                description: barterItemForm.description
            };
            BarterItemService.Create(barterItem);
        }
    };
}).controller('MyItemsController', ($scope, BarterItemService) => {

    $scope.listCanSwipe = true;

    // TODO: async/onload?
    $scope.items = BarterItemService.GetMine();
});
