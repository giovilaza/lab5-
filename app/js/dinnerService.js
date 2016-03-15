// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource, $cookieStore) {

    var numberOfGuest = 1;
    this.x = 0;
    this.check = [0, 0, 0];


    if (!$cookieStore.get('numberOfGuest')) {
        var numberOfGuest = 1;
    } else {
        var numberOfGuest = $cookieStore.get('numberOfGuest');
    };

    this.setNumberOfGuests = function (num) {
        numberOfGuest = num;

        $cookieStore.put('numberOfGuest', num);
    }

    this.getNumberOfGuests = function () {

        return numberOfGuest;


    }



    // TODO in Lab 5: Add your model code from previous labs
    // feel free to remove above example code
    // you will need to modify the model (getDish and getAllDishes) 
    // a bit to take the advantage of Angular resource service
    // check lab 5 instructions for details

    this.DishSearch = $resource('http://api.bigoven.com/recipes', {
        pg: 1,
        rpp: 5,
        api_key: '18f3cT02U9f6yRl3OKDpP8NA537kxYKu'
    }); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu

    this.Dish = $resource('http://api.bigoven.com/recipe/:RecipeID', {
        api_key: '18f3cT02U9f6yRl3OKDpP8NA537kxYKu',
        RecipeID: '@RecipeID'
    }); //XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN //1hg3g4Dkwr6pSt22n00EfS01rz568IR6

    //Each menu has only one dich of a type (starter, main dish and dessert)
    this.menuOptions = [];

    this.Appetizer = null;
    this.MD = null;
    this.desserts = null;


    this.Appetizersprice = 0;
    this.MDprice = 0;
    this.dessertsprice = 0;



    //store the dish that was clicked
    var selectedDish = 1;

    var fullMenuIDs = [];

    //create null menu for testing
    this.createMenu = function () {
        this.menuOptions['Appetizers'] = 0;
        this.menuOptions['Main Dish'] = 0;
        this.menuOptions['Desserts'] = 0;
    }

    this.createMenu();

    //Adds the passed dish number to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function (dish, price) {

        //replace in the manu the dish of this type
        this.menuOptions[dish.Category] = dish.RecipeID;

        for (x = 0; x < 3; x++) {

            if ((this.check[x] == 0) && (x == 0)) {
                this.Appetizersprice = price;
                this.Appetizer = dish;
                this.check[x] = 1;
                $cookieStore.put('Appetizer', this.Appetizer.RecipeID);
                break;

            } else if ((this.check[x] == 0) && (x == 1)) {
                this.MDprice = price;
                this.MD = dish;
                this.check[x] = 1;
                $cookieStore.put('MD', this.MD.RecipeID);
                break;
            } else if ((this.check[x] == 0) && (x == 2)) {
                this.dessertsprice = price;
                this.desserts = dish;
                this.check[x] = 1;
                $cookieStore.put('desserts', this.desserts.RecipeID);
                break;
            } else {

            }



        }
    }

    this.getAppetizer = function () {
        if (this.Appetizer != null) {
            return this.Appetizer;
        }
    }

    this.getMD = function () {
        if (this.MD != null) {
            return this.MD;
        }
    }

    this.getdesserts = function () {
        if (this.desserts != null) {
            return this.desserts;
        }
    }


    //Returns the dish number that is on the menu for selected type 
    this.getSelectedDish = function (type) {
        return this.menuOptions[type];
    }

    //Returns all the dishes on the menu.
    this.getFullMenu = function () {

        var fullMenu = [];
        fullMenu[0] = this.Appetizer;
        fullMenu[1] = this.MD;
        fullMenu[2] = this.desserts;

        return fullMenu;
    }

    //Returns the ingredients of one dish id
    this.getIngredients = function (id) {
        var theIngredients = [];
        for (key in dishes) {
            if (dishes[key].id == id) {
                theIngredients = dishes[key].ingredients;
            }
        }
        return theIngredients;
    }


    this.printIngredients2 = function (dish) {
        var printf = '';
        var current = '';

        for (var i = 0; i < dish.Ingredients.length; i++) {
            current = dish.Ingredients[i];
            printf = printf + current.Quantity + ' ' + current.Unit + ' ' + current.Name + ' ' + '</BR>';
        }
        return printf;
    }



    this.getDishPrice = function (dish) {

        var dishPrice = 0;
        for (var i = 0; i < dish.Ingredients.length; i++) {
            dishPrice += dish.Ingredients[i].Quantity;
            console.log(dishPrice)
        }
        return dishPrice;
    }


    this.getDishPrice2 = function (cat) {
        var dishPrice = 0;
        if (cat == "Appetizers") {
            dishPrice = this.Appetizersprice;
        } else if (cat == "Main Dish") {
            dishPrice = this.MDprice;
        } else if (cat == "Desserts") {
            dishPrice = this.dessertsprice;
        }
        return dishPrice;
    }



    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function () {
        var allIngredients = [];
        //for each menu option
        for (key in this.menuOptions) {
            var theIngredients = this.getIngredients(this.menuOptions[key]);
            //get ingredients
            for (var i = 0; i < theIngredients.length; i++) {
                allIngredients.push(theIngredients[i]);
            }
        }
        return allIngredients;
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function () {
        var totalMenuPrice = 0;
        totalMenuPrice = this.Appetizersprice + this.MDprice + this.dessertsprice;

        return (totalMenuPrice);
    }


    //Removes dish from menu
    this.removeDishFromMenu = function (id) {
        for (key in this.menuOptions) {
            if (this.menuOptions[key] == id) {
                this.menuOptions[key] = 0;
            }


        }
    }

    //Removes dish from menu
    this.removeDishFromMenu2 = function (type) {

        if (type == "Appetizers") {
            this.Appetizersprice = 0;
            this.Appetizer = null;
        } else if (type == "Main Dish") {
            this.MDprice = 0;
            this.MD = null;
        } else if (type == "Desserts") {
            this.dessertsprice = 0;
            this.desserts = null;
        }
    }

    this.removeDish = function (dish) {
        console.log(this.Appetizer + "|" + this.MD + "|" + this.desserts);
        if (this.Appetizer != null) {
            if (dish.RecipeID == this.Appetizer.RecipeID) {
                this.Appetizer = null;
                this.Appetizersprice = 0;
                this.check[0] = 0;
                console.log("removed1");
            }
        }
        if (this.MD != null) {
            if (dish.RecipeID == this.MD.RecipeID) {
                this.MD = null;
                this.MDprice = 0;
                this.check[1] = 0;
                console.log("removed2");
            }
        }
        if (this.desserts != null) {
            if (dish.RecipeID == this.desserts.RecipeID) {
                this.desserts = null;
                this.dessertsprice = 0;
                this.check[2] = 0;
                console.log("removed3");
            }
        }
    }


    this.setClickedDish = function (id) {
        selectedDish = id;
    }

    this.getClickedDish = function () {
        return selectedDish;
    }

    this.notFull = function () {
        if (this.check[2] == 1) {

            return false;
        } else {

            return true;
        }
    }

    var Dish = this.Dish;

    if (this.check[0] != 0) {
        // use fullMenu objects
    } else if ($cookieStore.get('Appetizer')) {
        // loop through the fullMenuID and fill the fullMenu with objects
        var AppetizerID = $cookieStore.get('Appetizer');
        //fullMenuIDs.forEach(function(id) {
        this.check[0] = 1;
        console.log(AppetizerID);
        status = "Processing";
        Dish.get({
            RecipeID: AppetizerID
        }, function (data) {
            this.Appetizer = data;

            console.log("found:" + this.Appetizer.RecipeID);
            status = "Result Found";
            //console.log(data);
        }, function (data) {
            status = "There was an error";
        });
        //});
    }

    // Angular service needs to return an object that has all the
    // methods created in it. You can consider that this is instead
    // of calling var model = new DinnerModel() we did in the previous labs
    // This is because Angular takes care of creating it when needed.
    return this;

});