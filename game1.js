$('div.button1').click(function() {
    
//creating a pop up and its elements
const text = $('<input>').attr('type','text').addClass('text').prop('disabled', true);
const time = $('<p>').addClass('timer').text('00:00');
const comment = $('<p>').addClass('comment').text('Click spacebar to start.');
const close = $('<div>').addClass('close').text('X');
const count_element = $('<h1>').addClass('counter');
const popUp = $('<div>').addClass('popUp');
$('body').append(popUp);
    
$(popUp).append(count_element,text,time,comment,close);

let tiles;
let tiles_value = "";
let sec = 0, mili = 0;
let flag = false;
let alfabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','u','p','r','s','t','u','w','y','x','q','z','1','2','3','4','5','6','7','8','9','0'];
    
    //closing
    $('div.close').click(function () {
        $(document).off('keyup');
        $(popUp).remove();
    });
    
//generating random letters 
function generate () {
    for (let i=0; i<10; i++) {
        let one_tile = $('<div>').addClass('tile');
        $(popUp).prepend(one_tile);
    }
     tiles = $('div.tile');
    for (let i=0; i<tiles.length; i++) {
    let actual_random = Math.floor(Math.random()*36);
        tiles.eq(i).text(alfabet[actual_random].toUpperCase());
        tiles_value += tiles.eq(i).text();
    }
    text.prop('disabled', false);
    text.focus();
    //timer
    let timer = setInterval(function () {
          mili++;
          if (mili<10) time.text(sec+':0'+mili); 
          else  time.text(sec+':'+mili);
          if (mili === 99) {
               mili=0; 
               sec++;
          }
        if (flag) clearInterval(timer);
    },10);  
    //changing letters into caps
    $(document).keyup(function () { 
        text.val(text.val().toUpperCase()); 
    });
    check();
}
//counting down
function counter () {
        let number = 3;
    count_element.text(number);
    $('div.popUp').prepend(count_element);
    let myCounter = setInterval(function () {
        number--;
        count_element.text(number);
        if (number<=0) {
            count_element.remove();
            generate();
            clearInterval(myCounter);
        } 
    },1000);
}
//checking propriety
function check () {
    $(document).keyup(function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            let text_value = text.val();
            if (text_value === tiles_value) {
                flag = true;
                text.prop('disabled', true);
                text.addClass('win');
                comment.text("Click spacebar to refresh.");
                $(document).off('keyup');
                $(document).keyup(function (event) {
                    event.preventDefault();
                    if (event.keyCode === 32) {
                        comment.text("Click spacebar to start.");
                        restart_game();
                    } 
                });
            } else {
                text.addClass('error');
                setTimeout(function () {
                    text.removeClass('error');
                },500);
              } 
        }
    });
}
//starting game
function start () {
        $(document).keyup(function (event) {
            event.preventDefault();
            if(event.keyCode === 32) {
                counter();
                comment.text("Finish typing with enter key.");
                $(document).off('keyup');
            }
        });
}
//restarting game
function restart_game () {
    text.removeClass('win');
    text.val('');
    tiles_value = "";
    text.prop('disabled', true);
    count_element.text('');
    $(popUp).prepend(count_element);
    time.text('00:00');
    sec = 0;
    mili = 0;
    flag = false;
    tiles.remove();
    start();
}
//invoking start function
    start();
 });