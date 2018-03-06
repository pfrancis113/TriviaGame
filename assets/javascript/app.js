$("#start").on('click',function(){
    $("#start").remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset', function(){
    game.reset();
})

var questions = [ 
    { 
    question: "Who is credited with inventing the first mechanical computer?",
    answers: ["Bill Gates", "Steve Jobs", "undisclosed aliens commissioned by NASA", "Charles Babbage"],
    correctAnswer: "Charles Babbage",
    }, { 
    question:"What is the Antikythera mechanism?",
    answers: ["An ancient Greek analog computer", "A technique for sterilizing medical equipment", "A reproductive mechanism utilized by insects"],
    correctAnswer: "An ancient Greek analog computer",
    }, {
    question: "What was the first console video game that allowed the game to be saved? ",
    answers: ["The Legend of Zelda", "Super Mario Brothers", "Sonic the HedgeHog"],
    correctAnswer:"The Legend of Zelda",
}, {  
    question: "what is the Higgs-Boson?",
    answers:["An important/elementary particle in the Standard Model of particle physics ", "A quantum excitations of the Higgs field", "Helps explain why some fundamental particles have mass", "all of the above"],
    correctAnswer: "all of the above",
}, {
    question: "What part of the brain is responsible for processing emotions",
    answers: ["the amygdala", "the medulla-oblongata", "the prefrontal cortex", "none of the above"],
    correctAnswer:"the amygdala",
}, {
    question: "Louis Pasteur is credited with discovering vaccines for each of these, EXCEPT",
    answers:["Rabies", "Polio", "Anthrax", "Cholera"],
    correctAnswer: "Polio",
}, {
    question: "Which planet in our solar system has the shortest day?",
    answers: ["Saturn", "Mercury", "Jupiter", "Venus"],
    correctAnswer:"Jupiter",
}, {
    question: "What is ATP?",
    answers:["The energy currency of the cell", "A molecule that is regenerated when we digest and break down food", "A molecule that plays an important role in cellular respiration and muscle contractions", "All of the above"],
    correctAnswer: "All of the above",
},

];

var game = {
    questions: questions, 
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function(){
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter<=0){
            console.log("TIME UP");
            game.timeUp();
        }
    },

    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").html("<h2>TIME REMAINING: <span id ='counter'>30</span> seconds</h2>");
        $("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (var i=0; i<questions[game.currentQuestion].answers.length; i++){
            $("#subwrapper").append('<button class = "answer-button" id= "button- '+i+'"data-name = "' + questions[game.currentQuestion].answers[i] + '">'+ questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html("<h2>TIME IS UP!</h2>");
        $("#subwrapper").append("<h3>The correct answer was:" + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*100);
        }
    },
    results: function(){
        clearInterval(timer);
        $("#subwrapper").html("<h2>ALL DONE</h2>");
        $("#subwrapper").append("<h3>Correct: " + game.correct + "</h3");
        $("#subwrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $("#subwrapper").append("button id='reset'>RESET</button>");
    },
    
    clicked: function(e){
        console.log("clicked");
        clearInterval(timer);
        if ($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrect();
        } else {
            game.answeredIncorrect();
        }
     
    },

    answeredCorrect: function(){
        console.log("correct");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html('<h2>YOU GOT IT RIGHT!</h2>');
        if (game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*100);
        }
    
    },
    answeredIncorrect: function(){
        console.log("wrong");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html('<h2>Sorry, you got it wrong..</h2>');
        $("#subwrapper").append("<h3>The correct answer was:" + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3*100);
        }
    },
    reset: function(){
        game.currentQuestion    = 0;
        game.counter            = 30;
        game.correct            = 0;
        game.incorrect          = 0;
        game.unanswered         = 0;
        game.loadQuestion()
    },
}