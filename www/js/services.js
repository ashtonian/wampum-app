angular.module('wampum.services', [])

  .factory('items', ["ngResource", function itemFactory($resource) {

    // Some fake testing data
    var items = [{
      id: 0,
      name: 'Technics SL-230 turntable',
      description: 'YThis is a vintage 1983 Technics turntable in good working condition. It is belt-drive and a new stylus was installed a couple months ago. Some scuffs on the rubber platter, but nothing on the case. Comes with power cord & manual.',
      image: 'img/turntable.jpg'
    }, {
      id: 1,
      name: 'Valentine One radar detector',
      description: 'V1 radar detector, working, bought a new car and pulled this from my old one. Comes with windshield suction mount & cigarette lighter adapter. Manual or box not included.',
      image: 'img/radarDetector.jpg'
    }, {
      id: 2,
      name: '19” BMW M-series alloy wheels',
      description: 'These are 4 wheels pulled from a 2006 BMW M5. Changed to winter tires & changed wheels as well. Some scuffs on outside of one wheel, otherwise in great condition.',
      image: 'img/bmwRims.jpg'
    }, {
      id: 3,
      name: 'Big Muff Nano distortion pedal',
      description: 'Guitar pedal, true bypass, comes with 12v power. Used very little, looking for other pedals.',
      image: 'img/guitairPedal.jpg'
    }, {
      id: 4,
      name: 'Hario V60 pourover',
      description: 'his is a V60 pourover, used a couple times, prefer aeropress.',
      image: 'img/v60pourover.jpg'
    }];

    return {

      delete: function (item) {
        items.splice(items.indexOf(item), 1);
      },
      get: function (itemId) {
        if (itemId === null)
          return items;

        for (var i = 0; i < items.length; i++) {
          if (items[i].id === parseInt(itemId)) {
            return items[i];
          }
        }
        return null;
      }
    };

  }]);
