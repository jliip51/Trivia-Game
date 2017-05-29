$(document).ready(function(){

var timer = 10;
var correct = 0;
var wrong = 0;
var noAnswer = 0;
var questionindex = 0;
var intervalId;
var quiz = {
	question: ['1stQuestion', '2ndQuestion', '3rdQuestion'],
	answer: ['1stChoiceC', '2ndChoiceD', '3rdChoiceA'],
	choice1: ['1stChoiceA', '2ndChoiceA', '3rdChoiceA'],
	choice2: ['1stChoiceB', '2ndChoiceB', '3rdChoiceB'],
	choice3: ['1stChoiceC', '2ndChoiceC', '3rdChoiceC'],
	choice4: ['1stChoiceD', '2ndChoiceD', '3rdChoiceD'],
	imageCorrect: [
		'http://www.simpsoncrazy.com/content/pictures/bart/BartSimpson11.gif',
		'https://frinkiac.com/img/S15E09/348223/medium.jpg', 
		'https://frinkiac.com/img/S08E10/940088/medium.jpg'],
	imageWrong: [],
//Object function to populate questions and choices
 	populate: function() {
 		$("#question").html(this.question[questionindex])
		$("#choice1").html(this.choice1[questionindex]).attr("data-selection", this.choice1[questionindex]);
		$("#choice2").html(this.choice2[questionindex]).attr("data-selection", this.choice2[questionindex]);
		$("#choice3").html(this.choice3[questionindex]).attr("data-selection", this.choice3[questionindex]);
		$("#choice4").html(this.choice4[questionindex]).attr("data-selection", this.choice4[questionindex]);
		}
	};
//Countdown Timer Functionality
	function timerStart() {
		intervalId = setInterval(decrement, 1000);
	};

	function decrement() {
		timer--;

		$("#timer").html(timer + "s");

		if (timer === 0) {
			noAnswer++;
			timerStop();
			revealAnswer();
		}
	};

	function timerStop() {
		clearInterval(intervalId);
	};

//Onload hides content except for red button to init
$(".content").hide();
$(".reveal").hide();


	$("#init").click( function() {
		$(".content").show();
		$("#init").hide();
		$("#timer").html(timer + "s");
		quiz.populate();
		timerStart();
	});

	$(".choices").click( function() {
		var selection = ($(this).attr("data-selection"));
		console.log(selection);
		if (selection === quiz.answer[questionindex]) {
			correct++;
			revealAnswer();
			// alert("woohoo!")
		} else {
			wrong++;
			revealAnswer();
			// alert("doh!")
		}
	});

	function revealAnswer() {
		timerStop();
		$(".content").hide();
		$(".reveal").show();
		$("#answer").html("The Answer is: " + quiz.answer[questionindex]);
		$("#answer-img").html("<img src=" + quiz.imageCorrect[questionindex] + " width='400px'>");
		questionindex++
		setTimeout(nextQuestion, 5000);
	};

	function nextQuestion() {
		if (questionindex === quiz.question.length) {
			result();
			
		} else {
			timer = 10;
			$(".reveal").hide();
			$("#timer").html(timer + "s");
			$(".content").show();
			quiz.populate();
			timerStart();
		}
	};

	function result() {
		$(".reveal").hide();
		$(".result").show();
		$("#correct").html("You got " + correct + " correct");
		$("#wrong").html("You missed " + wrong + " answers");
		$("#unanswered").html("You left " + noAnswer + " questions unanswered");
		setTimeout(resetGame, 5000);
	};

	function resetGame() {
		timerStop();
		timer = 10;
		questionindex = 0;
		correct = 0;
		wrong = 0;
		noAnswer = 0;
		$(".content").hide();
		$(".reveal").hide();
		$(".result").hide();
		$("#init").show();
	};

});