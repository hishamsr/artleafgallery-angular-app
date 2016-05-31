
app.controller("ProductsController", function($scope, appConstants, $http){
	$scope.products = [];
	$scope.menu_products = [];
	$scope.product_slice = [];
	console.log(appConstants)

	$scope.get_products = function(){
		console.log(appConstants)
		$http({
		  method: 'GET',
		  url: appConstants.apiUrl+'api/products/'
		}).then(function successCallback(response) {
			console.log(response);
		    $scope.products = response.data;
		    console.log($scope.products)
		    if($scope.products.length > 6){
		    	$scope.menu_products = $scope.products.slice(0,7);
		    } else {
		    	$scope.menu_products = $scope.products;
		    }
		    var arr = []
		    for(var i=0; i<$scope.products.length; i++){
		    	arr.push($scope.products[i]);
		    	if((i+1) % 3 == 0){
		    		$scope.product_slice.push(arr);
		    		arr = [];
		    	}
		    }
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	}
	$scope.get_products();
});