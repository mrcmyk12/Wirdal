const fs = require('fs')

const path = require("path");

const express = require("express");

const router = express.Router();

//alphabet object
let alphabet = {
   "a": ["grey",""],
   "b": ["grey",""],
   "c": ["grey",""],
   "d": ["grey",""],
   "e": ["grey",""],
   "f": ["grey",""],
   "g": ["grey",""],
   "h": ["grey",""],
   "i": ["grey",""],
   "j": ["grey",""],
   "k": ["grey",""],
   "l": ["grey",""],
   "m": ["grey",""],
   "n": ["grey",""],
   "o": ["grey",""],
   "p": ["grey",""],
   "q": ["grey",""],
   "r": ["grey",""],
   "s": ["grey",""],
   "t": ["grey",""],
   "u": ["grey",""],
   "v": ["grey",""],
   "w": ["grey",""],
   "x": ["grey",""],
   "y": ["grey",""],
   "z": ["grey",""],
   
}

//creating guesses array
let guesses = []

//letters used array
let usedLettersArray = [""];

const availWords = [{"word":"about"},{"word":"above"},{"word":"abuse"},{"word":"actor"},{"word":"acute"},{"word":"admit"},{"word":"adopt"},{"word":"adult"},{"word":"after"},{"word":"again"},{"word":"agent"},{"word":"agree"},{"word":"ahead"},{"word":"alarm"},{"word":"album"},{"word":"alert"},{"word":"alike"},{"word":"alive"},{"word":"allow"},{"word":"alone"},{"word":"along"},{"word":"alter"},{"word":"among"},{"word":"anger"},{"word":"Angle"},{"word":"angry"},{"word":"apart"},{"word":"apple"},{"word":"apply"},{"word":"arena"},{"word":"argue"},{"word":"arise"},{"word":"array"},{"word":"aside"},{"word":"asset"},{"word":"audio"},{"word":"audit"},{"word":"avoid"},{"word":"award"},{"word":"aware"},{"word":"badly"},{"word":"baker"},{"word":"bases"},{"word":"basic"},{"word":"basis"},{"word":"beach"},{"word":"began"},{"word":"begin"},{"word":"begun"},{"word":"being"},{"word":"below"},{"word":"bench"},{"word":"billy"},{"word":"birth"},{"word":"black"},{"word":"blame"},{"word":"blind"},{"word":"block"},{"word":"blood"},{"word":"board"},{"word":"boost"},{"word":"booth"},{"word":"bound"},{"word":"brain"},{"word":"brand"},{"word":"bread"},{"word":"break"},{"word":"breed"},{"word":"brief"},{"word":"bring"},{"word":"broad"},{"word":"broke"},{"word":"brown"},{"word":"build"},{"word":"built"},{"word":"buyer"},{"word":"cable"},{"word":"calif"},{"word":"carry"},{"word":"catch"},{"word":"cause"},{"word":"chain"},{"word":"chair"},{"word":"chart"},{"word":"chase"},{"word":"cheap"},{"word":"check"},{"word":"chest"},{"word":"chief"},{"word":"child"},{"word":"china"},{"word":"chose"},{"word":"civil"},{"word":"claim"},{"word":"class"},{"word":"clean"},{"word":"clear"},{"word":"click"},{"word":"clock"},{"word":"close"},{"word":"coach"},{"word":"coast"},{"word":"could"},{"word":"count"},{"word":"court"},{"word":"cover"},{"word":"craft"},{"word":"crash"},{"word":"cream"},{"word":"crime"},{"word":"cross"},{"word":"crowd"},{"word":"crown"},{"word":"curve"},{"word":"cycle"},{"word":"daily"},{"word":"dance"},{"word":"dated"},{"word":"dealt"},{"word":"death"},{"word":"debut"},{"word":"delay"},{"word":"depth"},{"word":"doing"},{"word":"doubt"},{"word":"dozen"},{"word":"draft"},{"word":"drama"},{"word":"drawn"},{"word":"dream"},{"word":"dress"},{"word":"drill"},{"word":"drink"},{"word":"drive"},{"word":"drove"},{"word":"dying"},{"word":"eager"},{"word":"early"},{"word":"earth"},{"word":"eight"},{"word":"elite"},{"word":"empty"},{"word":"enemy"},{"word":"enjoy"},{"word":"enter"},{"word":"entry"},{"word":"equal"},{"word":"error"},{"word":"event"},{"word":"every"},{"word":"exact"},{"word":"exist"},{"word":"extra"},{"word":"faith"},{"word":"false"},{"word":"fault"},{"word":"fiber"},{"word":"field"},{"word":"fifth"},{"word":"fifty"},{"word":"fight"},{"word":"final"},{"word":"first"},{"word":"fixed"},{"word":"flash"},{"word":"fleet"},{"word":"floor"},{"word":"fluid"},{"word":"focus"},{"word":"force"},{"word":"forth"},{"word":"forty"},{"word":"forum"},{"word":"found"},{"word":"frame"},{"word":"frank"},{"word":"fraud"},{"word":"fresh"},{"word":"front"},{"word":"fruit"},{"word":"fully"},{"word":"funny"},{"word":"giant"},{"word":"given"},{"word":"glass"},{"word":"globe"},{"word":"going"},{"word":"grace"},{"word":"grade"},{"word":"grand"},{"word":"grant"},{"word":"grass"},{"word":"great"},{"word":"green"},{"word":"gross"},{"word":"group"},{"word":"grown"},{"word":"guard"},{"word":"guess"},{"word":"guest"},{"word":"guide"},{"word":"happy"},{"word":"harry"},{"word":"heart"},{"word":"heavy"},{"word":"hence"},{"word":"henry"},{"word":"horse"},{"word":"hotel"},{"word":"house"},{"word":"human"},{"word":"ideal"},{"word":"image"},{"word":"index"},{"word":"inner"},{"word":"input"},{"word":"issue"},{"word":"japan"},{"word":"jimmy"},{"word":"joint"},{"word":"jones"},{"word":"judge"},{"word":"known"},{"word":"label"},{"word":"large"},{"word":"laser"},{"word":"later"},{"word":"laugh"},{"word":"layer"},{"word":"learn"},{"word":"lease"},{"word":"least"},{"word":"leave"},{"word":"legal"},{"word":"level"},{"word":"lewis"},{"word":"light"},{"word":"limit"},{"word":"links"},{"word":"lives"},{"word":"local"},{"word":"logic"},{"word":"loose"},{"word":"lower"},{"word":"lucky"},{"word":"lunch"},{"word":"lying"},{"word":"magic"},{"word":"major"},{"word":"maker"},{"word":"march"},{"word":"maria"},{"word":"match"},{"word":"maybe"},{"word":"mayor"},{"word":"meant"},{"word":"media"},{"word":"metal"},{"word":"might"},{"word":"minor"},{"word":"minus"},{"word":"mixed"},{"word":"model"},{"word":"money"},{"word":"month"},{"word":"moral"},{"word":"motor"},{"word":"mount"},{"word":"mouse"},{"word":"mouth"},{"word":"movie"},{"word":"music"},{"word":"needs"},{"word":"never"},{"word":"newly"},{"word":"night"},{"word":"noise"},{"word":"north"},{"word":"noted"},{"word":"novel"},{"word":"nurse"},{"word":"occur"},{"word":"ocean"},{"word":"offer"},{"word":"often"},{"word":"order"},{"word":"other"},{"word":"ought"},{"word":"paint"},{"word":"panel"},{"word":"paper"},{"word":"party"},{"word":"peace"},{"word":"peter"},{"word":"phase"},{"word":"phone"},{"word":"photo"},{"word":"piece"},{"word":"pilot"},{"word":"pitch"},{"word":"place"},{"word":"plain"},{"word":"plane"},{"word":"plant"},{"word":"plate"},{"word":"point"},{"word":"pound"},{"word":"power"},{"word":"press"},{"word":"price"},{"word":"pride"},{"word":"prime"},{"word":"print"},{"word":"prior"},{"word":"prize"},{"word":"proof"},{"word":"proud"},{"word":"prove"},{"word":"queen"},{"word":"quick"},{"word":"quiet"},{"word":"quite"},{"word":"radio"},{"word":"raise"},{"word":"range"},{"word":"rapid"},{"word":"ratio"},{"word":"reach"},{"word":"ready"},{"word":"refer"},{"word":"right"},{"word":"rival"},{"word":"river"},{"word":"robin"},{"word":"roger"},{"word":"roman"},{"word":"rough"},{"word":"round"},{"word":"route"},{"word":"royal"},{"word":"rural"},{"word":"scale"},{"word":"scene"},{"word":"scope"},{"word":"score"},{"word":"sense"},{"word":"serve"},{"word":"seven"},{"word":"shall"},{"word":"shape"},{"word":"share"},{"word":"sharp"},{"word":"sheet"},{"word":"shelf"},{"word":"shell"},{"word":"shift"},{"word":"shirt"},{"word":"shock"},{"word":"shoot"},{"word":"short"},{"word":"shown"},{"word":"sight"},{"word":"since"},{"word":"sixth"},{"word":"sixty"},{"word":"sized"},{"word":"skill"},{"word":"sleep"},{"word":"slide"},{"word":"small"},{"word":"smart"},{"word":"smile"},{"word":"smith"},{"word":"smoke"},{"word":"solid"},{"word":"solve"},{"word":"sorry"},{"word":"sound"},{"word":"south"},{"word":"space"},{"word":"spare"},{"word":"speak"},{"word":"speed"},{"word":"spend"},{"word":"spent"},{"word":"split"},{"word":"spoke"},{"word":"sport"},{"word":"staff"},{"word":"stage"},{"word":"stake"},{"word":"stand"},{"word":"start"},{"word":"state"},{"word":"steam"},{"word":"steel"},{"word":"stick"},{"word":"still"},{"word":"stock"},{"word":"stone"},{"word":"stood"},{"word":"store"},{"word":"storm"},{"word":"story"},{"word":"strip"},{"word":"stuck"},{"word":"study"},{"word":"stuff"},{"word":"style"},{"word":"sugar"},{"word":"suite"},{"word":"super"},{"word":"sweet"},{"word":"table"},{"word":"taken"},{"word":"taste"},{"word":"taxes"},{"word":"teach"},{"word":"teeth"},{"word":"terry"},{"word":"texas"},{"word":"thank"},{"word":"theft"},{"word":"their"},{"word":"theme"},{"word":"there"},{"word":"these"},{"word":"thick"},{"word":"thing"},{"word":"think"},{"word":"third"},{"word":"those"},{"word":"three"},{"word":"threw"},{"word":"throw"},{"word":"tight"},{"word":"times"},{"word":"tired"},{"word":"title"},{"word":"today"},{"word":"topic"},{"word":"total"},{"word":"touch"},{"word":"tough"},{"word":"tower"},{"word":"track"},{"word":"trade"},{"word":"train"},{"word":"treat"},{"word":"trend"},{"word":"trial"},{"word":"tried"},{"word":"tries"},{"word":"truck"},{"word":"truly"},{"word":"trust"},{"word":"truth"},{"word":"twice"},{"word":"under"},{"word":"undue"},{"word":"union"},{"word":"unity"},{"word":"until"},{"word":"upper"},{"word":"upset"},{"word":"urban"},{"word":"usage"},{"word":"usual"},{"word":"valid"},{"word":"value"},{"word":"video"},{"word":"virus"},{"word":"visit"},{"word":"vital"},{"word":"voice"},{"word":"waste"},{"word":"watch"},{"word":"water"},{"word":"wheel"},{"word":"where"},{"word":"which"},{"word":"while"},{"word":"white"},{"word":"whole"},{"word":"whose"},{"word":"woman"},{"word":"women"},{"word":"world"},{"word":"worry"},{"word":"worse"},{"word":"worst"},{"word":"worth"},{"word":"would"},{"word":"wound"},{"word":"write"},{"word":"wrong"}]

//choosing random word from available words array
let randomWord = availWords[Math.floor(Math.random()*availWords.length)];

//split the randomWord into an array and then add the word to the alphabet and show green
let randomWordArray = randomWord.word.split("");
for (let i = 0; i < randomWordArray.length; i++){
   alphabet[randomWordArray[i]][1] = "green";
}

//creating variable to hold new guess array
let newGuess;


router.post('/', (req,res,next) =>{
   //creating variable to read request body
   newGuess = req.body.guess

   //compare newGuess to the randomWord
   if (newGuess === randomWord.word) {
      res.redirect('/winner')
   }

   //add the letters of the guess to an array
   let tempLetterArray;
   //splitting and adding individual letters of a string to an array
   tempLetterArray = newGuess.split("");
   

   //change values in the alphabet object to grey becasue the letters have been chosen
   for (let i = 0; i < tempLetterArray.length; i++){
      alphabet[tempLetterArray[i]][0] = "red";
      
   }
   

   console.log(alphabet);

   //adding new guess to the guess array
   guesses.push({ guess: newGuess });

   res.redirect('/');
})

router.get('/winner', (req,res,next) => {
   res.render('winnerPage');
})

router.get('/', (req,res,next) => {

   //run these functions everytime page reloads
   if (newGuess === randomWord.word) {
      randomWord = availWords[Math.floor(Math.random()*availWords.length)];
      guesses = [];
   }

   res.render('gameboard', {availWords: availWords, randomWord: randomWord, guesses:guesses, alphabet:alphabet})


})

module.exports = router;



