const express = require('express');
const router = express.Router();
const pool = require('../db');

router
.get('/recipes', async (req, res) => { // <-- /api/recipes
    const recipes = await pool.query('SELECT * FROM recipes');
    if (recipes.rows.length > 0) {
        res.json(recipes.rows);
    };
});
router
.post('/recipes', async (req, res) => {
    const { recipe_name, ingredients, steps, favorite, rating } = req.body;
    const newRecipeQuery = await pool.query('INSERT INTO recipes (recipe_name, ingredients, steps, favorite, rating, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [recipe_name, ingredients, steps, favorite, rating, 1]);
    if (newRecipeQuery.rows.length > 0) {
        res.json(newRecipeQuery.rows[0]);
    } else {
        res.json({ message: 'Recipe not created' });
    };
});

router.get('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    if (id === 'undefined') {
        res.json({ message: 'Recipe not found' });
    } else {
        const selectedRecipe = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
        if (selectedRecipe.rows.length > 0) {
            res.json(selectedRecipe.rows[0]);
        } else {
            res.json({ message: 'Selection recipe not found' });
        }
    }
})

router.post('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    if (id === 'undefined') {
        res.json({ message: 'Recipe not found' });
    } else {
        const updatedRecipe = await pool.query(
            'UPDATE recipes SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
        if (updatedRecipe.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.json({ message: 'Updating recipe not found' });
        }
    }
});

router.delete('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    if (id === 'undefined') {
        res.json({ message: 'Recipe not found' });
    } else {
        const deletedRecipe = await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
        if (deletedRecipe.rows.length > 0) {
            res.json({ message: `Recipe deleted with ID: ${id}` });
        } else {
            res.json({ message: 'Deletion recipe not found' });
        }
    };
});

module.exports = router;