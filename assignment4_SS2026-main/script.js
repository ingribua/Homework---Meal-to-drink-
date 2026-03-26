/*
Mapping from MealDB Categories to TheCocktailDB drink ingredient
You can customize or expand this object to suit your needs.
*/
const mealCategoryToCocktailIngredient = {
  Beef: "whiskey",
  Chicken: "gin",
  Dessert: "amaretto",
  Lamb: "vodka",
  Miscellaneous: "vodka",
  Pasta: "tequila",
  Pork: "tequila",
  Seafood: "rum",
  Side: "brandy",
  Starter: "rum",
  Vegetarian: "gin",
  Breakfast: "vodka",
  Goat: "whiskey",
  Vegan: "rum",
  // Add more if needed; otherwise default to something like 'cola'
};

/*
    2) Main Initialization Function
       Called on page load to start all the requests:
       - Fetch random meal
       - Display meal
       - Map meal category to spirit
       - Fetch matching (or random) cocktail
       - Display cocktail
*/

/*
function init() {
  fetchRandomMeal()
    .then((meal) => {
      displayMealData(meal);
      const spirit = mapMealCategoryToDrinkIngredient(meal.strCategory);
      return fetchCocktailByDrinkIngredient(spirit);
    })
    .then((cocktail) => {
      displayCocktailData(cocktail);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
*/

/*
 Fetch a Random Meal from TheMealDB
 Returns a Promise that resolves with the meal object
 */
function fetchRandomMeal() {
    // Fill in
}

/*
Display Meal Data in the DOM
Receives a meal object with fields like:
  strMeal, strMealThumb, strCategory, strInstructions,
  strIngredientX, strMeasureX, etc.
*/
function displayMealData(meal) {
    // Fill in
}

/*
Convert MealDB Category to a TheCocktailDB Spirit
Looks up category in our map, or defaults to 'cola'
*/
function mapMealCategoryToDrinkIngredient(category) {
  if (!category) return "cola";
  return mealCategoryToCocktailIngredient[category] || "cola";
}

/*
Fetch a Cocktail Using a Spirit from TheCocktailDB
Returns Promise that resolves to cocktail object
We call https://www.thecocktaildb.com/api/json/v1/1/search.php?s=DRINK_INGREDIENT to get a list of cocktails
Don't forget encodeURIComponent()
If no cocktails found, fetch random
*/
function fetchCocktailByDrinkIngredient(drinkIngredient) {
    const encode = encodeURIComponent(drinkIngredient || "cola"); //Will encode and make it URL safe.
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encode}`;
  

    return fetch(url) //fetching data from the cocktail DB
      .then(response => response.json())
      .then(data => {
        const drinks = data.drinks; //variable for the drinks inside the API/data for data.drinks - the drinks objects 

        if (!drinks) { //a check if cocktail is not found
          return fetchRandomCocktail();
        }

        return data.drinks[0];
        
      })
    }

/*
Fetch a Random Cocktail (backup in case nothing is found by the search)
Returns a Promise that resolves to cocktail object
*/
function fetchRandomCocktail() {
    const url="https://www.thecocktaildb.com/api/json/v1/1/random.php" /*Variable that consist of the API/URL*/;
    return fetch(url) /*Fetch function for getting the cocktail drink from the API*/
      .then(response => response.json())
      .then(data => {
        console.log("Raw data:", data); /*Is this needed?*/
        return data.drinks[0]; /* Random drink in the array of drinks */
      })
}

/*
Display Cocktail Data in the DOM
*/
function displayCocktailData(cocktail) {
    const name = document.getElementById("cocktail-name");
    const img = document.getElementById("cocktail-image");
    const ingredientsList = document.getElementById("cocktail-ingredients");
    ingredientsList.innerHTML = ""; // empty

    name.textContent = cocktail.strDrink;
    img.src = cocktail.strDrinkThumb;
    img.alt = cocktail.strDrink;

    //finding ALL the ingredients and display them: 
    for (const key in cocktail) {
        // Check if the key starts with "strIngredient"
        if (key.startsWith("strIngredient") && cocktail[key]) { //check if the key starts with strIngredient and if the cocktail key has a value 
            const li = document.createElement("li"); //then we create a list element, li. 
            li.textContent = cocktail[key];
            ingredientsList.appendChild(li);
        }
    }

    return ingredientsList;
}
//testing, my part, the cocktails
function init() {
  fetchCocktailByDrinkIngredient("vodka")
    .then(cocktail => {
      console.log(cocktail);
      displayCocktailData(cocktail);
    })
    .catch(err => console.error(err));
}

/*
Call init() when the page loads
*/
window.onload = init;
