
const Input = document.querySelector('#input-dish');
const SearchBtn = document.querySelector('#search-btn');
const RecipeContainer = document.querySelector('.recipe-container');
const recipeDetailContent = document.querySelector('.recipe-detail-content');
const closeBtn = document.querySelector('.recipe-close-btn');

const fetchRecipe = async (query) => {
    try {
        RecipeContainer.innerHTML = `<h2>Fetching Recipe's...</h2>`;
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        console.log(response);

        RecipeContainer.innerHTML = "";
        response.meals.forEach(element => {
            const recipediv = document.createElement('div');
            recipediv.classList.add('recipe');
            recipediv.innerHTML = `
                <img src="${element.strMealThumb}" alt="${element.strMeal}">
                <!-- Add more elements as needed -->
                <h3>${element.strMeal}</h3>
                <p><span>${element.strArea}</span> Dish</p>
                <p><span>${element.strCategory}</span> Category</p>
            `;
            const Button = document.createElement('button');
            Button.textContent = "View Recipe";
            Button.addEventListener('click', () => {
                openPOPup(element);
            });
            recipediv.appendChild(Button);
            RecipeContainer.appendChild(recipediv);
        });
    } catch (error) {
        RecipeContainer.innerHTML = `<div class="error-shown">
        <h2>Failed in Fetching the Recipe...</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRBvBRB6nsDkK5cFxgPRdij9pdIx1kbL6WSA&usqp=CAU"></div>`;
        console.error(error);
    }
};

const FetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientList += `<li>${measure.trim()} ${ingredient.trim()}</li>`;
        } else {
            // If either ingredient or measure is empty, we can assume no more ingredients
            break;
        }
    }
    return ingredientList;
};

const openPOPup = (meal) => {
    recipeDetailContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="recipeIngredients">${FetchIngredients(meal)}</ul>
    <div class="recipeInst">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `;

    recipeDetailContent.parentElement.style.display = "block";
};


closeBtn.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display = "none";
})

SearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = Input.value.trim();
    if (!searchinput) {
        RecipeContainer.innerHTML = `<h2>Enter the Meal for Recipe's.</h2>`;
    } else {
        fetchRecipe(searchinput);
    }
});

