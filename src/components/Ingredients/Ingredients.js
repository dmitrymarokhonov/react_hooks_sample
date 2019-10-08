import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-sample-c3be2.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(responseData => {
        setIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = ingId => {
    setIngredients(prevIngredients =>
      prevIngredients.filter(el => el.id !== ingId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
