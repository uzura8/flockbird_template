var appModule = angular.module('AngularAngularIndex', []);

var MyController = function ($scope) {
	$scope.message = 'Hello World!';
	$scope.action = function () {
		$scope.message = 'Good-by!';
	};
	$scope.focus = function () {
		$scope.focusedText = 'focusされました';
	};
	$scope.blur = function () {
		$scope.focusedText = '';
	};

	$scope.keydowncount = 0;
	$scope.keydown = function () {
		$scope.keydowncount++;
	};

	var maxCount = 140;
	$scope.tweetCount = maxCount;
	$scope.change = function () {
		$scope.tweetCount = maxCount - $scope.tweet.length;
		if ($scope.tweetCount < 0) {
			$scope.tweetCount = Math.abs($scope.tweetCount);
			$scope.isOver = true;
		} else {
			$scope.isOver = false;
		}
	};

	$scope.submit = function () {
		$scope.submitMessage = (!$scope.myModel) ? 'チェックしてください' : '';
	};

	$scope.eventClick = function ($event) {
		console.log($event);
	};
};
appModule.controller('myController', MyController);

var NgClickController = function ($scope) {
	$scope.count = 0;
	$scope.click = function () {
		$scope.count = $scope.count * 2;
	}; 
};
appModule.controller('ngClickController', NgClickController);
