//angular.module('ProjectTaskList', [])
//.controller('MainController', ['$scope', function ($scope) {}]);
//
//$scope.todos = [];
//todo = {title: '要件', done: '状態'}
//
//$scope.addTodo = function () {
//	$scope.todos.push({
//		title: Math.random(),
//		done: false
//	});
//};

//angular.module('App', ['LocationBar'])
angular.module('ProjectTaskList', [])
.controller('MainController', ['$scope', '$filter', function ($scope, $filter) {
//	$scope.todos = [];
//	$scope.newTitle = '';
//
//	$scope.addTodo = function () {
//		$scope.todos.push({
//			title: $scope.newTitle,
//			done: false
//		});
//		$scope.newTitle = '';
//	};
//
//
//	// フィルタリング条件モデル
//	$scope.filter = {
//		done: { done: true },      // 完了のみ
//		remaining: { done: false } // 未了のみ
//	};
//	// 現在のフィルタの状態モデル
//	$scope.currentFilter = null;
//
//	// フィルタリング条件を変更するメソッド
//	$scope.changeFilter = function (filter) {
//		$scope.currentFilter = filter;
//	};
  $scope.todos = [];

  $scope.newTitle = '';

  $scope.addTodo = function () {
    $scope.todos.push({
      title: $scope.newTitle,
      done: false
    });

    $scope.newTitle = '';
  };

  $scope.filter = {
    done: { done: true },
    remaining: { done: false }
  };
  $scope.currentFilter = null;

  $scope.changeFilter = function (filter) {
    $scope.currentFilter = filter;
  };

//	var where = $filter('filter'); // filter フィルタ関数の取得
//	$scope.$watch('todos', function (todos) {
//		var length = todos.length;
//
//		$scope.allCount = length;                                   // 総件数モデル
//		$scope.doneCount = where(todos, $scope.filter.done).length; // 完了件数モデル
//		$scope.remainingCount = length - $scope.doneCount;          // 未了件数モデル
//	}, true);


//	var originalTitle;     // 編集前の要件
//	$scope.editing = null; // 編集モードの ToDo モデルを表すモデル
//
//	$scope.editTodo = function (todo) {
//		originalTitle = todo.title;
//		$scope.editing = todo;
//	};
//
//	$scope.doneEdit = function (todoForm) {
//		if (todoForm.$invalid) {
//			$scope.editing.title = originalTitle;
//		}
//		$scope.editing = originalTitle = null;
//	};

}]);
//.directive('mySelect', [function () {
//	return function (scope, $el, attrs) {
//		// scope - 現在の $scope オブジェクト
//		// $el   - jqLite オブジェクト(jQuery ライクオブジェクト)
//		//         jQuery 使用時なら jQuery オブジェクト
//		// attrs - DOM 属性のハッシュ(属性名は正規化されている)
//
//		scope.$watch(attrs.mySelect, function (val) {
//			if (val) {
//				$el[0].select();
//			}
//		});
//	};
//}]);

