
var app = angular.module('oneShopApp', []);
app.controller('employeeCntrl',['$scope', '$http', '$log', 
	function ($scope, $http, $log) {
	$scope.$log=$log;
	$scope.message = 'Hello World!';
	$scope.productCatalog = [];	
		
	
	$scope.filteredProduct=[];
	$scope.filteredProduct.productId;
	$scope.filteredProduct.companyName;
	$scope.filteredProduct.productType;
	$scope.filteredProduct.productName;
	$scope.filteredProduct.price;
	$scope.filteredProduct.color;
	
	$scope.firstProductType;
	$scope.searchKey;
	
	$scope.cartItems=[];
	$scope.cartProduct=[];
	$scope.cartProduct.product;
	$scope.cartProduct.quantity;
	
	$scope.noOfItems;
	
	$scope.displayProduct;
	
	$scope.loginFlag=false;
	$scope.user;
	$scope.password;
	
	$scope.initStore=function(){
		$http({
			method: 'GET',
			url: 'ProductCatalog.json'
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				
				$scope.productCatalog=response.data;
				$scope.filteredProduct=$scope.productCatalog;
				
				},
				function errorCallback(response) {
					
					$log.log(response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			  });
		$scope.displayProduct=1;
	}
	
	$scope.getProductsOfType=function(prod)
	{
		$http({
			method: 'GET',
			url: 'ProductCatalog.json'
			}).then(function successCallback(response) {
				$scope.productCatalog=response.data;
				});
					
		if(angular.isUndefined(prod))
		{
			$scope.filteredProduct=$scope.productCatalog;
		}
		else
		{
			$scope.filteredProductResult=[];
			angular.forEach($scope.productCatalog, function(item,i){
				if(item.productType==prod.productType)
				{
					$scope.filteredProductResult.push(item);
				}
			});
			$scope.filteredProduct=$scope.filteredProductResult;
		}
	}
	
	$scope.searchProduct=function()
	{
		$http({
			method: 'GET',
			url: 'ProductCatalog.json'
			}).then(function successCallback(response) {
				$scope.productCatalog=response.data;
				});
				
		$scope.filteredProductResult=[];
		if(!angular.isUndefined($scope.searchKey))
		{
			angular.forEach($scope.productCatalog, function(item,i){
				if(item.productName.toLowerCase().indexOf($scope.searchKey.toLowerCase())>=0 || item.productName.toUpperCase().indexOf($scope.searchKey.toUpperCase())>=0)
				{
					$scope.filteredProductResult.push(item);
				}
			});
			$scope.filteredProduct=$scope.filteredProductResult;
		}
		
	}
	
	$scope.addToCart=function(prod, quantity)
	{
		var flagAvail=0;
		if(angular.isUndefined(quantity))
		{
			quantity=1;
		}
		angular.forEach($scope.cartProduct, function(item,i){
			if(item.p.productId==prod.productId)
			{
				var tempQ=item.q;
				tempQ += quantity;
				item.q=tempQ;
				flagAvail=1;
			}
		});
		if(flagAvail==0)
		{	
			$scope.cartProduct.push({p: prod, q:quantity});
		}
		
		$scope.noOfItems=$scope.cartProduct.length;

	}
	
	$scope.showCart=function()
	{
		$scope.displayProduct=0;
	}
	$scope.homeDisplayProduct=function()
	{
		$scope.displayProduct=1;
	}
	$scope.deleteCartItem=function(index)
	{
		$scope.cartProduct.splice(index,1);
		$scope.noOfItems=$scope.cartProduct.length;
	}
	$scope.checkCart=function()
	{
		if($scope.noOfItems<1 || angular.isUndefined($scope.noOfItems))
		{
			return true;
		}
		else
		{
			return false;
		}
		
	}
	$scope.loginDone=function()
	{
	
			$scope.loginFlag=true;
	
	}
	$scope.placeOrder=function()
	{
		var index=0;
		angular.forEach($scope.cartProduct, function(item,i){
			$scope.cartProduct.splice(index,1);
			
			//index=index+1;
		});
		$scope.cartProduct.splice(index,1);
		$scope.noOfItems=$scope.cartProduct.length;
	}
	//"[{\"productId\":1, \"companyName\":\"Google\", \"productType\":\"Mobile\", \"productName\":\"Nexus 6p\", \"price\":600, \"color\":\"Black\"},{\"productId\":2, \"companyName\":\"Google\", \"productType\":\"Mobile\", \"productName\":\"Nexuserwe 6p\", \"price\":600, \"color\":\"Black\"}]";
	//"[{'productId':1, 'companyName':'Google', 'productType':'Mobile', 'productName':'Nexus 6p', 'price':600, 'color':'Black'},{'productId':2, 'companyName':'Google', 'productType':'Mobile', 'productName':'Nexuserwe 6p', 'price':600, 'color':'Black'}]";
}]);
app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [], keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});