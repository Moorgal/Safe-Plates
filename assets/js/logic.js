let searchInput = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');
let newSearch = document.querySelector('#newSearch');
let formInput = document.querySelector('#formInput');
let cousine = document.querySelector('#cousine');
let diet = document.querySelector('#diet');
let intolerances = document.querySelector('#intolerances');
let result = document.querySelector('#result');

// ------------------------------
// ---------meal search----------
// ------------------------------
searchBtn.addEventListener('click', function () {
  // API setup
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchInput.value}&cuisine=${cousine.value}&diet=${diet.value}&intolerances=${intolerances.value}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=calories&sortDirection=asc&number=20&limitLicense=false&ranking=2`,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b3d7db931cmshf703ee682f29c40p1e83fejsn545b9d960af7',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  };
  // ajax call
  $.ajax(settings).done(function (response) {
    for (let i = 0; i < 20; i++) {
      // render main meal info
      let renderMeal = document.createElement('div');
      renderMeal.classList.add('mySlides');
      renderMeal.classList.add('fade');
      renderMeal.innerHTML = `<div class="numbertext">${i + 1}/${response.results.length}</div>
                            <img src="${response.results[i].image}">
                            <h2>${response.results[i].title}</h2>
                            <p>Time it takes: ${response.results[i].readyInMinutes} min</p>
                            <p>Servings: ${response.results[i].servings}</p>
                            <h4>Ingredients</h4>
                            <div id="ingredients${i}"></div>
                            <h4>Instructions</h4>
                            <div id="instructions${i}"></div>
                            <a class="prev">❮</a>
                            <a class="next">❯</a>`;
      result.appendChild(renderMeal);
      // render ingredients
      for (let j = 0; j < response.results[i].extendedIngredients.length; j++) {
        document.getElementById(`ingredients${i}`).innerHTML += `<p>${response.results[i].extendedIngredients[j].original}</p> `;
      }
      // render instructions OR if there is non then render summary
      if (response.results[i].analyzedInstructions[0]) {
        for (let k = 0; k < response.results[i].analyzedInstructions[0].steps.length; k++) {
          document.getElementById(`instructions${i}`).innerHTML += `<p>${k + 1}.) ${response.results[i].analyzedInstructions[0].steps[k].step}</p> `;
        }
      } else {
        document.getElementById(`instructions${i}`).innerHTML += response.results[i].summary;
      }
    }
    // ------------------------------
    // -----------slideshow----------
    // ----based on w3schools.com slideshow----
    // ------------------------------

    let slideIndex = 1;
    let slides = document.getElementsByClassName('mySlides');
    console.log(slides);
    showSlides(slideIndex);
    document.querySelector('.prev').addEventListener('click', function () {
      slideIndex--;
      showSlides(slideIndex);
    });
    document.querySelector('.next').addEventListener('click', function () {
      slideIndex++;
      showSlides(slideIndex);
    });
    function showSlides(n) {
      console.log(slideIndex);
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      slides[slideIndex - 1].style.display = 'block';
    }
  });
});
// clear submit form
newSearch.addEventListener('click', function () {
  formInput.reset();
  location.reload();
});

//Testing new API for cocktails

let ingredientsToAvoid = [];

async function fetchCocktailRecipes() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
  const cocktails = await response.json();

  const filteredCocktails = cocktails.drinks.filter((cocktail) => {
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
  const ingredientInput = document.getElementById('ingredient-input');
  ingredientsToAvoid = ingredientInput.value.split(',');

  const cocktails = await fetchCocktailRecipes();
  const recipeList = document.getElementById('recipe-list');

  recipeList.innerHTML = '';
  for (let i = 0; i < cocktails.length; i++) {
    const cocktail = cocktails[i];
    //It only returns the name of the drink and the photo, but it doesn't return ingredients and instructions
    recipeList.innerHTML += `
      <div>
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
         
        ${cocktail.strIngredients ? `<p>Ingredients: ${cocktail.strIngredients.join(', ')}</p>` : ''}
        <p>Instructions: ${cocktail.strInstructions}</p>
      </div>
    `;
  }
}

document.getElementById('ingredient-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  await main();
});
