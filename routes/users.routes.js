const express = require("express");
const router = express.Router();

const RecipeModel = require("../models/Recipe.model");
const UserModel = require("../models/User.model");

//1º rota: Criar um user
router.post("/create", async (req, res) => {
  try {
    const newUser = await UserModel.create({ ...req.body });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//2º rota: Pegar todos os users
router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await UserModel.find();

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//3º rota: Acessar um usuário pelo seu ID
router.get("/user/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;

    const oneUser = await UserModel.findById(idUser);

    return res.status(200).json(oneUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//4º Adicionar uma receita na array de favorites
router.put("/favoritesRecipes/:idUser/:idRecipe", async (req, res) => {
  try {
    const { idUser, idRecipe } = req.params;
    //recipemodel where
    const recipeFavorite = await UserModel.findByIdAndUpdate(
      idUser,
      {
        $push: { favorites: idRecipe },
      },
      { new: true }
    );

    await RecipeModel.findByIdAndUpdate(
      idRecipe,
      {
        $inc: { favorites: 1 },
      },
      { new: true }
    );

    return res.status(200).json(recipeFavorite);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//5º Adicionar uma receita na array de deslikes
router.put("/deslikeRecipe/:idUser/:idRecipe", async (req, res) => {
  try {
    const { idUser, idRecipe } = req.params;

    const recipeDeslike = await UserModel.findByIdAndUpdate(
      idUser,
      { $push: { deslikes: idRecipe } },
      { new: true }
    );

    await RecipeModel.findByIdAndUpdate(
      idRecipe,
      {
        $inc: { deslikes: 1 },
      },
      { new: true }
    );

    return res.status(200).json(recipeDeslike);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//6º Remover uma receita na array de favorite
router.put("/deleteFavoritesRecipes/:idUser/:idRecipe", async (req, res) => {
  try {
    const { idUser, idRecipe } = req.params;

    const removeFavorite = await UserModel.findByIdAndUpdate(
      idUser,
      {
        $pull: { favorites: idRecipe },
      },
      { new: true }
    );

    await RecipeModel.findByIdAndUpdate(
        idRecipe,
        {
          $inc: { favorites: -1 },
        },
        { new: true }
      );

    return res.status(200).json(removeFavorite);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//7º Remover uma receita na array de deslikes
router.put("/deleteDeslikesRecipes/:idUser/:idRecipe", async (req, res) => {
  try {
    const { idUser, idRecipe } = req.params;

    const removeDeslikes = await UserModel.findByIdAndUpdate(
      idUser,
      {
        $pull: { deslikes: idRecipe },
      },
      { new: true }
    );

    await RecipeModel.findByIdAndUpdate(
        idRecipe,
        {
          $inc: { deslikes: -1 },
        },
        { new: true }
      );

    return res.status(200).json(removeDeslikes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
