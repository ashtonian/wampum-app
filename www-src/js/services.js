'use strict';

angular.module('starter.services', []).factory('BarterItemService', (
    $resource,
    $cordovaFileTransfer
) => {
    var scopeBarterItem = {};
    var base = 'https://wampum-api.herokuapp.com';
    //TODO: var base = 'http://localhost:8080';
    var userClient = $resource(base + '/user/:_id/');
    var barterItemClient = $resource(base + '/barter-item/:_id/', {}, {
        vote: {
            method: 'POST',
            url: base + '/barter-item/:_id/vote/'
        },
        recommendations: {
            method: 'GET',
            url: base + '/barter-item/recommendations/',
            isArray: true
        },
        photo: {
            method: 'POST',
            url: base + '/barter-item/:_id/photo/'
        }
    });

    function create(barterItemToCreate) {
        barterItemClient.save(barterItemToCreate).$promise.then((postResponse, headers) => {
            // TODO: BATCH promises
            for (var i = 0; i < postResponse.uploadInstructions.length; i++) {
                var instructions = postResponse.uploadInstructions[i];
                $cordovaFileTransfer.upload(instructions.uploadUrl, instructions.devicePath, instructions.options).then(Success).catch(Fail);
            }
        });
    }

    function Success(datanshit) {
        console.log("Success " + datanshit);
    }

    function Fail(datanshit) {
        console.log("Fail " + datanshit);
    }

    function remove(barterItemId) {}

    function getRecommendations() {
        return barterItemClient.recommendations();
    }

    function like(barterItemId) {
        barterItemClient.vote({
            _id: barterItemId
        }, {
            like: true
        });
    }

    function disLike(barterItemId) {
        barterItemClient.vote({
            _id: barterItemId
        }, {
            like: false
        });
    }

    function getMine() {
        return barterItemClient.query({
            currentUser: true
        });
    }

    return {
        Create: create,
        Delete: remove,
        GetRecommendations: getRecommendations,
        Like: like,
        DisLike: disLike,
        GetMine: getMine
    };
}).factory('ImageService', ($q, $cordovaImagePicker, $cordovaCamera) => {

    function getCameraOptions(cameraSource, cameraPopoverOptions) {
        return {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: cameraSource,
            allowEdit: false,
            encodingType: Camera.EncodingType.PNG,
            // TODO: targetWidth: 100,
            // TODO: targetHeight: 100,
            mediaType: Camera.EncodingType.PICTURE,
            cameraDirection: Camera.EncodingType.BACK,
            // TODO:  popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation: 1
        };
    }

    function getImagePickerOptions() {
        return {
            maximumImagesCount: 10,
            width: 800,
            height: 800,
            quality: 100
        };
    }

    function getImageFromSource(source) {
        if (source === 0 || source === 'camera') {
            // TODO: not sure if this is the proper way to do this or if I should just return [results]
            return $cordovaCamera.getPicture(getCameraOptions(Camera.PictureSourceType.CAMERA)).then(results => {
                return [results];
            });
        } else if (source === 1 || source === 'imagePicker') {
            return $cordovaImagePicker.getPictures(getImagePickerOptions());
        } else if (source === 2 || source === 'photoLibrary') {
            return $cordovaCamera.getPicture(getCameraOptions(Camera.PictureSourceType.PHOTOLIBRARY)).then(results => {
                return [results];
            });
        }
    }

    return {
        getImageFromSource: getImageFromSource
    };
})

.service('AuthService', ($q, $http, API_ENDPOINT) => {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;
        $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var register = (user) => {
        return $q((resolve, reject) => {
            $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    var login = (user) => {
        return $q((resolve, reject) => {
            $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
                if (result.data.success) {
                    storeUserCredentials(result.data.token);
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    var logout = () => {
        destroyUserCredentials();
    };

    loadUserCredentials();

    return {
        login: login,
        register: register,
        logout: logout,
        isAuthenticated: () => {
            return isAuthenticated;
        }
    };
})

.factory('AuthInterceptor', ($rootScope, $q, AUTH_EVENTS) => {
    return {
        responseError: (response) => {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

.config(($httpProvider) => {
    $httpProvider.interceptors.push('AuthInterceptor');
})

;
