let searchInput = document.querySelector('#searchInput');
let cousine = document.querySelector('#cousine');
let diet = document.querySelector('#diet');
let intolerances = document.querySelector('#intolerances');
let excludeIngredient = document.querySelector('#excludeIngredient');

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
});
