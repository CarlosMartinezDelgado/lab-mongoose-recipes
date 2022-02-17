const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((response) => {
    console.log(`Connected to the database: "${response.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((response) => {
    return Recipe.create({
      title: "De Rechupete",
      level: "Amateur Chef",
      ingredients: ["Cebolla", "6 large egg", "2 calabacines", "1 1/4 oil"],
      cuisine: "Spanish",
      dishType: "main_course",
      duration: 30,
      creator: "Chef Eduard",
      created: "2022-02-16",
    })

      .then((response) => {
        return Recipe.insertMany(data);
      })
      .then((response) => {
        //Actualizar
        return Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        );
      })

      .then((response) => {
        return Recipe.findOneAndDelete({ title: "Carrot Cake" });
      })

      .then((response) => {
        mongoose.connection.close()
      });

  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

