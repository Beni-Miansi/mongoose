const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// pour créer et sauvegarder une personne 

const Person = require('./models/User');

const createPerson = async () => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });

  try {
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error('Error saving person:', err);
  }
};

createPerson();




// pour créer plusieurs personnes

const createManyPeople = async (arrayOfPeople) => {
    try {
      const people = await Person.create(arrayOfPeople);
      console.log('People created:', people);
    } catch (err) {
      console.error('Error creating people:', err);
    }
  };
  
  createManyPeople([
    { name: 'Jane Doe', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
    { name: 'Alice', age: 28, favoriteFoods: ['Sushi', 'Ramen'] },
    { name: 'Bob', age: 32, favoriteFoods: ['Steak', 'Fries'] }
  ]);
  

  // pour rechercher toutes les personnes par prénom

  const findPeopleByName = async (name) => {
    try {
      const people = await Person.find({ name });
      console.log('People found:', people);
    } catch (err) {
      console.error('Error finding people:', err);
    }
  };
  
  findPeopleByName('John Doe');


  
  // pour trouver une personne par aliment favori 

  const findOneByFavoriteFood = async (food) => {
    try {
      const person = await Person.findOne({ favoriteFoods: food });
      console.log('Person found:', person);
    } catch (err) {
      console.error('Error finding person:', err);
    }
  };
  
  findOneByFavoriteFood('Pizza');
  


  // pour trouver une personne par _id

  const findPersonById = async (personId) => {
    try {
      const person = await Person.findById(personId);
      console.log('Person found:', person);
    } catch (err) {
      console.error('Error finding person by id:', err);
    }
  };
  
  findPersonById('id_de_la_personne');
  

  // pour mettre à jour une personne par _id 

  const updatePersonFavoriteFoods = async (personId) => {
    try {
      const person = await Person.findById(personId);
      person.favoriteFoods.push('Hamburger');
      await person.save();
      console.log('Updated person:', person);
    } catch (err) {
      console.error('Error updating person:', err);
    }
  };
  
  updatePersonFavoriteFoods('id_de_la_personne');
  

  // pour mettre à jour une personne par nom 

  const updatePersonAge = async (personName) => {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true }
      );
      console.log('Updated person:', updatedPerson);
    } catch (err) {
      console.error('Error updating person age:', err);
    }
  };
  
  updatePersonAge('John Doe');
  


  // pour supprimer une personne par _id 

  const removePersonById = async (personId) => {
    try {
      const removedPerson = await Person.findByIdAndRemove(personId);
      console.log('Removed person:', removedPerson);
    } catch (err) {
      console.error('Error removing person:', err);
    }
  };
  
  removePersonById('id_de_la_personne');
  


  // pour supprimer toutes les personnes nommées Mary


  const removeManyPeople = async () => {
    try {
      const result = await Person.remove({ name: 'Mary' });
      console.log('People removed:', result);
    } catch (err) {
      console.error('Error removing people:', err);
    }
  };
  
  removeManyPeople();
  

  // pour trouver des personnes qui aiment les burritos, trier par nom, limiter les résultats à deux, et masquer leur âge 

  const findPeopleWhoLikeBurritos = async () => {
    try {
      const people = await Person.find({ favoriteFoods: 'Burritos' })
        .sort('name')
        .limit(2)
        .select('-age')
        .exec();
      console.log('People who like burritos:', people);
    } catch (err) {
      console.error('Error finding people who like burritos:', err);
    }
  };
  
  findPeopleWhoLikeBurritos();
  
