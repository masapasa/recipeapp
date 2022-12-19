import React, { useState } from 'react';
import "./RecipeForm.css";
import {
  Button,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const RecipeForm = ({ recipe, onSave, onClose }) => {
  const [recipe_name, setName] = useState(recipe ? recipe.recipe_name : '');
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : '');
  const [steps, setSteps] = useState(recipe ? recipe.steps : '');
  const [rating, setRating] = useState(recipe ? recipe.rating : 0);
  const [favorite, setFavorite] = useState(recipe ? recipe.favorite : false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ id: recipe ? recipe.id : null, recipe_name, ingredients, steps, rating, favorite });
  };

  return (
    <ModalBody style={{ overflow: "scroll"}}>
    <FormGroup>
      <label>Recipe Name:</label>
        <input
          className='form-control'
          type="text"
          value={recipe_name}
          onChange={(event) => setName(event.target.value)}
        />
    </FormGroup>
    <FormGroup>
      <br />
      <label>Ingredients:</label>
        <input
          className='form-control'
          type="text"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />
    </FormGroup>
    <FormGroup>
      <br />
      <label>Steps:</label>
        <textarea
          className='form-control'
          type="text"
          value={steps}
          onChange={(event) => setSteps(event.target.value)}
        />
    </FormGroup>
    <FormGroup>
      <br />
      <label>Rate:</label>
        <input
          className='form-control'
          type="number"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />
    </FormGroup>
    <FormGroup>
      <br />
        <input
          type="checkbox"
          value={favorite}
          onChange={(event) => setFavorite(event.target.value)}
        />
        <label>Favorite</label>
    </FormGroup>
    <ModalFooter>
      <Button color="primary" type="submit" onClick={handleSubmit}>Save</Button>
      <Button color="danger" onClick={onClose}>Cancel</Button>
    </ModalFooter>
    </ModalBody>
  );
};

export default RecipeForm;