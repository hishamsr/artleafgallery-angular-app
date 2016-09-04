
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
    	window.location.href = "#/products/"+product.id;
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
	$scope.page_number = 1;
	$scope.page = {
		'col1': [],
		'col2': [],
		'col3': []
	};
	
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
	$scope.getArtImages = function(){
		$http({
		  method: 'GET',
		  url: url+"?page="+ $scope.page_number,
		}).then(function successCallback(response) {
			console.log(response.data)
			$scope.artImages = response.data.results;			
			$.each($scope.artImages, function(index, item){
				if((index+2)%2 == 0){
					$scope.page['col2'].push(item);
				} else if((index+3)%3 == 0){
					$scope.page['col3'].push(item);
				} else {
					$scope.page['col1'].push(item);
				}
			});
			$scope.page_number = $scope.page_number + 1;
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}
	$scope.getArtImages();
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