/**
 * Created by elporfirio on 03/04/17.
 */

describe('angularFormValidator', () => {
    let element, scope;

    beforeEach(angular.mock.module('angular-form-validator'));

    beforeEach(inject(($rootScope, $compile) => {
        let _$rootScope = $rootScope;
        let _$compile = $compile;

        scope = _$rootScope.$new();
        
        element = angular.element('<form form-validator></form>');

        _$compile(element)(scope);
    }));

    it('mostrar algo', () => {
        let some = true;
        expect(some).toBe(false);
    });
});
