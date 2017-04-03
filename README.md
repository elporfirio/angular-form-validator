# Angular Form Validator

AngularJS Directive for validate form in the bootstrap way.

## How to markup your form

Please visit Bootstrap site:
http://getbootstrap.com/css/#forms-control-validation

## Installation

With npm

`npm install angular-form-validator`

## Usage

Add script to your proyect

`<script src="js/angular-form-validator.js"></script>`

Type as dependency for your angular 1.x project

```javascript
angular.module('demoApp', ['angular-form-validator'])
    .controller('myController', function(){
        //etc code
    });
```

In controller, call `$broadcast` method to `validateForm` event.

```javascript
.controller('demoController', ['$scope', function($scope){
            this.validateForm = function(){
                $scope.$broadcast('validateForm');
            }
        }]);
 ```
 
 ## Execute Validation
 
 Add call to click button event or form submit
 
 #### example.html
 ```html
<form role="form" ng-submit="vm.validateForm()" novalidate>
    <!-- Form Elements -->
</form>
```

 #### exampleController.js
 ```javascript
    this.validateForm = function(){
        this.scope.$broadcast('validateForm');
    }
```

See working DEMO


## //TODO List
* List validations available
* Custom error messages
* Custom validation rules
* Multiple Forms on View
