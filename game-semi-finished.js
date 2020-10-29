
var status_stop = "stopped";
var status_running = "running";
var status = status_stop;

// elemente
var $info = $('.info');
var $infoTitel = $info.find('h1');
var $infoText = $info.find('p');
var $raumschiff = $('.raumschiff');
var $fire = $raumschiff.find('.feuer');

// berechnen
var hohe = $('body').innerHeight();
var breite = $('body').innerWidth();

// werte
var intervalZeit = 50;
var gravitation = 1;
var gas = 0;
var geschwindigkeit = 0;
var maximaleLandeGeschwindigkeit = -10;
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


function raumschiffPosition() {
    x = breite * 0.5 - $raumschiff.outerWidth() / 2;
    y = hohe * 0.8;
    $raumschiff.css('left', x);
    $raumschiff.css('bottom', y);
    $raumschiff.show(0);
}


function initial() {
    // wird ganz am anfang ausgeführt
    raumschiffPosition();
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
        if (taste == 38) {
            print("gas gedrückt!");
            $fire.show();
            gas = level *4;
        }
        // nach rechts = 39
        if (taste == 39) {
            print("rechts gedrückt!");
            gasRechts = 5
        }
    }
}

function tasteLosgelassen(event) {
    // nach oben = 38
    var taste = event.which;
    print("losgelassen: " + event.which);
    if (status == status_running) {
        print("am laufen!");
        if (taste == 38) {
            print("gas losgelassen!");
            $fire.hide()
            gas = 0;
                                                                                                    }
        if (taste == 39) {
            print("rechts losgelassen!");
            gasRechts = 0;
        }
    }
}


function gameBerechnen() {
    // position vom raumschiff berechnen?
    // console.log('bhop')
    geschwindigkeit = geschwindigkeit - gravitation + gas;
    y = y + geschwindigkeit;
    // print("geschwindigkeit: " + geschwindigkeit);
    // print("position: " + y);
    if (y <= 0) {
        stopGame();
    } else {
        $raumschiff.css('bottom', y);
    }
}


function stopGame() {
    status = status_stop;
    print("stop game!");
    print(geschwindigkeit);
    print(maximaleLandeGeschwindigkeit);
    clearInterval(intervalId);
    $info.show();
    $raumschiff.css('bottom', 0);
    if (maximaleLandeGeschwindigkeit<=geschwindigkeit) {
        level = level + 1;
        $infoTitel.html("Gewonnen!");
        $infoText.html("Level " + level);
    } else {
        level = 1;
        $infoTitel.html("Verloren!")
        $infoText.html("Any key to restart!");
    }
    if (maximaleLandeGeschwindigkeit==geschwindigkeit) {
        $infoTitel.html("Knapp Gewonnen!")
    }
}


function startGame() {
    print("starting!£!!");
    raumschiffPosition();
    geschwindigkeit = 0;
    gravitation = level;
    $info.hide();
    intervalId = setInterval(gameBerechnen, intervalZeit);
}



initial();
