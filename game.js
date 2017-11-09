
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

function print(was) {
    console.log(was);
}


function initial() {
    // wird ganz am anfang ausgeführt
    x = breite * 0.5 - $raumschiff.outerWidth() / 2;
    y = hohe * 0.8;
    $raumschiff.css('left', x);
    $raumschiff.css('bottom', y);
    $raumschiff.show(0);
    $('body').keydown(tasteGedruckt);
    $('body').keyup(tasteLosgelassen);
}


function tasteGedruckt(event) {
    // nach oben = 38
    var taste = event.which;
    print("gedrückt: " + event.which);
    if (status == status_stop) {
        status = status_running;
        startGame();
    }
    if (status == status_running) {
        if (event.which == 38) {
            print("gas gedrückt!");
            gas = 5;
        }
    }
}


function tasteLosgelassen(event) {
    // nach oben = 38
    var taste = event.which;
    print("losgelassen: " + event.which);
    if (status == status_stop) {
        status = status_running;
        startGame();
    }
    if (status == status_running) {
        console.log("am laufen!");
        if (event.which == 38) {
            print("gas losgelassen!");
            gas = ?;
        }
    }
}


function gameBerechnen() {
    // position vom raumschiff berechnen?
    // console.log('bhop')
    geschwindigkeit = geschwindigkeit - gravitation + gas;
    y = y + geschwindigkeit;
    print("geschwindigkeit: " + geschwindigkeit);
    print("position: " + y);
    $raumschiff.css('bottom', y);
}


function startGame() {
    print("starting!£!!");
    intervalId = setInterval(gameBerechnen, 100);
    $info.hide();
}



initial();
