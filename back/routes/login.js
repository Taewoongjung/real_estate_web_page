const express = require('express');

const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.get('/', async(req, res, next) => {
   try {

   } catch (error) {
       console.error(error);
       next(error); // status 500
   }
});