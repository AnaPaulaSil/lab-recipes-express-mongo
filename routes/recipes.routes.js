//Escreva suas rotas para as receitas aqui//

//Importe o express e instancie o Router aqui
const express = require("express");
const router = express.Router();

// Importe os models aqui
const RecipeModel = require("../models/Recipe.model");
const UserModel = require("../models/User.model");

//1º rota: Criar uma receita
router.post("/create", async (req, res) => {
  try {
    const newRecipe = await RecipeModel.create({ ...req.body });

    console.log(newRecipe.title);

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//2º rota: Acessar todas as receitas
router.get("/allRecipes", async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find();

    return res.status(200).json(allRecipes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//3º rota: Acessar uma única receita pelo seu ID
router.get("/recipe/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;

    const oneRecipe = await RecipeModel.findById(idRecipe);

    return res.status(200).json(oneRecipe);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//4º rota: Criar várias receitas de uma só vez
router.post("/createMany", async (req, res) => {
  try {
    const manyRecipes = await RecipeModel.insertMany([...req.body]);

    return res.status(201).json(manyRecipes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//6º rota: Acessar todos os usuários que favoritaram essa receita
router.get("/allFavorites/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;

    const allFavorites = await UserModel.find({ favorites: idRecipe });

    return res.status(200).json(allFavorites);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//7º rota: Acessar todos os usuários que deram dislike essa receita
router.get("/allDeslikes/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;

    const allDeslikes = await UserModel.find({ deslikes: idRecipe });

    return res.status(200).json(allDeslikes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//!5º rota: Deletar uma receita pelo seu ID - retira-la da array de favorites e dislikes dos USERS
router.delete("/deleteRecipe/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;

    const deletedRecipe = await RecipeModel.findByIdAndDelete(idRecipe);

    await UserModel.updateMany(
      { $or: [{ favorites: idRecipe }, { dislikes: idRecipe }] }, //criado para declarar a area que sera retirado, antes do pull
      {
        $pull: { favorites: idRecipe, dislikes: idRecipe },
      },
      { new: true }
    );

    return res.status(200).json(deletedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//Não se esqueça de exportar o router!
module.exports = router;
