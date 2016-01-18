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

.factory('FileService', function() {
  var images;
  var IMAGE_STORAGE_KEY = 'images';

  function getImages() {
    var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
    if (img) {
      images = JSON.parse(img);
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

.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {

  function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  function optionsForType(type) {
    var source;
    switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    return {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      // TODO:  popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
  }

  function saveMedia(type) {
    return $q(function(resolve, reject) {
      var options = optionsForType(type);

      $cordovaCamera.getPicture(options).then(function(imageUrl) {
        var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
        var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
          .then(function(info) {
            FileService.storeImage(newName);
            resolve();
          }, function(e) {
            reject();
          });
      });
    });
  }
  return {
    handleMediaDialog: saveMedia
  };
});
