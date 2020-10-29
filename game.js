

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
var y = 0;
var gas = 0;
var geschwindigkeit = 0;
var x = 0;
var gasX = 0;
var geschwindigkeitX = 0;
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
    print(y);
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
    print("gedrueckt: " + event.which);
    if (status == status_stop) {
        if (taste == 32) {
        status = status_running;
        startGame();
    	}
    }
    if (status == status_running) {
        if (taste == 38) {
            print("gas gedrueckt!");
            $fire.show();
            gas = level * 4;
        }
        // nach rechts = 39
        if (taste == 39) {
            print("rechts gedrueckt!");
            gasX = 10
        }
        	if (taste == 37) {
            print("links gedrueckt!");
            gasX = -10
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
            gasX = 0;
        }
        	if (taste == 37) {
            print("links losgelassen!");
            gasX = 0;
        }
    }
}


function gameBerechnen() {
    // position vom raumschiff berechnen
    // y = ?
    geschwindigkeit = geschwindigkeit - gravitation + gas;
    y = y + geschwindigkeit
    print(gasX)
    geschwindigkeitX = gasX;
    x = x + gasX
    // schauen wo wir stehen!
    if (!stopGame()) {
        $raumschiff.css('bottom', y);
        $raumschiff.css('left', x);
    }
}


// stop ja oder nein?
function stopGame() {
    var canWin = false;
    if (x <= 0 || x > breite || y > hohe) {
    	canWin = false;
    } else if (y <= 0 ) {
    	canWin = true;
    } else {
    	return false;
    }
    status = status_stop;
    print("stop game!");
    print(geschwindigkeit);
    print(maximaleLandeGeschwindigkeit);
    clearInterval(intervalId);
    $info.show();
    $raumschiff.css('bottom', 0);
    if (canWin && maximaleLandeGeschwindigkeit<=geschwindigkeit) {
        level = level + 1;
        $infoTitel.html("Gewonnen!");
        $infoText.html("Press space to play -> Level " + level);
        if (maximaleLandeGeschwindigkeit==geschwindigkeit) {
            $infoTitel.html("Knapp Gewonnen!")
        }
    } else {
        level = 1;
        $infoTitel.html("Verloren!")
        $infoText.html("Press space to play!");
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
