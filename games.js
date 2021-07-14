var gamePattern=[];
var buttonColours= ["red", "blue", "green", "yellow"];
var level=0;
var index=-1;
function playSound(name){
    new Audio("sounds/"+name+".mp3").play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    index++;
    if(index>level-1)
    wrong();
    else {
        if(gamePattern[index]===userChosenColor)
        {
            if(index===level-1)
            {
                index=-1;
                setTimeout(nextSequence,1000);
            }
        }
        else
        wrong();
}
});

$(document).keydown(function(){
    if(level===0)
    nextSequence();
});

function wrong(){
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level=0;
    index=-1;
    gamePattern.length=0;
}
