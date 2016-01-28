angular.module('starter.services', [])

.factory('BarterItemService', function() {

  var items = [{
    id: 1,
    image: 'http://www.canticlecreative.com/wampum/bmwRims.jpg'
  }, {
    id: 2,
    image: 'http://www.canticlecreative.com/wampum/guitairPedal.jpg'
  }, {
    id: 3,
    image: 'http://www.canticlecreative.com/wampum/radarDetector.jpg'
  }, {
    id: 4,
    image: 'http://www.canticlecreative.com/wampum/turntable.jpg'
  }, {
    id: 5,
    image: 'http://www.canticlecreative.com/wampum/v60pourover.jpg'
  }, {
    id: 6,
    image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg'
  }, {
    id: 7,
    image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg'
  }];

  function Add(barteritem) {
    items.add(barteritem);
  }

  function Remove(barteritem) {

  }

  function Get() {
    return items.slice();
  }

  function Like() {

  }

  function DisLike() {

  }

  return {
    Add: Add,
    Remove: Remove,
    Get: Get,
    Like: Like,
  };
})

.factory('ImageStoreService', function() {
  var images = [];
  var IMAGE_STORAGE_KEY = 'images';

  function getImages() {
    var store = window.localStorage.getItem(IMAGE_STORAGE_KEY);
    if (store) {
      images = JSON.parse(store);
    } else {
      images = [];
    }
    return images;
  }

  function addImage(img) {
    images.push(img);
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
  }

  return {
    storeImage: addImage,
    images: getImages
  };
})

/* TODO: Thread Warning['File'] took '115' plugin should use a background thread.*/
/*Snapshotting a view that has not been rendered results in an empty snapshot. Ensure your view has been rendered at least once before snapshotting or snapshot. after screen updates. */
/**/
.factory('CameraService', function($cordovaCamera, ImageStoreService, $q, $cordovaFile) {

  // TODO: move elsewhere/use guid from angular?
  /*
  used to generate a unique id for the file name in case of duplicates.
  */
  function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  function getCameraSource(typeEnum) {
    switch (typeEnum) {
      case 0:
        return Camera.PictureSourceType.CAMERA;
      case 1:
        return Camera.PictureSourceType.PHOTOLIBRARY;
    }
  }

  /*
  This is used to get the camera options
  */
  function getCameraOptions(cameraSource, cameraPopoverOptions) {
    return {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: cameraSource,
      allowEdit: false,
      encodingType: Camera.EncodingType.PNG,
      //  targetWidth: 100,
      // targetHeight: 100,
      mediaType: Camera.EncodingType.PICTURE,
      cameraDirection: Camera.EncodingType.BACK,
      // TODO:  popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation: 1
    };
  }

  function saveMedia(type) {
    return $q(function(resolve, reject) {
      var source = getCameraSource(type);
      var options = getCameraOptions(source);

      $cordovaCamera.getPicture(options)
        .then(
          function(imageUrl) {
            var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
            var newName = makeid() + name;
            $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
              .then(
                function(info) {
                  ImageStoreService.storeImage(newName);
                  resolve();
                },
                function(e) {
                  reject();
                });
          });
    });
  }
  return {
    handleMediaDialog: saveMedia
  };
});
