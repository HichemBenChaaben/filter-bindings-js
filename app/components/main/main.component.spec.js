describe('component: appDataService', function () {
  var $componentController;

  beforeEach(module, function($provide) {
    $provide.value('appDataService', {
      serviceFunc: jasmine.createSpy().and.callThrough()
    });
  });
  beforeEach(inject(function (_$componentController_, $injector, _appDataService_) {
    $componentController = _$componentController_;
    appDataService  = $injector.get('appDataService');
    // appDataService = _appDataService_;
  }));

  it('should expose a `hero` object', function () {
    // Here we are passing actual bindings to the component
    var bindings = {loading: true};
    var ctrl = $componentController('mainComponent', null, bindings);
    expect(ctrl.loading).toBeDefined();
  });

});







