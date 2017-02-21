(function () {
  'use strict';
  angular.module('testApp')
    .component('mainComponent', {
      templateUrl: 'components/main/main.html',
      controller: SeasonsCtrl,
      controllerAs: 'vm'
    });
  SeasonsCtrl.$inject = ['appDataService', '$timeout'];
  function SeasonsCtrl(appDataService, $timeout) {
    var vm = this;
    vm.loading = true;
    vm.$onInit = function () {
      // get the results from the api endpoint
      appDataService.trafficMeister.fetchData(function (err, res) {
        vm.data = res;
        vm.loading = false;
        $timeout(function () {
          vm.types = getAllTypes(vm.data);
          vm.brands = getAllBrands(vm.data);
          vm.colors = getAllColors(vm.data);
        });
      }).catch(function(err) {
        // just in case
      });
    };

    /**
     * filter the main data
     * @param action
     */
    vm.filterData = function () {
      getDataByType();
    };

    /**
     *  filter the data with the brand and the color
     *  composing filters then re-assign them the vm objects
     */
    function getDataByType() {
      var color = vm.vehicle.color || undefined;
      var brand = vm.vehicle.brand || undefined;
      var type = vm.vehicle.type || undefined;
      var res = vm.data;
      // filter by type
      if (type && type.length) {
        res = _.filter(res, _.iteratee({'type': type}));
      }
      // filter by brand
      if (brand && brand.length) {
        res = _.filter(res, _.iteratee({'brand': brand}));
      }
      if (color && color.length) {
        // return all objects than have at least the color included in the array
        res = res.filter(function (item) {
          return item.colors.includes(color);
        });
      }
      vm.types = getAllTypes(res);
      vm.brands = getAllBrands(res);
      vm.colors = getAllColors(res);
      // get the image src and render it
      getImageRenderer();
    }

    function getImageRenderer() {
      // find image giving the type and the brand
      if (vm.data && vm.vehicle.type && vm.vehicle.brand) {
        vm.img = _.filter(vm.data, _.iteratee({
          'type': vm.vehicle.type,
          'brand': vm.vehicle.brand
        })).map(function (predicate) {
          return predicate.img;
        })[0];
      }
    }

    function getAllBrands(data) {
      return data.map(function (item) {
        return item.brand;
      }).sort();
    }

    function getAllTypes(data) {
      return _.uniq(data.map(function (predicate) {
        return predicate.type;
      })).sort();
    }

    /**
     * Get all colors from the array
     * @param data
     */
    function getAllColors(data) {
      return data.map(function (predicate) {
        return predicate.colors;
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []).filter(function (elem, pos, arr) { // remove duplicates from the array
        return arr.indexOf(elem) === pos;
      }).sort();
    }
  }
})();
