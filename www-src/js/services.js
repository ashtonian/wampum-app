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

    function GetMimeTypeFromExtension(fileExtension) {
        if (fileExtension === '.png') return "image/png";
        if (fileExtension === '.jpeg' || fileExtension === '.jpg') return "image/jpeg";
    }

    /*    uploadFileName: image.imageId + image.fileExtension,
        uploadExtension: image.fileExtension,*/
    function GetUploadOptions(fileName, fileExtension) {
        var options = new FileUploadOptions();
        options.fileKey = fileName;
        options.fileName = fileName;
        options.httpMethod = "PUT";
        options.headers = {
            'Content-Type': GetMimeTypeFromExtension(fileExtension),
            'x-amz-acl': 'public-read'
        };
        options.chunkedMode = true;
        options.encodeURI = false;
        return options;
    }

    function create(barterItemToCreate) {
        barterItemClient.save(barterItemToCreate).$promise.then((postResponse, headers) => {
            // TODO: BATCH promises
            for (var i = 0; i < postResponse.uploadInstructions.length; i++) {
                var instructions = postResponse.uploadInstructions[i];
                $cordovaFileTransfer.upload(instructions.uploadUrl, instructions.devicePath, GetUploadOptions(instructions.fileName, instructions.fileExtension)).then(Success).catch(Fail);
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
}).factory('AuthenticationService', ($log, $rootScope, $http, authService, localStorageService) => {
    $log.info('AuthenticationService');

    let loggedIn = false;

    let service = {
        login: credentials => {

            $http.post('https://login', {
                    user: credentials
                }, {
                    ignoreAuthModule: true
                })
                .success((data, status, headers, config) => {
                    loggedIn = true;

                    $http.defaults.headers.common.Authorization = data.authorizationToken;
                    localStorageService.set('authorizationToken', data.authorizationToken);

                    authService.loginConfirmed(data, config => {
                        config.headers.Authorization = data.authorizationToken;
                        return config;
                    });
                })

            .error((data, status, headers, config) => {
                $rootScope.$broadcast('event:auth-login-failed', status);
            });
        },

        isLoggedIn: () => {
            return loggedIn;
        },

        loginCancelled: () => {
            authService.loginCancelled();
        },

        logout: () => {
            loggedIn = false;

            $http.post('https://logout', {}, {
                    ignoreAuthModule: true
                })
                .finally(data => {
                    localStorageService.remove('authorizationToken');
                    delete $http.defaults.headers.common.Authorization;
                    $rootScope.$broadcast('event:auth-logout-complete');
                });
        }
    };

    return service;
})

;
