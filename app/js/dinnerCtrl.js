// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope, Dinner) {

    $scope.numberOfGuests = Dinner.getNumberOfGuests();

    $scope.setNumberOfGuest = function (number) {
        Dinner.setNumberOfGuests(number);
    }

    $scope.getNumberOfGuest = function () {
        return Dinner.getNumberOfGuests();
    }


    // TODO in Lab 5: Implement the methods to get the dinner menu
    // add dish to menu and get total menu price

    $scope.fullMenu = Dinner.getFullMenu();
    $scope.totalPrice = Dinner.getTotalMenuPrice();

    $scope.notFull = Dinner.notFull();



    $scope.dish1 = Dinner.getAppetizer();
    $scope.dish2 = Dinner.getMD();
    $scope.dish3 = Dinner.getdesserts();



    $scope.removeDish = function (dish) {

        Dinner.removeDish(dish);
        $scope.dish1 = Dinner.getAppetizer();
        $scope.dish2 = Dinner.getMD();
        $scope.dish3 = Dinner.getdesserts();
    }



});