import './App.css';
import {useEffect, useState} from "react";
import Recipe from "./Recipe";

function App() {
  const APP_ID = 'cc9af7fb'
  const APP_KEY = '6bb40b93117d7b957d4371723accf27c'

  const [recipes, setRecipes] = useState([])
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits)
    console.log(recipes)
  }

  const updateSearch =(e)=>{
    e.preventDefault()
    setInput(e.target.value)
    console.log(input)
  }

  const getSearch = (e) =>{
    e.preventDefault();
    setQuery(input)
    setInput('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch}
        className='search-form'>
        <input
          className='search-bar'
          type='text'
          value={input}
          onChange={updateSearch}
        />
        <button
          className='search-btn'
          type='submit'
        >Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
        <Recipe title={recipe.recipe.label}
                key={recipe.recipe.label}
                calories={Math.floor(recipe.recipe.calories)}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
