let searchInput = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');
let newSearch = document.querySelector('#newSearch');
let formInput = document.querySelector('#formInput');
let cuisine = document.querySelector('#cuisine');
let diet = document.querySelector('#diet');
let intolerances = document.querySelector('#intolerances');
let excludeIngredients = document.querySelector('#excludeIngredients');
let randomStart = Math.floor(Math.random() * 101);
let result = document.querySelector('#result');


// -----------navbar-------------
// function openNav() {
//   document.getElementById("menuItems").style.width = "100%";
// }

// function closeNav() {
//   document.getElementById("menuItems").style.display= "none";
// }
// 2nd attempt (did not work)
// var navbarToggle = document.getElementById('navbar-toggle');
// var menuItems = document.getElementById('menuItems');

// navbarToggle.addEventListener('click', function() {
//   menuItems.classList.toggle('collapsed');
// });

// function toggleNavbar() {
//   menuItems.classList.toggle('collapsed');
// }

// navbarToggle.addEventListener('click', toggleNavbar);

// 3rd time's a charm (nope)
// var navbarToggle = document.getElementById('navbar-toggle');
// var navbarLinks = document.getElementById('menuItems');
// var navbarMenuItems = document.querySelectorAll('.menu-items a');

// navbarToggle.addEventListener('click', function() {
//   navbarLinks.classList.toggle('collapsed');
// });

// if (navbarMenuItems) {
//   navbarMenuItems.forEach(function(menuItem) {
//     menuItem.addEventListener('click', function() {
//       navbarLinks.classList.add('collapsed');
//     });
//   });
// };

// ------------------------------
// ---------meal search----------
// ------------------------------
searchBtn.addEventListener('click', function () {
  console.log(randomStart);
  // API setup
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchInput.value}&cuisine=${cuisine.value}&diet=${diet.value}&intolerances=${intolerances.value}&excludeIngredients=${excludeIngredients.value}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=calories&sortDirection=asc&offset=${randomStart}&number=20&limitLicense=false&ranking=2`,
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
    // -----------choose !!ALL!! prev buttons----------
    let allPrev = document.querySelectorAll('.prev');
    allPrev.forEach(function (one) {
      one.addEventListener('click', function () {
        slideIndex--;
        showSlides(slideIndex);
      });
    });
    let allNext = document.querySelectorAll('.next');
    allNext.forEach(function (one) {
      one.addEventListener('click', function () {
        slideIndex++;
        showSlides(slideIndex);
      });
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



const apiKey = "b432930e82mshb0f655ab60238cap15ea9fjsnd74927c82e98";
const apiHost = "cocktail-by-api-ninjas.p.rapidapi.com";
const apiUrl = "https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail";

const avoidIngredientInput = document.querySelector("#avoid-ingredient");
const includeIngredientInput = document.querySelector("#include-ingredient");

const getCocktailData = () => {
  let avoidIngredient = avoidIngredientInput.value;
  let includeIngredient = includeIngredientInput.value;

   // Check if input fields are empty
   if (avoidIngredient === '') {
    avoidIngredient = 'none';
  }
  if (includeIngredient === '') {
    includeIngredient = 'none';
  }

  const params = `?name=${encodeURI(includeIngredient)}&without=${encodeURI(avoidIngredient)}`;
  console.log(params);
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": apiUrl + params,
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost
    }
  };

  $.ajax(settings).done(function (response) {
    // Clear the recipe list
    $('#recipe-list').empty();

    // Loop through each cocktail in the response and add them to the list
    response.forEach(cocktail => {
      // Create a new element to hold the cocktail details
      const cocktailElem = $('<div>');

      // Add the cocktail name as a heading
      const headingElem = $('<h2>').text(cocktail.name);
      cocktailElem.append(headingElem);

      // Add the cocktail ingredients as a list
      const ingredientsList = $('<ul>');
      cocktail.ingredients.forEach(ingredient => {
        const ingredientItem = $('<li>').text(ingredient);
        ingredientsList.append(ingredientItem);
      });
      cocktailElem.append($('<h3>').text('Ingredients:'));
      cocktailElem.append(ingredientsList);

      // Add the cocktail instructions
      const instructionsElem = $('<p>').text(cocktail.instructions);
      cocktailElem.append($('<h3>').text('Instructions:'));
      cocktailElem.append(instructionsElem);

      // Add the cocktail details to the recipe list
      $('#recipe-list').append(cocktailElem);
    });
  });
};

const form = document.querySelector('#ingredient-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  getCocktailData();
});
 