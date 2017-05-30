$(document).ready(function() {

var timer = 10;
var correct = 0;
var wrong = 0;
var noAnswer = 0;
var questionindex = 0;
var intervalId;
var quiz = {
	question: ['What does the phone number to Moes Tavern spell?', 'Who was the first celebrity to play as themself on The Simpsons?', 'Where did Homer get his alter ego nickname, Max Powers?', 
			'In The Treehouse of Horrors 10, what rocker narrates the "Legend of Batterface"?', 'When Moe mistook Marge for a prank caller, what was the name she used?', 'Who is the only character on The Simpsons that has five fingers?', 
			'What does Smithers like to collect?', 'Which band did NOT appear in Hullabalooza?', 'Who ran over Snowball I?', 'Who sang Happy Birthday to Mr. Burns?'],
	answer: ['S-M-I-T-H-E-R-S', 'Tony Bennett', 'A hairdryer', 'Alice Cooper', 'Elvis Jagger Abdul-Jabbar', 
			'God', 'Malibu Stacey Dolls', 'Hole', 'Clovis Quimby', 'The Ramones'],
	choice1: ['L-O-V-E D-U-F-F', 'Elizabeth Taylor', 'The mayor gave it to him','Ozzy Osborne','Amanda Hugginkiss', 
			'God', 'Vintage Driving Gloves', 'Hole', 'Ned Flanders', 'Marilyn Monroe'],
	choice2: ['M-O-E-R-O-C-K-S', 'Tony Bennett', 'A battery', 'Slash', 'Elvis Jagger Abdul-Jabbar',
			'Elton John', 'Rare British Pence', 'Cypress Hill', 'Chief Wiggum', 'The Ramones'],
	choice3: ['S-M-I-T-H-E-R-S', 'Mick Jagger', 'A famous weightlifter','Alice Cooper', 'Edgar Van Hoover Poe', 
			'Bleeding Gums Murphy', 'Krusty Burger Toys', 'Sonic Youth', 'Homer', 'Lisa Simpson'],
	choice4: ['I-M-B-A-R-N-E-Y', 'Phil Hartman', 'A hairdryer','Steven Tyler', 'Seymour Butz', 
			'Brett Farve', 'Malibu Stacey Dolls', 'Smashing Pumpkins', 'Clovis Quimby', '50 Cent'],

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

$(".content").hide();
$(".reveal").hide();
$("#warn").hide();
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
			grades();
			
		} else {
			timer = 10;
			$(".reveal").hide();
			$("#timer").html(timer + "s");
			$(".content").show();
			quiz.populate();
			timerStart();
		}
	};

	function grades() {
		if (correct >= 8) {
		 	$("#grades").html("A+");
		} 
		else if ((correct <= 7) && (correct >= 5)) {
			$("#grades").html("B");
		} 
		else if (correct <= 4) {
			$("#grades").html("F (Ha ha!)"); 
		} 
	};

	function result() {
		$(".reveal").hide();
		$(".result").show();
		$("#correct").html("Correct Answers = " + correct);
		$("#wrong").html("Wrong Answers = "+ wrong);
		$("#unanswered").html("Not Answered = " + noAnswer);
		setTimeout(resetGame, 6000);
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