// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope, $routeParams, Dinner) {


    $scope.id = $routeParams.dishid;
    console.log("Route id", $routeParams.dishid)

    $scope.status = "Searching...";
    Dinner.Dish.get({
        RecipeID: $routeParams.dishid
    }, function (data) {

        $scope.dish = data;

        $scope.status = "Result Found";
        console.log("Entered after data", $scope.dish);

    }, function (data) {
        console.log("Entered error");
        $scope.status = "There was an error";
    });

    $scope.total = 0
    $scope.setTotals = function (ingredient) {
        if (ingredient) {
            $scope.total += (ingredient.Quantity * 1);
        }
    }

    $scope.addDish = function (dish, total) {
        console.log("Add dish called")
        Dinner.addDishToMenu(dish, total);

    }

    console.log($scope.status);

});