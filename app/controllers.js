
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
    $scope.redirect = function(product){
    	window.location.href = "#/products/?productId="+product.id;
    }
 
    $scope.getProducts();
});
app.controller("ProductsController", function($scope,$http, productService, $stateParams, appConstants){
	$scope.productId = $stateParams.productId;
	$scope.categoryId = $stateParams.categoryId;
	if($scope.categoryId) {
		var url = appConstants.apiUrl+'api/artworks/'+$scope.productId+"/"+$scope.categoryId+"/";
	} else {
		var url = appConstants.apiUrl+'api/artworks/'+$scope.productId+"/";
	}
	$scope.artImages_slice = [];
	$scope.get_artImages = function(){
		$http({
		  method: 'GET',
		  url: url
		}).then(function successCallback(response) {
			$scope.artImages = response.data;
			var arr = []
			var page = {
				'col1': [],
				'col2': [],
				'col3': []
			}
			$scope.pages = []
			var array_length = $scope.artImages.length;
			var array_limit = (array_length >= 3) ? array_length-3 : 0;
			if(array_length > 0 ){
				for(var i=0; i<=array_limit; ){
		    		page.col1.push($scope.artImages[i]);

		    		if(i+1<array_length)
		    			page.col2.push($scope.artImages[i+1]);
		    		if(i+2<array_length)
		    			page.col3.push($scope.artImages[i+2]);
			    	
			    	
			    	if(((i+3) % 30 == 0) || (i == array_limit)) {
		    			$scope.pages.push(page);
		    			page = {
							'col1': [],
							'col2': [],
							'col3': []
						}
		    		} 
		    		i = i + 3;
			    }
			}	    	
			
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	$scope.getProductDetails = function(){
		$http({
		  method: 'GET',
		  url: appConstants.apiUrl+'api/products/'+$scope.productId+"/"
		}).then(function successCallback(response) {
			$scope.product = response.data;
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	$scope.get_artImages();
	$scope.getProductDetails();
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
	$scope.getProducts();
	$scope.get_company();
});