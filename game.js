
var status_stop = "stopped";
var status_running = "running";
var status = status_stop;

// elemente
var $info = $('.info');
var $infoTitel = $info.find('h1');
var $infoText = $info.find('p');
var $raumschiff = $('.raumschiff');

// berechnen
var hohe = $('body').innerHeight();
var breite = $('body').innerWidth();
// werte
var gravitation = 1;
var gas = 0;
var geschwindigkeit = 0;
var maximaleLandeGeschwindigkeit = 10;
var intervalId;
var level = 1;

/*
Aufgaben
--------
- Text ausblenden beim starten
- GAAAAASS implementieren
- merken, wann das Raumschiff "am Boden" ankommt?
- game stoppen, wenn gelandet
- schauen ob das Raumschiff ganz bleibt?
 */


function initial() {
    // wird ganz am anfang ausgeführt
    x = breite * 0.5 - $raumschiff.outerWidth() / 2;
    y = hohe * 0.8;
    $raumschiff.css('left', x);
    $raumschiff.css('bottom', y);
    $raumschiff.show(0);
    $('body').keydown(tasteGedruckt)
}


function tasteGedruckt(event) {
    console.log(event.which);
    if (event.which == 20) {
        console.log("gas!");
    }
    if (status == status_stop) {
        status = status_running;
        startGame();
    }
    if (status == status_running) {
        console.log("am laufen!");
    }
}


function gameBerechnen() {
    // position vom raumschiff berechnen?
    // console.log('bhop')
    geschwindigkeit = geschwindigkeit - gravitation + gas;
    y = y + geschwindigkeit;
    $raumschiff.css('bottom', y);
}


function startGame() {
    console.log("starting!£!!");
    intervalId = setInterval(gameBerechnen, 20);
}


initial();
