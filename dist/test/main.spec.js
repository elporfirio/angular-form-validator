'use strict';

/**
 * Created by elporfirio on 03/04/17.
 */

describe('angularFormValidator', function () {
    var element = void 0,
        scope = void 0;

    beforeEach(angular.mock.module('angular-form-validator'));

    beforeEach(inject(function ($rootScope, $compile) {
        var _$rootScope = $rootScope;
        var _$compile = $compile;

        scope = _$rootScope.$new();

        element = angular.element('<form form-validator></form>');

        _$compile(element)(scope);
    }));

    it('mostrar algo', function () {
        var some = true;
        expect(some).toBe(false);
    });
});
//# sourceMappingURL=main.spec.js.map