let searchInput = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');
let newSearch = document.querySelector('#newSearch');
let formInput = document.querySelector('#formInput');
let cousine = document.querySelector('#cousine');
let diet = document.querySelector('#diet');
let intolerances = document.querySelector('#intolerances');
let excludeIngredient = document.querySelector('#excludeIngredient');
let result = document.querySelector('#result');
searchBtn.addEventListener('click', function () {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchInput.value}&cuisine=${cousine.value}&diet=${diet.value}&intolerances=${intolerances.value}&excludeIngredients=${excludeIngredient.value}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=calories&sortDirection=asc&number=20&limitLicense=false&ranking=2`,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b3d7db931cmshf703ee682f29c40p1e83fejsn545b9d960af7',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    for (let i = 0; i < 20; i++) {
      let renderMeal = document.createElement('div');
      renderMeal.innerHTML = `<img src="${response.results[i].image}">
                            <h2>${response.results[i].title}</h2>
                            <p>Time it takes: ${response.results[i].readyInMinutes} min</p>
                            <p>Servings: ${response.results[i].servings}</p>
                            <h4>Ingredients</h4>
                            <div id="ingredients${i}"></div>
                            <h4>Instructions</h4>
                            <div id="instructions${i}"></div>`;
      result.appendChild(renderMeal);
      for (let j = 0; j < response.results[i].extendedIngredients.length; j++) {
        document.getElementById(`ingredients${i}`).innerHTML += `<p>${response.results[i].extendedIngredients[j].original}</p> `;
      }
      for (let k = 0; k < response.results[i].analyzedInstructions[0].steps.length; k++) {
        document.getElementById(`instructions${i}`).innerHTML += `<p>${k + 1}.) ${response.results[i].analyzedInstructions[0].steps[k].step}</p> `;
      }
    }
  });
});

newSearch.addEventListener('click', function () {
  formInput.reset();
  location.reload();
});

//Testing new API for cocktails 

let ingredientsToAvoid = [];

async function fetchCocktailRecipes() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
  const cocktails = await response.json();

  const filteredCocktails = cocktails.drinks.filter(cocktail => {
    for (let i = 0; i < ingredientsToAvoid.length; i++) {
      if (cocktail.strIngredients && cocktail.strIngredients.includes(ingredientsToAvoid[i])) {
        return false;
      }
    }
    return true;
  });

  const maxTenCocktails = filteredCocktails.slice(0, 10);
  return maxTenCocktails;
}

async function main() {
  const ingredientInput = document.getElementById("ingredient-input");
  ingredientsToAvoid = ingredientInput.value.split(",");

  const cocktails = await fetchCocktailRecipes();
  const recipeList = document.getElementById("recipe-list");

  recipeList.innerHTML = '';
  for (let i = 0; i < cocktails.length; i++) {
    const cocktail = cocktails[i];
    //It only returns the name of the drink and the photo, but it doesn't return ingredients and instructions
    recipeList.innerHTML += `
      <div>
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
         
        ${cocktail.strIngredients ? `<p>Ingredients: ${cocktail.strIngredients.join(", ")}</p>` : ''}
        <p>Instructions: ${cocktail.strInstructions}</p>
      </div>
    `;
  }
}

document.getElementById("ingredient-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  await main();
});

