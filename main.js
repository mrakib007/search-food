//search the foods as you wish with the first letter
function clickFunction(){
    const searchValue = document.getElementById('food-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`)
    .then(res=>res.json())
    .then(data=>displayFood(data.meals))
    .catch(error => alert("Please search foods by their first letter."));
    document.getElementById('food-input').value = "";  
} 
//food display function
const displayFood= food => {
  const showFood = document.getElementById('show-food');
  food.forEach(item => {
      const showItem = document.createElement('div');
      const foodDetails =  `  <div class="card" style="width: 18rem;">
          <img src="${item.strMealThumb}" onclick="detailFood('${item.idMeal}')" class="card-img-top" alt="...">
          <div class="card-body">
          <p style= "background-color : goldenRod;" class="card-text">${item.strMeal}</p>
          </div>
          </div> `;
      showItem.innerHTML = foodDetails;
      showFood.appendChild( showItem);
  });
}
//food cooking details and youtube videos.
function detailFood(foodId){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
      .then(res => res.json())
      .then(data => detailInfo(data.meals[0]))
      .catch(error => alert("Please search foods by their first letter."));
}
function detailInfo(material){
  document.getElementById('no-display').style.display = 'none';
  document.getElementById('show-food').style.display = 'none';
  document.getElementById('singleFood').style.display = 'block';
  document.getElementById('singleFood').innerHTML =
  `<div class="card my-auto mx-auto" style="width: 18rem;">
  <img src="${material.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title"> ${material.strMeal}</h5>
    <p class="card-text" style="text-align:left;">${material.strIngredient1}</p>
    <p class="card-text" style="text-align:left;">${material.strIngredient2}</p>
    <p class="card-text" style="text-align:left;">${material.strIngredient3}</p>
    <p class="card-text" style="text-align:left;">${material.strIngredient4}</p>
    <p class="card-text" style="text-align:left;">${material.strIngredient5}</p>
    <a href="${material.strYoutube}" class="btn btn-danger"  target = "_blank">See Cooking Tutorial</a>
  </div>
</div>`
}
//click home on the nav bar to reload the page
function reloadPage(){
  window.location.reload();
}
                                                   //Thank you