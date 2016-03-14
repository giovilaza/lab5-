// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }


  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.fullMenu = Dinner.getFullMenu();

  $scope.notFull = Dinner.notFull();

  $scope.dish1 = Dinner.getAppetizer();
  $scope.dish2 = Dinner.getMD();
  $scope.dish3 = Dinner.getdesserts();

  $scope.dishPrice = function (dish) {
  	Dinner.getDishPrice(dish);
  }

  $scope.removeDish = function(dish) {
  	console.log("gogogo");

  	Dinner.removeDish(dish);
  	$scope.dish1 = Dinner.getAppetizer();
  }



});