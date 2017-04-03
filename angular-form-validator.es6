/**
 * Created by elporfirio on 29/03/17.
 */
class AngularFormValidator {

    constructor() {
        // //console.log('constructor');

        this.restrict = 'A';
        this.controller = AngularFormValidatorController;
        this.scope = {
            'validated': '&onFinish'
        };
    }

    link(scope, element, attr, ctr) {
        ctr.inputs = $(element).find('input, select, textarea');

        scope.$on('validateForm', () => {
            //This is for dinamic Elements
            ctr.inputs = $(element).find('input, select, textarea');
            ctr.validateForm();
        });

    }

    static directiveFactory() {
        return new AngularFormValidator();
    }
}

// do not $inject like this
// ClipBoardText.$inject = ['$q'];

let _validEmail = (email) => {
    'use strict';
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

let _validNumber = (number) => {
    'use strict';
    let re = /^[0-9]{1,45}$/;
    return re.test(number);
};

let _validPrice = (quanty) => {
    'use strict';
    let re = /^\d+(\.\d{1,2})?$/;
    return re.test(quanty);
};

let _validPassword = (password) => {
    'use strict';
    //let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
    //let re = /^(?=.*[A-Z])(?=.*\d).+$/;  //AND un numero y una Mayuscula
    //let re = /^(?=.*[A-Z]|.*\d).+$/; //OR un numero o una mayuscula
    let re = /^(?=.*[A-Z]|.*\d).{6,}$/;
    return re.test(password);
};

let _validPhone = (phone) => {
    'use strict';
    let re = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
    return re.test(phone);
};

let _validRFC = (rfc) => {
    'use strict';
    let re = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
    return re.test(rfc);
};

let _validPostalCode = (pc) => {
    'use strict';
    let re = /^\d{5,}$/;
    return re.test(pc);
};

class AngularFormValidatorController {
    constructor($element, $scope, NotificationErrorService) {
        // this.q = q;
        // this.ZeroClipboard = 'zeroclipboard';
        this.element = $element;
        this.inputs = [];
        this.$scope = $scope;
    }

    getRandomId() {
        return new Date().getTime() + Math.floor((Math.random() * 1000) + 1);
    }

    validateForm() {
        let valid = true;
        let errors = [];
        let inputs = $(this.inputs);
        $('.has-error').removeClass('has-error');
        $('.error-detail, .help-block').remove();

        $.each(inputs, (index, element) => {
            if ($(element).attr('required') === 'required') {
                if ($(element).val() === '' || $(element).val() === null) {
                    let randId = this.getRandomId();
                    $(element).parent().addClass('has-error');
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>')
                        .append('<p class="help-block">Este campo es requerido.</p>');
                    valid = false;
                    return;
                }
            }
            if ($(element).attr('validator') === "email") {
                if (!_validEmail($(element).val())) {
                    let randId = new Date().getTime();
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>')
                        .append('<p class="help-block">Debe ser un correo electrónico válido.</p>');
                    valid = false;
                    return;
                }
            }
            if ($(element).attr('validator') === "number") {
                if (!_validNumber($(element).val())) {
                    let randId = new Date().getTime();
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>')
                        .append('<p class="help-block">Debe ser un número.</p>');

                    valid = false;
                    return;
                }
            }
            if ($(element).attr('validator') === 'price') {
                if (!_validPrice($(element).val())) {
                    let randId = new Date().getTime();
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>')
                        .append('<p class="help-block">Debe ser un número 2 decimales.</p>');
                    valid = false;
                    return;
                }
            }
            if ($(element).attr('validator') === 'validPassword') {
                if (!_validPassword($(element).val())) {
                    let randId = new Date().getTime();
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>');
                    alert('Deben ser 6 carácteres con al menos una mayúscula o un número', {
                        title: 'Verifica',
                        target: '.some-' + randId,
                        balloon: true,
                        layout: 1
                    });
                    valid = false;
                    return;
                }
            }
            if ($(element).attr('validator') === 'phone') {
                if (!_validPhone($(element).val())) {
                    let randId = new Date().getTime();
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>')
                        .append('<p class="help-block">Debe ser un número teléfonico válido.</p>');
                    valid = false;
                    return;
                }
            }
            if ($(element).attr('validator') === 'rfc') {
                if (!_validRFC($(element).val())) {
                    let randId = new Date().getTime();
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>')
                        .append('<p class="help-block">Debe ser un RFC válido</p>');
                    valid = false;
                    return;
                }
            }
            if ($(element).attr('validator') === 'postalCode') {
                if (!_validPostalCode($(element).val())) {
                    let randId = new Date().getTime();
                    $(element).parents('.form-group').addClass('has-error')
                        .prepend('<div class="error-detail some-' + randId + '"></div>')
                        .append('<p class="help-block">Debe ser un código postal válido.</p>');
                    valid = false;
                    return;
                }
            }
        });

        if (typeof this.$scope.validated === "function") {
            this.$scope.validated({valid: valid, errors: errors});
        }
        //this.$scope.$broadcast('validated', {valid: valid});

    }
}

AngularFormValidatorController.$inject = ['$element', '$scope'];

// ClipBoardTextController.$inject = ['$q'];
//export default AngularFormValidator.directiveFactory;
let module = angular.module('angular-form-validator', [])
    .directive('formValidator', AngularFormValidator.directiveFactory)
    .name;

export default module;