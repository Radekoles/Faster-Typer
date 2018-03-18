$('div.button2').click(function() {

    //creating a pop up and its elements
    const circle = $('<div>').addClass('circle');
    const content = $('<h1>').addClass('show');
    content.text('Start');
    const scoreShow = $('<div>').addClass('scoreShow');
    const close = $('<div>').addClass('close').text('X');
    const text = $('<p>').addClass('txt').text('Click enter to start');
    const progressBar = $('<div>').addClass('progress').attr('id', 'progress');
    const popUp = $('<div>').addClass('popUp');
    $('body').append(popUp);
    $(popUp).append(scoreShow,circle,close,text,progressBar);
    $(circle).append(content);
     
    //closing game
    $('div.close').click(function () {
        let field = $(popUp);
       field.remove(); 
    });
    
    //starting a game
    function start() {
        
    $(document).keyup(function (e) {
        e.preventDefault();
        let end = false;
        let alfabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','U','P','R','S','T','U','W','Y','X','Q','Z','1','2','3','4','5','6','7','8','9','0'];
               if(e.keyCode === 13) {
                   text.text(" ");
                   $(document).off('keyup');
                   
                    let number = 3;
                    let score = 0;
                   
                    content.text(number);
                   
                   //count down the counter 3, 2, 1... 
                    let countDown = setInterval(function () {
                        number--;
                        content.text(number);
                        if (number <= 0) {
                            clearInterval(countDown);
                            generates();
                            let seconds = 15;
                            let circle = new ProgressBar.Circle('#progress', {
                                duration: 15000,
                                strokeWidth: 3,
                                from: { color: '#4bf442' },
                                to: { color: '#f44441' },
                                step: function(state, circle, attachment) {
                                circle.path.setAttribute('stroke', state.color);
                                },
                                easing: 'linear'
                            });
                            circle.animate(1);
                            //liczy czas 15...0
                            let time = setInterval(function () {
                                seconds--;
                                if (seconds <= 0) {
                                    //koniec gry
                                    clearInterval(time);
                                    restart();
                                } 
                            }, 1000);
                        } 
                    }, 1000);
                   
                    let generates = function () { 
                        if (end === false) {
                            let random = Math.floor(Math.random()*36);
                            let letter = alfabet[random];
                            content.text(letter);
                        $(document).keypress(function (e) {
                            
                          let pressedValue = String.fromCharCode(e.keyCode);
                           if (pressedValue.toUpperCase() === letter) {
                                score += 1;
                               $(document).off('keypress');
                               generates();
                           }
                            else {
                                if (end === false) {
                                    content.addClass('error');
                                setTimeout(function () {
                                    content.removeClass('error');
                                },200);
                                }
                            }
                        });
                        }
                    }   
                    var restart = function () {
                        
                        text.text('Click enter to refresh');
                        end = true;
                        content.text('Finish');
                        scoreShow.text('Your score: '+score);
                        $('#progress').html('');
                        
                        $(document).keyup(function (e) {
                           e.preventDefault();
                            if(e.keyCode === 13) {
                                scoreShow.empty();
                                content.text('Start');
                                text.text('Click enter to start');
                                start();
                            }
                        });
                    }
               } 
           });
    }
    //invoking start function
    start();
 });