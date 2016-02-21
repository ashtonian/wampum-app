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
    items.push(barteritem);
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

  function GetMine(){
    return items.slice();
  }

  return {
    Add: Add,
    Remove: Remove,
    Get: Get,
    Like: Like,
    GetMine: GetMine
  };
})

.factory('ImageService', function($q, $cordovaImagePicker, $cordovaCamera) {

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
      return $q(function(resolve) {
        $cordovaCamera.getPicture(getCameraOptions(Camera.PictureSourceType.CAMERA)).then(function(results) {
          resolve([results]);
        });
      });
    } else if (source === 1 || source === 'imagePicker') {
      return $cordovaImagePicker.getPictures(getImagePickerOptions());
    } else if (source === 2 || source === 'photoLibrary') {
      return $q(function(resolve) {
        $cordovaCamera.getPicture(getCameraOptions(Camera.PictureSourceType.PHOTOLIBRARY)).then(function(results) {
          resolve([results]);
        });

      });
    }
  }

  return {
    getImageFromSource: getImageFromSource
  };

})

;
