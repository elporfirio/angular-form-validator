"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
            }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                }
            }return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        /**
         * Created by elporfirio on 29/03/17.
         */
        var AngularFormValidator = function () {
            function AngularFormValidator() {
                _classCallCheck(this, AngularFormValidator);

                // //console.log('constructor');

                this.restrict = 'A';
                this.controller = AngularFormValidatorController;
                this.scope = {
                    'validated': '&onFinish'
                };
            }

            _createClass(AngularFormValidator, [{
                key: 'link',
                value: function link(scope, element, attr, ctr) {
                    ctr.inputs = $(element).find('input, select, textarea');

                    scope.$on('validateForm', function () {
                        //This is for dinamic Elements
                        ctr.inputs = $(element).find('input, select, textarea');
                        ctr.validateForm();
                    });
                }
            }], [{
                key: 'directiveFactory',
                value: function directiveFactory() {
                    return new AngularFormValidator();
                }
            }]);

            return AngularFormValidator;
        }();

        // do not $inject like this
        // ClipBoardText.$inject = ['$q'];

        var _validEmail = function _validEmail(email) {
            'use strict';

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        var _validNumber = function _validNumber(number) {
            'use strict';

            var re = /^[0-9]{1,45}$/;
            return re.test(number);
        };

        var _validPrice = function _validPrice(quanty) {
            'use strict';

            var re = /^\d+(\.\d{1,2})?$/;
            return re.test(quanty);
        };

        var _validPassword = function _validPassword(password) {
            'use strict';
            //let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
            //let re = /^(?=.*[A-Z])(?=.*\d).+$/;  //AND un numero y una Mayuscula
            //let re = /^(?=.*[A-Z]|.*\d).+$/; //OR un numero o una mayuscula

            var re = /^(?=.*[A-Z]|.*\d).{6,}$/;
            return re.test(password);
        };

        var _validPhone = function _validPhone(phone) {
            'use strict';

            var re = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
            return re.test(phone);
        };

        var _validRFC = function _validRFC(rfc) {
            'use strict';

            var re = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
            return re.test(rfc);
        };

        var _validPostalCode = function _validPostalCode(pc) {
            'use strict';

            var re = /^\d{5,}$/;
            return re.test(pc);
        };

        var AngularFormValidatorController = function () {
            function AngularFormValidatorController($element, $scope, NotificationErrorService) {
                _classCallCheck(this, AngularFormValidatorController);

                // this.q = q;
                // this.ZeroClipboard = 'zeroclipboard';
                this.element = $element;
                this.inputs = [];
                this.$scope = $scope;
            }

            _createClass(AngularFormValidatorController, [{
                key: 'getRandomId',
                value: function getRandomId() {
                    return new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
                }
            }, {
                key: 'validateForm',
                value: function validateForm() {
                    var _this = this;

                    var valid = true;
                    var errors = [];
                    var inputs = $(this.inputs);
                    $('.has-error').removeClass('has-error');
                    $('.error-detail, .help-block').remove();

                    $.each(inputs, function (index, element) {
                        if ($(element).attr('required') === 'required') {
                            if ($(element).val() === '' || $(element).val() === null) {
                                var randId = _this.getRandomId();
                                $(element).parent().addClass('has-error');
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + randId + '"></div>').append('<p class="help-block">Este campo es requerido.</p>');
                                valid = false;
                                return;
                            }
                        }
                        if ($(element).attr('validator') === "email") {
                            if (!_validEmail($(element).val())) {
                                var _randId = new Date().getTime();
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + _randId + '"></div>').append('<p class="help-block">Debe ser un correo electrónico válido.</p>');
                                valid = false;
                                return;
                            }
                        }
                        if ($(element).attr('validator') === "number") {
                            if (!_validNumber($(element).val())) {
                                var _randId2 = new Date().getTime();
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + _randId2 + '"></div>').append('<p class="help-block">Debe ser un número.</p>');

                                valid = false;
                                return;
                            }
                        }
                        if ($(element).attr('validator') === 'price') {
                            if (!_validPrice($(element).val())) {
                                var _randId3 = new Date().getTime();
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + _randId3 + '"></div>').append('<p class="help-block">Debe ser un número 2 decimales.</p>');
                                valid = false;
                                return;
                            }
                        }
                        if ($(element).attr('validator') === 'validPassword') {
                            if (!_validPassword($(element).val())) {
                                var _randId4 = new Date().getTime();
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + _randId4 + '"></div>');
                                alert('Deben ser 6 carácteres con al menos una mayúscula o un número', {
                                    title: 'Verifica',
                                    target: '.some-' + _randId4,
                                    balloon: true,
                                    layout: 1
                                });
                                valid = false;
                                return;
                            }
                        }
                        if ($(element).attr('validator') === 'phone') {
                            if (!_validPhone($(element).val())) {
                                var _randId5 = new Date().getTime();
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + _randId5 + '"></div>').append('<p class="help-block">Debe ser un número teléfonico válido.</p>');
                                valid = false;
                                return;
                            }
                        }
                        if ($(element).attr('validator') === 'rfc') {
                            if (!_validRFC($(element).val())) {
                                var _randId6 = new Date().getTime();
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + _randId6 + '"></div>').append('<p class="help-block">Debe ser un RFC válido</p>');
                                valid = false;
                                return;
                            }
                        }
                        if ($(element).attr('validator') === 'postalCode') {
                            if (!_validPostalCode($(element).val())) {
                                var _randId7 = new Date().getTime();
                                $(element).parents('.form-group').addClass('has-error').prepend('<div class="error-detail some-' + _randId7 + '"></div>').append('<p class="help-block">Debe ser un código postal válido.</p>');
                                valid = false;
                                return;
                            }
                        }
                    });

                    if (typeof this.$scope.validated === "function") {
                        this.$scope.validated({ valid: valid, errors: errors });
                    }
                    //this.$scope.$broadcast('validated', {valid: valid});
                }
            }]);

            return AngularFormValidatorController;
        }();

        AngularFormValidatorController.$inject = ['$element', '$scope'];

        // ClipBoardTextController.$inject = ['$q'];
        //export default AngularFormValidator.directiveFactory;
        var _module = angular.module('angular-form-validator', []).directive('formValidator', AngularFormValidator.directiveFactory).name;

        exports.default = _module;
    }, {}] }, {}, [1]);
//# sourceMappingURL=angular-form-validator.js.map