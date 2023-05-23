const fs = require("fs");

const path = require("path");

const express = require("express");

const router = express.Router();

const alphabetArray = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
];

//alphabet object
let alphabet = {
	a: ["a", "grey", ""],
	b: ["b", "grey", ""],
	c: ["c", "grey", ""],
	d: ["d", "grey", ""],
	e: ["e", "grey", ""],
	f: ["f", "grey", ""],
	g: ["g", "grey", ""],
	h: ["h", "grey", ""],
	i: ["i", "grey", ""],
	j: ["j", "grey", ""],
	k: ["k", "grey", ""],
	l: ["l", "grey", ""],
	m: ["m", "grey", ""],
	n: ["n", "grey", ""],
	o: ["o", "grey", ""],
	p: ["p", "grey", ""],
	q: ["q", "grey", ""],
	r: ["r", "grey", ""],
	s: ["s", "grey", ""],
	t: ["t", "grey", ""],
	u: ["u", "grey", ""],
	v: ["v", "grey", ""],
	w: ["w", "grey", ""],
	x: ["x", "grey", ""],
	y: ["y", "grey", ""],
	z: ["z", "grey", ""]
};

//creating guesses array
let guesses = [];

//letters used array
let usedLettersArray = [""];

//singleGuess variable which will store the single guess split into individual letters
let tempLetterArray;

const availWords = require('../data/5_letter_words');

//choosing random word from available words array
let randomWord = availWords[Math.floor(Math.random() * availWords.length)];

//creating variable to hold new guess array
let newGuess;

router.post("/", (req, res, next) => {
	//creating variable to read request body
	newGuess = req.body.guess;

	//compare newGuess to the randomWord
	if (newGuess === randomWord.word) {
		res.redirect("/winner");
	}

	//add the letters of the guess to an array
	
	//splitting and adding individual letters of a string to an array
	tempLetterArray = newGuess.split("");

	//change values in the alphabet object to "grey becasue the letters have been chosen
	for (let i = 0; i < tempLetterArray.length; i++) {
		alphabet[tempLetterArray[i]][1] = "red";
	}

   //splitting randomWord into array
   let randomWordPlaceholder = randomWord.word.split("");

   //looping through random word and comparing it with guess to see if there are any overlaps
   for (let i = 0; i < tempLetterArray.length; i++) {
      if(alphabet[tempLetterArray[i]][1] === "red" && alphabet[tempLetterArray[i]][2] === "green" && tempLetterArray[i] !== randomWordPlaceholder[i]){
         alphabet[tempLetterArray[i]][1] = "yellow"
      }
   }

   console.log(randomWordPlaceholder);
	console.log(alphabet);

	//adding new guess to the guess array
	guesses.push({ guess: newGuess });

	res.redirect("/");
});

router.get("/", (req, res, next) => {
	//run these functions everytime page reloads
	if (newGuess === randomWord.word) {
		randomWord = availWords[Math.floor(Math.random() * availWords.length)];
		guesses = [];
	}

	//split the randomWord into an array and then add the word to the alphabet and show green
	let randomWordArray = randomWord.word.split("");
	for (let i = 0; i < randomWordArray.length; i++) {
		alphabet[randomWordArray[i]][2] = "green";
	}


      
   //this all the data that is being shared with gameboard as it is rendered
	res.render("gameboard", {
		availWords: availWords,
		randomWord: randomWord,
		guesses: guesses,
		alphabet: alphabet,
      randomWordArray:randomWordArray,
      tempLetterArray:tempLetterArray
	});
});

router.get("/winner", (req, res, next) => {
	res.render("winnerPage");

	//change alphabet object back to its original form
	for (let i = 0; i < alphabetArray.length; i++) {
		alphabet[alphabetArray[i]][1] = "grey";
		alphabet[alphabetArray[i]][2] = "";
	}
});

module.exports = router;
