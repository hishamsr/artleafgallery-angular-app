
app.controller("MenuController", function($scope,$http, productService){
	$scope.menu_products = [];
	
	
    $scope.getProducts = function() {
      	productService.getProducts()
        .then(function(products) {
 
          	$scope.products = products
          	if($scope.products.length > 6){
	    		$scope.menu_products = $scope.products.slice(0,7);
		    } else {
		    	$scope.menu_products = $scope.products;
		    }
 
        });
    };
 
    $scope.getProducts();
});
app.controller("HomeController", function($scope,$http, productService, appConstants){
	$scope.menu_products = [];
	$scope.product_slice = [];
	$scope.images = [];
	$scope.company = "";
	$scope.getProducts = function() {
      productService.getProducts()
        .then(function(products) {
            $scope.products = products
            var arr = []
		    for(var i=0; i<$scope.products.length; i++){
		    	if(i<6){
		    		$scope.images.push({
		    			'name': $scope.products[i].name,
		    			'path': $scope.products[i].slider_image, 
		    			'description': $scope.products[i].description
		    		})
		    	}
		    	arr.push($scope.products[i]);
		    	if((i+1) % 3 == 0){
		    		$scope.product_slice.push(arr);
		    		arr = [];
		    	}
		    }
 
        });
    };
 
    $scope.getProducts();

	

	/*$scope.get_products = function(){
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
		    
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	}*/
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
	//$scope.get_products();
	$scope.get_company();
});