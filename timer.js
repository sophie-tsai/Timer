let minutesElement = document.querySelector('#minutes');
let isCountingDown = false;
let wasBreakFinished = true;
let breakAlarmSounding = false;

function decrease(selector){
	const element = document.querySelector(selector);
	let elementString = element.innerHTML;
	let elementNum = parseInt(elementString);
	if(elementNum <= 1){
		element.innerHTML = 1;
	} else {
		elementNum--;
		element.innerHTML = elementNum;
	}
	//match the session length to timer if timer is not counting down
	if(selector === '#sessionNumber'){
		if (isCountingDown === false)
		{desiredSession = parseInt(sessionLengthElement.innerText);
		 minutesElement.innerText = desiredSession;
		}
	}
}

function increase(selector){
	const element = document.querySelector(selector);
	let elementString = element.innerHTML;
	let elementNum = parseInt(elementString);
	if(elementNum >= 999){
		element.innerHTML = 999;
	} else {
		elementNum++;
		element.innerHTML = elementNum;
	}
	//match the session length to timer if timer is not counting down
	if(selector === '#sessionNumber'){
		if (isCountingDown === false)
		{
			desiredSession = parseInt(sessionLengthElement.innerText);
			minutesElement.innerText = desiredSession;
		}
	}
}

//grabs the seconds element
const countdown = document.querySelector('#seconds');

let startTimer;
let countdownTimer = document.querySelector('#sessionCountdown');

function timer(){

	//decrement the value and update UI
	startTimer = setInterval(function(){
		let countdownString = countdown.innerText;
		//converts the string into number
		let countdownNum = parseInt(countdownString);

		//if seconds is 00, it goes to 59 and decrements
		if (countdownNum > 0){
			countdownNum--;
		} else if (countdownNum === 00){
			countdownNum = 59;
			if (minutesElement.innerText > 0) {
				minutesElement.innerText = minutesElement.innerText - 1;
			}
		};

		if (countdownNum < 10 && countdownNum >=0){
			countdownNum = "0" + countdownNum;
		};

		if (minutesElement.innerText == 0){
			minutesElement.innerText = "00"
		};

		countdown.innerText = countdownNum;

		if(countdown.innerText == "00" && minutesElement.innerText == "00"){
			soundAlarm();
			toggleWasBreakFinished();
			countdownTimer.style.color = "red";
			clearInterval(startTimer);
			
			setTimeout(function(){
				stopAlarm();
				breakTimer();
			}, 2500);
		} else {
			countdownTimer.style.color = "black";
		}
	}, 1000);

}

//converts the minutes string into number, sets it to variable
let minutesNumber = parseInt(minutesElement.innerText);
//grabs the desired session length element
const sessionLengthElement = document.querySelector('#sessionNumber');
//converts the desired session lenght and converts into number, sets it to variable
let desiredSession = parseInt(sessionLengthElement.innerText);


function reset(){
	if(breakAlarmSounding === true){
		return;
	}
	if(wasBreakFinished === true){
	//converts the desired session lenght and converts into number, sets it to variable
	desiredSession = parseInt(sessionLengthElement.innerText);
	//sets the current session timer with the desigred session time
	minutesElement.innerText = desiredSession;
	} else {
		const breakTime = document.querySelector('#breakNumber').innerText;	
		minutesElement.innerText = breakTime;
	}
	countdown.innerText = "00";
}


//changes the icon between play and pause
function toggleTimer(){
	if(breakAlarmSounding === true){
		return;
	}
	
	const playIcon = document.querySelector('#play');
	//sets the classes for play/pause
	const pauseClass = "fas fa-pause";
	const playClass = "fas fa-play";
	
	if(playIcon.className === playClass){
		//changes the play icon to pause and starts the timer
		playIcon.className = pauseClass;
		isCountingDown = true;
		timer();
	}
	else{
		//changes the pause icon to play and stops the timer
		playIcon.className = playClass;
		clearInterval(startTimer);
		isCountingDown = false;
	}
}

let timesUp = new Audio('http://soundbible.com/grab.php?id=2197&type=mp3')
function soundAlarm(){
	timesUp.play();
	breakAlarmSounding = true;
}

function stopAlarm(){
	timesUp.pause();
	breakAlarmSounding = false;
}


function breakTimer(){
//break was just finished, now on session
	if(wasBreakFinished === true){
		minutesElement.innerText = document.querySelector('#sessionNumber').innerText;
		
		
		//session was finished, now on break
	} else { 
		const breakTime = document.querySelector('#breakNumber').innerText;	
		minutesElement.innerText = breakTime;
		
	}
timer();
}

function toggleWasBreakFinished(){
	if(wasBreakFinished === true){
		wasBreakFinished = false;
	} else {
		wasBreakFinished = true;
	}
	
}