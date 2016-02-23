angular.module('starter.services', [])

.factory('BarterItemService', function($resource) {

   var base = 'https://wampum-api.herokuapp.com';
  //TODO: var base = 'http://localhost:8080';
  var userClient = $resource(base + '/user/:_id/');
  var barterItemClient = $resource(base + '/barter-item/:_id/', {

  }, {
    vote: {
      method: 'POST',
      url: base + '/barter-item/:_id/vote/'
    },
    recommendations: {
      method: 'GET',
      url: base + '/barter-item/recommendations/',
      isArray: true
    }
  });

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


  function create(barteritem) {
    var barteritemtmp = {
      _id: 'db8203a5-6bb8-40c9-bcd9-10b4cc92bf25',
      title: barteritem.title,
      description: barteritem.description,
      images: barteritem.images
    };
    barterItemClient.save(barteritemtmp);
  }

  function remove(barterItemId) {

  }

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
