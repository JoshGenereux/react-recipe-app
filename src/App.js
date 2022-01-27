import './App.css';
import {useEffect, useState} from "react";
import Recipe from "./Recipe";

function App() {
  const APP_ID = 'cc9af7fb'
  const APP_KEY = '6bb40b93117d7b957d4371723accf27c'

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes();
  },[]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits)
    console.log(recipes)
  }


  return (
    <div className="App">
      <h1>hello react</h1>
      <form className='search-form'>
        <input className='search-bar' type='text'/>
        <button className='search-btn' type='submit'>Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;
