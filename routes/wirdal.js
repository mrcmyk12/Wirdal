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

//creating array to hold word library
let availableWordsArray = [];

//creating objects to hold a snapshot of guess arrays
let guessObjectArray = [];

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

//adding availwords to array in order to see if our newGuess is a part of the allowed words
availWords.forEach((element) => {
	availableWordsArray.push(element.word)
})

//creating variable to hold new guess array
let newGuess;

//creating a counting array for iterating
let countArray = [2,3,4,5,6,7]

//create arrays for holding green, yellow, and grey letters
let greenLetters = [];
let greyLetters = [];
let yellowLetters = [];

router.post("/", (req, res, next) => {
	//creating variable to read request body
	newGuess = req.body.guess;

	//determine if new guess is an actual word
	if (availableWordsArray.includes(newGuess) == false || newGuess.length < 5){
		res.redirect("/wrong");
		return;
	}

	console.log(availableWordsArray);
	

			//pushing newGuess into guess array
		guesses.push(newGuess)

		//compare newGuess to the randomWord
		if (newGuess === randomWord.word) {
			res.redirect("/winner");
		}


		//splitting and adding individual letters of the new guess into an array
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

		//adding letters to the colored letters array
		for (let i = 0; i < tempLetterArray.length; i++){
			if (alphabet[tempLetterArray[i]][guessNum + 2] == "green") {
				greenLetters.push(tempLetterArray[i]);
			}
			else if (alphabet[tempLetterArray[i]][guessNum + 2] == "yellow"){
				yellowLetters.push(tempLetterArray[i]);
			}
			else {
				greyLetters.push(tempLetterArray[i])
			}
		}

		console.log("grey letters", greyLetters);
		console.log("green letters", greenLetters);
		console.log("yellow letters", yellowLetters);

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

router.get("/wrong", (req,res,next) => {

	

	//this all the data that is being shared with gameboard as is is rendered
	res.render("wrong_gameboard", {
		
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
		countArray:countArray,
		greenLetters: greenLetters,
		greyLetters: greyLetters,
		yellowLetters: yellowLetters
	});
})

router.get("/", (req, res, next) => {

	//check if guessNum is 0, if it is reset the alphabet object
	console.log(guessNum)
	if (guessNum === 0) {
		alphabet = {
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

		//clearing the colored letters array
		greyLetters = [];
		yellowLetters = [];
		greenLetters = [];
	}

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

	//testing dom selection

	if (typeof document !== 'undefined'){
		const testButton = document.querySelector('#test');
		testButton.addEventListener('click', ()=>{
			console.log("test")
		})	

	}

	//console.log(alphabet);
	console.log(randomWord);



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
		countArray:countArray,
		greenLetters: greenLetters,
		greyLetters: greyLetters,
		yellowLetters: yellowLetters
	});
});



module.exports = router;
