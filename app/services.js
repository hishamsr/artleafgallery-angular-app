app.service('productService', function(appConstants, $http, $q) {
	
    var products = undefined;
 
    this.getProducts = function() {
      	if (!products) {
        // create deferred object using $q
	        var deferred = $q.defer();
	        $http({
			  method: 'GET',
			  url: appConstants.apiUrl+'api/products/'
			}).then(function successCallback(response) {
				products = response.data;
				// resolve the deferred
	            deferred.resolve(products);
			}, function errorCallback(response) {
			    products = error;
	            deferred.reject(response);
			});
        // set the posts object to be a promise until result comeback
        	products = deferred.promise;
      	}
      	return $q.when(products);
    }
});

app.factory('artWorksService', function(){

})