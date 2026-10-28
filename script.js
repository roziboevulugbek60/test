let inputs = document.querySelectorAll("input[data-answer]");

let time = 300;

let timer = null;

let running = false;

let playerName = "";



// BOSHLASH

function startGame(){


    playerName = document.getElementById("playerName").value;


    if(playerName.trim() === ""){

        alert("Ism va familiyangizni kiriting!");

        return;

    }



    document.getElementById("startPage").style.display = "none";


    document.getElementById("gamePage").style.display = "block";



    startTimer();


}




// VAQT

function startTimer(){


    if(running){

        return;

    }


    running = true;



    timer = setInterval(function(){



        let minutes = Math.floor(time / 60);

        let seconds = time % 60;



        document.getElementById("timer").innerHTML =

        String(minutes).padStart(2,"0") + ":" +

        String(seconds).padStart(2,"0");




        if(time <= 0){


            clearInterval(timer);

            running = false;


            alert("⏰ Vaqt tugadi!");

            check();


        }



        time--;



    },1000);



}





// PAUZA

function pauseGame(){


    clearInterval(timer);

    running = false;


}





// QAYTA BOSHLASH

function restartGame(){


    location.reload();


}





// AVTOMATIK KEYINGI KATAK

inputs.forEach((input,index)=>{


    input.addEventListener("input",function(){


        this.value = this.value.toUpperCase();



        if(this.value.length === 1){


            if(index + 1 < inputs.length){

                inputs[index+1].focus();

            }


        }



    });





    input.addEventListener("keydown",function(e){



        if(e.key === "Backspace" && this.value === ""){


            if(index > 0){

                inputs[index-1].focus();

            }


        }



    });



});







// TEKSHIRISH

function check(){


    clearInterval(timer);


    let correct = 0;



    inputs.forEach(input=>{


        if(input.value === input.dataset.answer){


            input.style.background = "lightgreen";


            correct++;


        }

        else{


            input.style.background = "#ffb3b3";


        }



    });





    let ball = Math.round(

        (correct / inputs.length) * 10

    );





    let baho;



    if(ball >= 9){

        baho = "A’lo ⭐⭐⭐⭐⭐";

    }

    else if(ball >= 7){

        baho = "Yaxshi ⭐⭐⭐⭐";

    }

    else if(ball >= 5){

        baho = "Qoniqarli ⭐⭐⭐";

    }

    else{

        baho = "Qoniqarsiz ⭐";

    }






    document.getElementById("result").innerHTML = `


    <div class="result-box">


    👤 O‘yinchi:
    <b>${playerName}</b>


    <br><br>


    🏆 To‘g‘ri javoblar:
    <b>${correct}/${inputs.length}</b>


    <br><br>


    🎯 Ball:
    <b>${ball}/10</b>


    <br><br>


    📚 Baho:
    <b>${baho}</b>


    </div>


    `;



}