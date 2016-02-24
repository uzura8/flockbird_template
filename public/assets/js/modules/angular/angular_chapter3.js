var appModule = angular.module('AngularAngularChapter3', []);
var MyController = function ($scope) {
	$scope.today = new Date();
	$scope.action = function () {
		$scope.message = 'Good-by!';
	};
};
appModule.controller('myController', MyController);
