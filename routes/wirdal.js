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
	a: ["a","","","","","","",""],
	b: ["b","","","","","","",""],
	c: ["c","","","","","","",""],
	d: ["d","","","","","","",""],
	e: ["e","","","","","","",""],
	f: ["f","","","","","","",""],
	g: ["g","","","","","","",""],
	h: ["h","","","","","","",""],
	i: ["i","","","","","","",""],
	j: ["j","","","","","","",""],
	k: ["k","","","","","","",""],
	l: ["l","","","","","","",""],
	m: ["m","","","","","","",""],
	n: ["n","","","","","","",""],
	o: ["o","","","","","","",""],
	p: ["p","","","","","","",""],
	q: ["q","","","","","","",""],
	r: ["r","","","","","","",""],
	s: ["s","","","","","","",""],
	t: ["t","","","","","","",""],
	u: ["u","","","","","","",""],
	v: ["v","","","","","","",""],
	w: ["w","","","","","","",""],
	x: ["x","","","","","","",""],
	y: ["y","","","","","","",""],
	z: ["z","","","","","","",""],
};
const alphabetMega = {
	a: ["a","","","","","","",""],
	b: ["b","","","","","","",""],
	c: ["c","","","","","","",""],
	d: ["d","","","","","","",""],
	e: ["e","","","","","","",""],
	f: ["f","","","","","","",""],
	g: ["g","","","","","","",""],
	h: ["h","","","","","","",""],
	i: ["i","","","","","","",""],
	j: ["j","","","","","","",""],
	k: ["k","","","","","","",""],
	l: ["l","","","","","","",""],
	m: ["m","","","","","","",""],
	n: ["n","","","","","","",""],
	o: ["o","","","","","","",""],
	p: ["p","","","","","","",""],
	q: ["q","","","","","","",""],
	r: ["r","","","","","","",""],
	s: ["s","","","","","","",""],
	t: ["t","","","","","","",""],
	u: ["u","","","","","","",""],
	v: ["v","","","","","","",""],
	w: ["w","","","","","","",""],
	x: ["x","","","","","","",""],
	y: ["y","","","","","","",""],
	z: ["z","","","","","","",""],
};

//creating objects to hold a snapshot of guess arrays
let guessObjectArray = [];

let guessObject1;
let guessObject2;
let guessObject3;
let guessObject4;
let guessObject5;
let guessObject6;

//creating variable to hold the number of guesses and an array to add them to
let guessNum = 0;
let guessNumArray = [];

//creating guesses array
let guesses = [];

//array that holds all of the guesses
let guessArray = [];

//singleGuess variable which will store the single guess split into individual letters
let tempLetterArray;

const availWords = require('../data/5_letter_words');

//choosing random word from available words array
let randomWord = availWords[Math.floor(Math.random() * availWords.length)];

//creating variable to hold new guess array
let newGuess;

//creating a counting array for iterating
let countArray = [2,3,4,5,6,7]

router.post("/", (req, res, next) => {
	//creating variable to read request body
	newGuess = req.body.guess;


	//pushing newGuess into guess array
	guesses.push(newGuess)

	//compare newGuess to the randomWord
	if (newGuess === randomWord.word) {
		res.redirect("/winner");
	}
	
	//splitting and adding individual letters of a string to an array
	tempLetterArray = newGuess.split("");


   //splitting randomWord into array
   let randomWordPlaceholder = randomWord.word.split("");

	//pushing current version alphabet into array
	for (let i = 0; i < tempLetterArray.length; i++) {
		//if the letter is in the word and in the correct space
		if(alphabet[tempLetterArray[i]][1] === "in" && tempLetterArray[i] === randomWordPlaceholder[i]){
			alphabet[tempLetterArray[i]][guesses.length + 1] = "green";
		}
		//if the letter is in the word but not in the correct space
		else if (alphabet[tempLetterArray[i]][1] === "in" && tempLetterArray[i] !== randomWord[i]){
			alphabet[tempLetterArray[i]][guesses.length + 1] = "yellow";
		}
		//if the letter is not in the word
		else {
			alphabet[tempLetterArray[i]][guesses.length + 1] = "grey"
		}
	}

	console.log(guesses);

	//adding new guess to guess array
	guessArray.push(newGuess)

	//incrementing guess number
	guessNum++;

	res.redirect("/");
});


router.get("/winner", (req, res, next) => {
	res.render("winnerPage");

	//clear the guessObjectArray
	guessObjectArray = [];

	//reset guessNum to 0 and guessNumArray to empty
	guessNum = 0;
	guessNumArray = [];

	//reset guess Array
	guessArray = [];

	//change alphabet object back to its original form
	console.log(alphabet);
});

router.get("/", (req, res, next) => {

	//run these functions everytime page reloads gets new word and clears the guesses array
	if (newGuess === randomWord.word) {
		randomWord = availWords[Math.floor(Math.random() * availWords.length)];
		guesses = [];
	}

	//split the randomWord into an array and then add the word to the alphabet and show green
	let randomWordArray = randomWord.word.split("");
	for (let i = 0; i < randomWordArray.length; i++) {
		alphabet[randomWordArray[i]][1] = "in";
	}

	console.log(alphabet);
   //this all the data that is being shared with gameboard as is is rendered
	res.render("gameboard", {
		availWords: availWords,
		randomWord: randomWord,
		guesses: guesses,
		alphabet: alphabet,
      randomWord:randomWord,
      tempLetterArray:tempLetterArray,
		guessObjectArray:guessObjectArray,
		guessNum:guessNum,
		guessNumArray:guessNumArray,
		guessArray:guessArray,
		countArray:countArray
	});
});



module.exports = router;
