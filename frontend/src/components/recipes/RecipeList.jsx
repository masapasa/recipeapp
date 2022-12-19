import React, { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm';
import "./RecipeForm.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap styles
import {
    Button,
    Table,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> // import font awesome styles

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        // fetch the list of recipes from the back-end server or API
        const fetchRecipes = async () => {
        const response = await fetch('https://dsanmart-recipeapp2-be-dev.azurewebsites.net/api/recipes', { method: 'GET' });
        const data = await response.json();
        console.log('data',data);
        setRecipes(data);
    };
    fetchRecipes();
}, []);

const handleAddRecipe = () => {
    setShowForm(true);
    setSelectedRecipe(null);
};

const handleEditRecipe = (recipe) => {
    setShowForm(true);
    setSelectedRecipe(recipe);
};

const handleDeleteRecipe = async (id) => {
    // delete the recipe from the back-end server or API
    console.log('delid', id);
    await fetch(`https://dsanmart-recipeapp2-be-dev.azurewebsites.net/api/recipes/${id}`, { method: 'DELETE' });
    // update the list of recipes
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
};

const handleCloseForm = () => {
    setShowForm(false);
    setSelectedRecipe(null);
};

const handleSaveRecipe = async (recipe) => {
    let updatedRecipes;
    if (recipe.id) {
        // update the recipe on the back-end server or API
        console.log('updating recipe', recipe);
        const response = await fetch(`'https://dsanmart-recipeapp2-be-dev.azurewebsites.net/api/recipes/${recipe.id}`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
        });
        const replaceRecipe = await response.json();
        // update the recipe in the list of recipes
        updatedRecipes = recipes.map((recipe) => (recipe.id === replaceRecipe.id ? replaceRecipe : recipe));
    } else {
        // create the recipe on the back-end server or API
        console.log('creating recipe', recipe);
        const response = await fetch('https://dsanmart-recipeapp2-be-dev.azurewebsites.net/api/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {'Content-Type': 'application/json'},
        });
        const newRecipe = await response.json();
        updatedRecipes = [...recipes, newRecipe]; // update the list of recipes
    }
    setRecipes(updatedRecipes);
    setShowForm(false);
    setSelectedRecipe(null);
};

return (
    <>
    <Container>
        
        <br />
        <br />
        <br />
        <br />
        <h1 class="display-2">Cooking Master</h1>
        <br />
        <br />
        <Button color="success" onClick={handleAddRecipe}>Add Recipe</Button>
        <br />
        <br />
        <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Steps</th>
                <th>Rate</th>
                <th>Fav</th>
            </tr>
        </thead>
        <tbody>
            {recipes.length > 0 ? (
                recipes.map((recipe) => (
                    <tr key={recipe.id}>
                        <td>{recipe.recipe_name}</td>
                        <td>{recipe.ingredients}</td>
                        <td>{recipe.steps}</td>
                        <td><i className={recipe.favorite ? 'fa fa-star' : 'fa fa-star-o'}></i></td>
                        <td>{recipe.favorite}</td>
                        <td>
            <Button color="primary" onClick={() => handleEditRecipe(recipe)}>Edit</Button>{' '}
            <Button color="danger" onClick={() => handleDeleteRecipe(recipe.id)}>Delete</Button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No recipes found...</td>
                </tr>
            )}
        </tbody>
        </Table>
        <br />
        <Modal isOpen={showForm} toggle={handleCloseForm}>
            <ModalHeader>
                <div><h3>Enter Recipe Details</h3></div>
            </ModalHeader>
            <ModalBody>
                <RecipeForm
                recipe={selectedRecipe}
                onSave={handleSaveRecipe}
                onClose={handleCloseForm}
                />
        </ModalBody>
        </Modal>

    </Container>
    </>
  );
};

export default RecipeList;