// search your desired food by first letter 
document.getElementById('search-btn').addEventListener('click', () => {
    const searchFood = document.getElementById('food-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFood}`)
        .then(res => res.json())
        .then(data => foodDisplay(data.meals))
        .catch(error => alert("Please search foods by their first letter."));
         document.getElementById('food-input').value = "";
})

// show the search results
const foodDisplay= food => {
    const displayFood = document.getElementById('food-items');
    food.forEach(item => {
        const showItem = document.createElement('div');
        showItem.className = 'show-food';
        const foodDetails = `
        <img onclick="foodDetail('${item.idMeal}')" src="${item.strMealThumb}">
        <br><br>
        <h4 onclick="foodDetail('${item.idMeal}')">${item.strMeal}</h4><br>`;
        showItem.innerHTML = foodDetails;
        displayFood.appendChild( showItem);
    });
}

// detail information about food
const foodDetail = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showIngredients(data.meals[0]))
        .catch(error => alert("Please search foods by their first letter."));
}

// details info about ingredients
const showIngredients = material => {
    document.getElementById('food-items').style.display = "none";
    document.getElementById('search-btn').style.display = "none";
    document.getElementById('food-input').style.display = "none";
    document.getElementById('food-details').style.display = "block";
    const foodItem = document.getElementById('food-details');
    foodItem.innerHTML = `
    <img src="${material.strMealThumb}"><br><br>
    <h3>${material.strMeal}</h3><br>
    <h5>Ingredients</h5><br>
    <li>${material.strIngredient1}</li>
    <li>${material.strIngredient2}</li>
    <li>${material.strIngredient3}</li>
    <li>${material.strIngredient4}</li>
    <li>${material.strIngredient5}</li>

    <button class="btn btn-info" id="previous">previous page</button>`;
    document.getElementById("previous").addEventListener("click", () => {
        document.getElementById('food-details').style.display = "none";
        document.getElementById('food-items').style.display = "flex";
        document.getElementById('search-btn').style.display = "block";
        document.getElementById('food-input').style.display = "block";
    });
}