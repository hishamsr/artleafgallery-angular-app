
app.controller("ProductsController", function($scope, appConstants, $http){
	$scope.products = [];
	$scope.menu_products = [];
	$scope.product_slice = [];
	$scope.images = [];
	$scope.company = "";

	$scope.get_products = function(){
		$http({
		  method: 'GET',
		  url: appConstants.apiUrl+'api/products/'
		}).then(function successCallback(response) {
		    $scope.products = response.data;
		    if($scope.products.length > 6){
		    	$scope.menu_products = $scope.products.slice(0,7);
		    } else {
		    	$scope.menu_products = $scope.products;
		    }
		    var arr = []
		    for(var i=0; i<$scope.products.length; i++){
		    	if(i<6){
		    		$scope.images.push({'path': $scope.products[i].slider_image, 'description': $scope.products[i].description})
		    	}
		    	arr.push($scope.products[i]);
		    	if((i+1) % 3 == 0){
		    		$scope.product_slice.push(arr);
		    		arr = [];
		    	}
		    }
		    console.log($scope.images);
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	}
	$scope.get_company = function(){
		$http({
		  method: 'GET',
		  url: appConstants.apiUrl+'api/company/'
		}).then(function successCallback(response) {
			$scope.company = response.data[0];
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	}
	$scope.get_products();
	$scope.get_company();
});