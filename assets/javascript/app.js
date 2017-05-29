$(document).ready(function(){

var timer = 10;
var correct = 0;
var wrong = 0;
var noAnswer = 0;
var questionindex = 0;
var intervalId;
var quiz = {
	question: ['What does the phone number to Moes Tavern spell?', 'Who was the first celebrity to play as themself on The Simpsons?', '3rdQuestion', '4thQuestion', '5thQuestion', '6thQuestion', '7thQuestion', '8thQuestion', '9thQuestion', '10thQuestion'],
	answer: ['C: S-M-I-T-H-E-R-S', 'B: Tony Bennett', '3rdChoiceA', '4thChoiceC', '5thChoiceD', '6thChoiceA', '7thChoiceC', '8thChoiceD', '9thChoiceA', '10thChoiceD'],
	choice1: ['A: L-O-V-E D-U-F-F', 'A: Elizabeth Taylor', '3rdChoiceA','4thChoiceA', '5thChoiceA', '6thChoiceA', '7thChoiceA', '8thChoiceA', '9thChoiceA', '10thChoiceA'],
	choice2: ['B: M-O-E-R-O-C-K-S', 'B: Tony Bennett', '3rdChoiceB','4thChoiceB', '5thChoiceB', '6thChoiceB', '7thChoiceB', '8thChoiceB', '9thChoiceB', '10thChoiceB'],
	choice3: ['C: S-M-I-T-H-E-R-S', 'C: Mick Jagger', '3rdChoiceC','4thChoiceC', '5thChoiceC', '6thChoiceC', '7thChoiceC', '8thChoiceC', '9thChoiceC', '10thChoiceC'],
	choice4: ['D: I-M-B-A-R-N-E-Y', 'D: Phil Hartman', '3rdChoiceD','4thChoiceD', '5thChoiceD', '6thChoiceD', '7thChoiceD', '8thChoiceD', '9thChoiceD', '10thChoiceD'],

	imageCorrect: ['assets/images/correct1.gif', 'assets/images/correct2.gif', 'assets/images/correct3.gif', 'assets/images/correct4.gif', 'assets/images/correct5.gif', 
		'assets/images/correct6.gif', 'assets/images/correct7.gif', 'assets/images/correct8.gif', 'assets/images/correct9.gif', 'assets/images/correct10.gif'],
	imageWrong: ['assets/images/wrong1.jpg', 'assets/images/wrong2.gif', 'assets/images/wrong3.gif', 'assets/images/wrong4.gif', 'assets/images/wrong5.gif', 
		'assets/images/wrong6.gif', 'assets/images/wrong7.gif', 'assets/images/wrong8.gif', 'assets/images/wrong9.gif', 'assets/images/wrong10.gif'],

 	populate: function() {
 		$("#question").html(this.question[questionindex])
		$("#choice1").html(this.choice1[questionindex]).attr("data-selection", this.choice1[questionindex]);
		$("#choice2").html(this.choice2[questionindex]).attr("data-selection", this.choice2[questionindex]);
		$("#choice3").html(this.choice3[questionindex]).attr("data-selection", this.choice3[questionindex]);
		$("#choice4").html(this.choice4[questionindex]).attr("data-selection", this.choice4[questionindex]);
		}
	};

	function timerStart() {
		intervalId = setInterval(decrement, 1000);
	};

	function decrement() {
		timer--;
		$("#timer").html(timer + "s");

		if (timer === 0) {
			noAnswer++;
			timerStop();
			revealWrong();
		}
	};

	function timerStop() {
		clearInterval(intervalId);
	};

//Onload hides content except for red button to start and loads audio
$("#warn").hide();
$(".content").hide();
$(".reveal").hide();
$("#warning").trigger('load');
$("#theme").trigger('load');
$("#wahoo").trigger('load');
$("#doh").trigger('load');

	$("#init").click( function() {
		$("#warning").trigger('play');
		$("#init").hide();
		$("#warn").show();
		$("#timer").html(timer + "s");

		setTimeout(function() {
			$(".title").hide();
			$("#warn").hide();
			$(".content").show();
			$("#warning").trigger('pause');
			$("#theme").trigger('play')
			quiz.populate();
			timerStart();
		}, 6000);
	});

	$(".choices").click( function() {
		var selection = ($(this).attr("data-selection"));

		if (selection === quiz.answer[questionindex]) {
			correct++;
			revealCorrect();
		} else {
			wrong++;
			revealWrong();
		}
	});

	function revealCorrect() {
		$("#wahoo").trigger('play');
		timerStop();
		$("#answer").html("WOOHOO! " + quiz.answer[questionindex] + " is the correct answer!");
		$("#answer-img").html("<img src=" + quiz.imageCorrect[questionindex] + " width='400px'>");
		revealAnswer();
	};

	function revealWrong() {
		$("#doh").trigger('play');
		timerStop();
		$("#answer").html("DOH! " + quiz.answer[questionindex] + " was the right answer.");
		$("#answer-img").html("<img src=" + quiz.imageWrong[questionindex] + " width='400px'>");
		revealAnswer();
	};

	function revealAnswer() {
		$(".content").hide();
		$(".reveal").show();
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
		$("#correct").html("Cowabunga! You got " + correct + " correct!");
		$("#wrong").html("Oops. You got " + wrong + " wrong :(");
		$("#unanswered").html("Hmm... You left " + noAnswer + " unanswered.");
		setTimeout(resetGame, 5000);
	};

	function resetGame() {
		timerStop();
		$("#theme").trigger('pause');
		timer = 10;
		questionindex = 0;
		correct = 0;
		wrong = 0;
		noAnswer = 0;
		$(".content").hide();
		$(".reveal").hide();
		$(".result").hide();
		$(".title").show();
		$("#init").show();
		$("#theme").trigger('load');
		$("#warning").trigger('load');
	};

});