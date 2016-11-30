'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bikeMapsApp'));

  var MainCtrl,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope) {

    $httpBackend = $injector.get('$httpBackend');
    jasmine.getJSONFixtures().fixturesPath = 'base/fixtures';

    // TODO - Use RegEx for url param
    // TODO - `getJSONFixture` throwing warning in linter
    $httpBackend.whenGET('/api/users?method=GET').respond(
      getJSONFixture('users.json')
    );

    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
    });
  }));

  it('should attach a list of users to the scope', function () {
    $httpBackend.flush();
    expect(scope.users.length).toBe(5);
  });
});
