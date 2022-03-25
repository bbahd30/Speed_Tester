// targetted
const textbox = document.querySelector(".textbox p");
const keyboard = document.querySelector(".keyboard");
// const popup = document.querySelector(".popup .msg");
const details1container = document.querySelector(".details1container");
const WPM = document.getElementById("WPM");
const accuracy = document.getElementById("Accuracy");
const Duration = document.getElementById("Duration");
const charTyped = document.getElementById("Total Characters Typed");
const box = document.getElementById("typing_area");


// variables
let j=errors=lettersTyped=startTime=seconds=endTime=duration=secondsTaken=speed=0;

let timerStart = lastFunc = false;

textForTypingGiver = () =>
{
    let i = Math.floor(Math.random() * textParas.length);
    textParas[i].split("").forEach
    (
        char =>
        {
            let add = "<span>"+char+"</span>";
            textbox.innerHTML += add;
        }
    );
}

focusFunc = () =>
{
    document.getElementById("typing_area").onclick = () =>
    {
        keyboard.focus();
        if (j===0)
        {
            textbox.querySelector("span").setAttribute("class", "starter");
        }
        // popup.classList.add("pop-now");
    }
}
startTyping = () =>
{
    let textToType = textbox.querySelectorAll("span");
    let inputChar = keyboard.value.split("")[j];

    if (inputChar==null)
    {
        if (j>0)
        {
            textToType[j].classList.remove("next");
            j--;
            if (textToType[j].classList.contains("incorrect"))
            {
                errors--;
            }
            textToType[j].classList.remove("correct", "incorrect");
            textToType[j].setAttribute("class", "next");
            // lettersTyped++;
        }
    }
    else
    {
        // if (popup.classList.contains("pop-now"))
        // {
        //     popup.classList.remove("pop-now");
        // }
        lettersTyped++;
        if (j===0 && timerStart==false)
        {
            startTime = Date.now();
            timerStart = true;
        }
        if (j===(textToType.length-1))
        {
            endTime = Date.now();
        }
        if (inputChar===textToType[j].innerText)
        {
            textToType[j].setAttribute("class", "correct");
        }
        else
        {
            textToType[j].setAttribute("class", "incorrect");
            errors++;
        }

        if (j!==textToType.length-1)
        {
            j++;
            textToType[j].setAttribute("class", "next");
        }
        else
        {
            if (!lastFunc)
            {
                showResultsFunc();
                lastFunc=true;
            }
        }
    }
    // for current speed
    // let curSpeed=accu=0;
    // accu = Math.round((((j+1)-errors)/(j+1))*100);
    // seconds = (endTime-startTime)/1000;
    // duration = seconds/60;
    // curSpeed = Math.floor((lettersTyped/5)/duration);
    // current.querySelector(".currentAccuracy span").innerText = `${accu}%`;
    // current.querySelector(".currentWPM span").innerText = curSpeed;
}

window.addEventListener('keydown', 
(event)=>
    {
        if (event.key=="Tab")
        {
            event.preventDefault();
        }
        if (event.ctrlKey && event.key=="Backspace")
        { 
            event.preventDefault();
        }
    }
)
showResultsFunc = () =>
{    
    seconds = (endTime-startTime)/1000;
    duration = seconds/60;
    speed = Math.floor(((j+1)/5)/duration);

    // speed = Math.floor((lettersTyped/5)/duration);

    console.log(seconds);
    let unitTime=null;
    let addT = `<h4>Your speed was ${speed} words per minute...<br>Cool!</h4>`
    
    WPM.innerHTML += addT;

    accuracy.innerHTML += `<h4>You smashed ${j+1-errors} right out of ${j+1} characters...<br>Great Job!</h4>`;
    charTyped.innerHTML += `<h4>You typed total ${lettersTyped} characters...<br>Nice!</h4>`;
    details1container.setAttribute("class", "details1containervisible");
    box.classList.add("hide");
    let lineAdd = document.createElement("h4");
    lineAdd.innerText +=`You typed for ${duration.toFixed(3)} minutes.\n\nNot enough?`;
    let button = Duration.querySelector(".again");
    Duration.insertBefore(lineAdd, button);

}
// execution
textForTypingGiver();
focusFunc();
