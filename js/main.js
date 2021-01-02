
window.onload = function () {
    iniciarPartida();
}

function iniciarPartida() {

    //INICIALITZACIO D'ELEMENTS
    //mostrem div per introduir valor files i columnes
    var divFilesColumnes = document.getElementById('filesColumnes');
    divFilesColumnes.style.display = '';

    //ocultem tauler i estadistiques
    var divTauler = document.getElementById('tauler');
    divTauler.style.display = 'none';
    var divEstadistiques = document.getElementById('bloc3');
    divEstadistiques.style.display = 'none';

    //vinculem variables necessaries amb html
    var casellesTauler = document.getElementById('casellestauler');
    var taulerSolucionat = document.getElementById('taulerSolucionat');
    var totals = document.getElementById('totals');
    var descoberts = document.getElementById('descoberts');
    var estadistiques = document.getElementById('estadistiques');
    var puntuacionsmax = document.getElementById('puntuacionsmax');
    var filaDescobrir = document.getElementById('filadescobrir');
    var columnaDescobrir = document.getElementById('columnadescobrir');
    var videsPartida = document.getElementById('vides');
    var puntsPartida = document.getElementById('punts');
    var infoDescobert = document.getElementById('infodescobert');

    //declarem variables a utilitzar a dintre de l'objecte Tauler
    var valor;
    var totalcaselles, estrelles, zombis, doblarpuntuacions, meitatzombis, videsextres;
    var estrellesd, zombisd, doblarpuntuacionsd, meitatzombisd, videsextresd;
    var rcolumna, rfila, seguir;
    var imatge;
    var vides, punts, increment;
    var descobriment;
    var guanyades, perdudes, abandonades;

    var minutsinicial = 1;
    var temps, minuts, segons, temporitzador, solucio;

    var comptador = 0, compte = document.getElementById('tempsRestant');

    //localStorage.removeItem("guanyades");
    //localStorage.removeItem("perdudes");
    //localStorage.removeItem("abandonades");
    //localStorage.removeItem("puntuacio5");

    //creem l'objecte Tauler
    var Tauler = {

        casellesusuari: [],
        casellesresposta: [],

        inicialitzador: function () {

            temps = minutsinicial * 60;
            minuts = Math.floor(temps / 60);
            segons = temps % 60;

            comptador = 0;

            valor = document.getElementById("filescolumnes").value;

            //si el valor és correcte (entre 5 i 20) podem crear el tauler
            if (valor >= 5 && valor <= 20) {

                divFilesColumnes.style.display = 'none'; //ocultem l'input
                divEstadistiques.style.display = ''; //mostrem les estadistiques

                //estadistiques
                guanyades = 0, perdudes = 0, abandonades = 0;
                if (localStorage.getItem("guanyades") != null) {
                    guanyades = localStorage.getItem("guanyades");
                }
                if (localStorage.getItem("perdudes") != null) {
                    perdudes = localStorage.getItem("perdudes");
                }
                if (localStorage.getItem("abandonades") != null) {
                    abandonades = localStorage.getItem("abandonades");
                }
                estadistiques.innerHTML = "Guanyades: " + guanyades + "<br> Perdudes: " + perdudes + "<br> Abandonades: " + abandonades;

                //puntuacions maximes
                puntuacionsmax.innerHTML = "";
                for (var numfc = 5; numfc <= 20; numfc++) {
                    if (localStorage.getItem("puntuacio" + numfc) == null) {
                        localStorage.setItem("puntuacio" + numfc, 0);
                    }
                }
                for (var numfc = 5; numfc <= 20; numfc++) {
                    puntuacionsmax.innerHTML += numfc + "x" + numfc + " : " + localStorage.getItem("puntuacio" + numfc) + "<br>";
                }

                //inicialitzem els elements i preparem els que necessitarem de cada tipus
                estrellesd = 0, zombisd = 0, doblarpuntuacionsd = 0, meitatzombisd = 0, videsextresd = 0;

                totalcaselles = valor * valor;
                zombis = Math.round((totalcaselles * 25) / 100);
                estrelles = valor;
                doblarpuntuacions = 1, meitatzombis = 2, videsextres = 3;

                vides = 3, punts = 0, increment = 1;

                //inicialitzem les vides i punts de la partida
                videsPartida.innerHTML = vides;
                puntsPartida.innerHTML = punts;

                descoberts.innerHTML = "Zombis: " + zombisd + "<br> Estrelles: " + estrellesd + "<br> Doble puntuació: " + doblarpuntuacionsd + "<br> Meitat zombis: " + meitatzombisd + "<br> Vides extres: " + videsextresd;
                infoDescobert.innerHTML = "Escriu les coordenades a descobrir o bé clica a una casella";

                //TAULER DE CARA A L'USUARI
                //creem les posicions del tauler que veurà l'usuari segons numero de files i columnes
                for (var files = 0; files <= valor - 1; files++) {
                    Tauler.casellesusuari.push([]);
                }
                //emplenem el tauler amb objectes element de gespa tapada
                for (var files = 0; files <= valor - 1; files++) {
                    for (var columnes = 0; columnes <= valor - 1; columnes++) {
                        Tauler.casellesusuari[files][columnes] = new Element('g');
                    }
                }

                // TAULER RESPOSTA
                //creem les posicions del tauler resposta segons numero de files i columnes
                for (var files = 0; files <= valor - 1; files++) {
                    Tauler.casellesresposta.push([]);
                }
                //emplenem el tauler amb objectes element de gespa tapada
                for (var files = 0; files <= valor - 1; files++) {
                    for (var columnes = 0; columnes <= valor - 1; columnes++) {
                        Tauler.casellesresposta[files][columnes] = new Element('g');
                    }
                }

                //distribuim i col·loquem els elements al tauler
                //RECOMPENSES
                //vida extra
                let verticalhoritzontal1 = Math.round(Math.random() * 1); //calculem si serà vertical 1 o horitzontal 0
                if (verticalhoritzontal1 == false) { //si és vertical
                    rcolumna = Math.floor(Math.random() * (valor));
                    for (var contvidesextres = 1; contvidesextres <= videsextres; contvidesextres++) {
                        seguir = true;

                        do {
                            rfila = Math.floor(Math.random() * (valor));
                            if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                Tauler.casellesresposta[rfila][rcolumna] = new VidaExtra('v');
                                seguir = false;
                            }
                        } while (seguir == true);
                    }
                } else { //si és horitzontal
                    rfila = Math.floor(Math.random() * (valor));
                    for (var contvidesextres = 1; contvidesextres <= videsextres; contvidesextres++) {
                        seguir = true;

                        do {
                            rcolumna = Math.floor(Math.random() * (valor));
                            if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                Tauler.casellesresposta[rfila][rcolumna] = new VidaExtra('v');
                                seguir = false;
                            }
                        } while (seguir == true);
                    }
                }

                //meitat zombis
                let verticalhoritzontal2 = Math.round(Math.random() * 1); //calculem si serà vertical 1 o horitzontal 0
                if (verticalhoritzontal2 == false) { //si és vertical
                    rcolumna = Math.floor(Math.random() * (valor));
                    for (var contmeitatzombis = 1; contmeitatzombis <= meitatzombis; contmeitatzombis++) {
                        seguir = true;

                        do {
                            rfila = Math.floor(Math.random() * (valor));
                            if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                Tauler.casellesresposta[rfila][rcolumna] = new MeitatZombis('m');
                                seguir = false;
                            }
                        } while (seguir == true);
                    }
                } else { //si és horitzontal
                    rfila = Math.floor(Math.random() * (valor));
                    for (var contmeitatzombis = 1; contmeitatzombis <= meitatzombis; contmeitatzombis++) {
                        seguir = true;

                        do {
                            rcolumna = Math.floor(Math.random() * (valor));
                            if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                Tauler.casellesresposta[rfila][rcolumna] = new MeitatZombis('m');
                                seguir = false;
                            }
                        } while (seguir == true);
                    }
                }

                //doble puntuacio
                seguir = true;

                do {
                    rfila = Math.floor(Math.random() * (valor));
                    rcolumna = Math.floor(Math.random() * (valor));
                    if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                        Tauler.casellesresposta[rfila][rcolumna] = new DoblePunts('d');
                        seguir = false;
                    }
                } while (seguir == true);

                //omplim amb recompenses aleatories fins el 25% del tauler
                let totalrecompensesinicials = doblarpuntuacions + meitatzombis + videsextres;
                let restarecompenses = (Math.round((totalcaselles * 25) / 100)) - totalrecompensesinicials;
                for (var contrestarecompenses = 1; contrestarecompenses <= restarecompenses; contrestarecompenses++) {
                    tipusrecompensa = Math.round(Math.random() * 2); // 0 = vida extra, 1 = meitat zombis, 2 = doble puntuacio
                    seguir = true;

                    do {
                        rcolumna = Math.floor(Math.random() * (valor));
                        rfila = Math.floor(Math.random() * (valor));
                        if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                            switch (tipusrecompensa) {
                                case 0: //vida extra
                                    Tauler.casellesresposta[rfila][rcolumna] = new VidaExtra('v');
                                    videsextres++;
                                    break;
                                case 1: //meitat zombis
                                    Tauler.casellesresposta[rfila][rcolumna] = new MeitatZombis('m');
                                    meitatzombis++;
                                    break;
                                case 2: //doble puntuacio
                                    Tauler.casellesresposta[rfila][rcolumna] = new DoblePunts('d');
                                    doblarpuntuacions++;
                                    break;
                            }
                            seguir = false;
                        }
                    } while (seguir == true);
                }

                //ESTRELLES
                for (var contestrelles = 1; contestrelles <= estrelles; contestrelles++) {
                    seguir = true;

                    do {
                        rcolumna = Math.floor(Math.random() * (valor));
                        rfila = Math.floor(Math.random() * (valor));
                        if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                            Tauler.casellesresposta[rfila][rcolumna] = new Estrella('e');
                            console.log("estrelles: " + rfila + "-" + rcolumna);
                            seguir = false;
                        }
                    } while (seguir == true);
                }

                //ZOMBIS
                for (var contzombis = 1; contzombis <= zombis; contzombis++) {
                    seguir = true;

                    do {
                        rcolumna = Math.floor(Math.random() * (valor));
                        rfila = Math.floor(Math.random() * (valor));
                        if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                            Tauler.casellesresposta[rfila][rcolumna] = new Zombi('z');
                            console.log("zombis: " + rfila + "-" + rcolumna);
                            seguir = false;
                        }
                    } while (seguir == true);
                }

                //mostrem el nombre d'elements totals de cada tipus
                totals.innerHTML = "Zombis: " + zombis + "<br> Estrelles: " + estrelles + "<br> Doble puntuació: " + doblarpuntuacions + "<br> Meitat zombis: " + meitatzombis + "<br> Vides extres: " + videsextres

                //mostrem el contingut del tauler
                Tauler.mostrarContingut();
            }

            //si el valor introduït és incorrecte
            else {
                alert("Valor incorrecte! El número de files i columnes ha d'estar entre 5 i 20");
            }

        },

        mostrarContingut: function () {
            let width = "100px";
            let height = "100px";

            if (valor >= 10) { //si son 10 caselles o més reduim la mida de les imatges a la meitat
                width = "50px";
                height = "50px";
            }

            for (var files = 0; files <= valor - 1; files++) {
                for (var columnes = 0; columnes <= valor - 1; columnes++) {
                    imatge = Tauler.rutaImatge(files, columnes);
                    casellesTauler.innerHTML += "<button id='" + files + "-" + columnes + "' class='btcaselles'><img src='" + imatge + "' width='" + width + "' height='" + height + "'></button>";
                }
                casellesTauler.innerHTML += "<br>";
            }

            //afegim events onClick per a les diferents posicions o botons
            for (var files = 0; files <= valor - 1; files++) {
                for (var columnes = 0; columnes <= valor - 1; columnes++) {
                    document.getElementById(files + "-" + columnes).addEventListener("click", this.canviarContingut);
                }
            }

            divTauler.style.display = '';
        },

        mostrarSolucio: function () {
            let width = "100px";
            let height = "100px";

            taulerSolucionat.style.display = '';

            if (valor >= 10) { //si son 10 caselles o més reduim la mida de les imatges a la meitat
                width = "50px";
                height = "50px";
            }

            for (var files = 0; files <= valor - 1; files++) {
                for (var columnes = 0; columnes <= valor - 1; columnes++) {
                    imatge = Tauler.rutaImatgeSolucio(files, columnes);
                    taulerSolucionat.innerHTML += "<button id='" + files + "-" + columnes + "' class='btcaselles'><img src='" + imatge + "' width='" + width + "' height='" + height + "'></button>";
                }
                taulerSolucionat.innerHTML += "<br>";
            }

            solucio = setTimeout(this.solucionar, 300);


        },

        solucionar: function () {
            taulerSolucionat.style.display = 'none';
            casellesTauler.style.display = '';
            clearInterval(solucio);
        },

        rutaImatgeSolucio: function (fila, columna) { //segons contingut de l'element retorna una ruta d'imatge
            let imatge;
            switch (Tauler.casellesresposta[fila][columna].contingut) {
                case 'g':
                    imatge = "img/gespa.jpg";
                    break;
                case 'z':
                    imatge = "img/zombi.jpg";
                    break;
                case 'e':
                    imatge = "img/estrella.jpg";
                    break;
                case 'd':
                    imatge = "img/doblepuntuacio.jpg";
                    break;
                case 'm':
                    imatge = "img/meitatzombis.jpg";
                    break;
                case 'v':
                    imatge = "img/vidaextra.jpg";
                    break;
                default:
                    imatge = "img/estrella.jpg";
            }
            return imatge;
        },

        canviarContingut: function () {
            let nfila;
            let ncolumna;
            let canviarimatge = true;

            comptador += 1;
            console.log(comptador);

            if (filaDescobrir.value != "" && columnaDescobrir.value != "") {
                if (filaDescobrir.value <= valor - 1 && columnaDescobrir.value <= valor - 1) {
                    nfila = filaDescobrir.value;
                    ncolumna = columnaDescobrir.value;
                } else {
                    canviarimatge = false;
                    alert("Coordenades invàlides o fora de rang");
                }
            } else {
                let coordenades = (this.id).split("-"); //extreiem les coordenades del boto clicat
                nfila = coordenades[0];
                ncolumna = coordenades[1];
            }


            if (canviarimatge == true) {
                if (Tauler.casellesresposta[nfila][ncolumna].contingut === (Tauler.casellesresposta[nfila][ncolumna].contingut).toLowerCase()) { // si la casella no està destapada encara
                    Tauler.casellesusuari[nfila][ncolumna].contingut = Tauler.casellesresposta[nfila][ncolumna].contingut; //col·loquem l'element del tauler resposta al tauler usuari
                    Tauler.casellesresposta[nfila][ncolumna].contingut = Tauler.casellesresposta[nfila][ncolumna].contingut.toUpperCase(); //posem el contingut com a ja destapat al tauler resposta

                    switch (Tauler.casellesusuari[nfila][ncolumna].contingut) { //afegim +1 al recompte de destapats i actualitzem les dades a mostrar
                        case 'g':
                            punts = punts + (50 * increment);
                            descobriment = "gespa! +" + 50 * increment;
                            break;
                        case 'z':
                            zombisd++;
                            vides--;
                            if ((punts - 100) >= 0) {
                                punts = punts - 100;
                            }
                            descobriment = "un zombi -100";
                            break;
                        case 'e':

                            if (comptador == 1) {
                                console.log('Primer dispar estrella');
                                casellesTauler.style.display = 'none';
                                Tauler.mostrarSolucio();

                            }


                            estrellesd++;
                            punts = punts + (200 * increment);
                            descobriment = "una estrella! +" + 200 * increment;
                            break;
                        case 'd':
                            doblarpuntuacionsd++;
                            if (doblarpuntuacionsd == doblarpuntuacionsd) {
                                increment = 2;
                            }
                            descobriment = "una doble puntuacio!";
                            break;
                        case 'm':
                            meitatzombisd++;
                            if (meitatzombisd == meitatzombis) { //en cas de destapar tots els meitat zombis
                                let zombiseliminar = Math.round((zombis - zombisd) / 2); //calculem quina es la meitat dels zombis encara tapats
                                let zombiseliminats = 0;
                                for (var rfila = 0; rfila <= valor - 1 && zombiseliminats < zombiseliminar; rfila++) {
                                    for (var rcolumna = 0; rcolumna <= valor - 1 && zombiseliminats < zombiseliminar; rcolumna++) {
                                        if (Tauler.casellesresposta[rfila][rcolumna].contingut == 'z') { //intercanviem els zombis restants per gespa
                                            Tauler.casellesresposta[rfila][rcolumna].contingut = 'g';
                                            Tauler.casellesusuari[rfila][rcolumna].contingut = Tauler.casellesresposta[rfila][rcolumna].contingut;
                                            zombis--;
                                            zombiseliminats++;
                                        }
                                    }
                                }
                                totals.innerHTML = "Zombis: " + zombis + "<br> Estrelles: " + estrelles + "<br> Doble puntuació: " + doblarpuntuacions + "<br> Meitat zombis: " + meitatzombis + "<br> Vides extres: " + videsextres
                            }
                            descobriment = "un meitat de zombis!";
                            break;
                        case 'v':
                            videsextresd++;
                            if (videsextresd == videsextres) { //en cas de destapar totes les vides extres
                                vides++;
                            }
                            descobriment = "una vida extra!";
                            break;
                    }

                    infoDescobert.innerHTML = "Has descobert " + descobriment;

                    descoberts.innerHTML = "Zombis: " + zombisd + "<br> Estrelles: " + estrellesd + "<br> Doble puntuació: " + doblarpuntuacionsd + "<br> Meitat zombis: " + meitatzombisd + "<br> Vides extres: " + videsextresd;

                    let botocanviar = document.getElementById(nfila + "-" + ncolumna); //canviem la imatge de dintre del boto
                    imatge = Tauler.rutaImatge(nfila, ncolumna);
                    botocanviar.innerHTML = "<img src='" + imatge + "'>"

                    videsPartida.innerHTML = vides; //actualitzem les vides i punts de la partida
                    puntsPartida.innerHTML = punts;

                } else { //si la casella ja es troba destapada
                    alert("Aquesta casella ja ha sigut descoberta");
                }
            }

            filaDescobrir.value = "";
            columnaDescobrir.value = "";

            if (estrellesd == estrelles) {
                alert("Has guanyat!");
                Tauler.reiniciar(1);
            }

            if (vides == 0) { //si el jugador es queda sense vides
                alert("Has perdut!");
                Tauler.reiniciar(2);
            }

        },

        rutaImatge: function (fila, columna) { //segons contingut de l'element retorna una ruta d'imatge
            let imatge;
            switch (Tauler.casellesusuari[fila][columna].contingut) {
                case 'g':
                    imatge = "img/gespa.jpg";
                    break;
                case 'z':
                    imatge = "img/zombi.jpg";
                    break;
                case 'e':
                    imatge = "img/estrella.jpg";
                    break;
                case 'd':
                    imatge = "img/doblepuntuacio.jpg";
                    break;
                case 'm':
                    imatge = "img/meitatzombis.jpg";
                    break;
                case 'v':
                    imatge = "img/vidaextra.jpg";
                    break;
            }
            return imatge;
        },


        reiniciar: function (opcio) {
            // deixem tot buit / ocultem el tauler i mostrem div per introduir valor de nou
            divFilesColumnes.style.display = '';
            divTauler.style.display = 'none';
            casellesTauler.innerHTML = "";
            divEstadistiques.style.display = 'none';
            Tauler.casellesusuari = [];
            Tauler.casellesresposta = [];

            //sumem +1 a la estadistica corresponent
            if (opcio == 1) {

                localStorage.setItem("guanyades", parseInt(guanyades) + 1);
            }
            else if (opcio == 2) {

                localStorage.setItem("perdudes", parseInt(perdudes) + 1);
            }
            else {
                localStorage.setItem("abandonades", parseInt(abandonades) + 1);
            }


            videsPartida.innerHTML = 0;
            clearInterval(temporitzador);
            document.getElementById("tempsRestant").innerText = '01:00';
            compte.style.display = 'none';

            //actualitzem puntuació màxima
            if (punts > localStorage.getItem("puntuacio" + valor)) {
                localStorage.setItem("puntuacio" + valor, punts)
            }
        },

        activarTemporitzador: function () {
            compte.style.display = '';
            temporitzador = setInterval(Tauler.actualitzarTemporitzador, 1000);
        },

        actualitzarTemporitzador: function () {
            //si el temporitzador acaba de començar(1:00) o no ha finalitzat encara (no és 0:00) restem temps, recalculem minuts i segons i mostrem
            if ((minuts == 1 && segons == 0) || !(minuts == 0 && segons == 0)) {
                temps--;
                minuts = Math.floor(temps / 60);
                segons = temps % 60;
                document.getElementById("tempsRestant").innerText = minuts + " : " + (segons < 10 ? '0' + segons : segons);
            }
            //fem que si el comptador arriba a 0:00 actui com una derrota
            if (minuts == 0 && segons == 0) {
                videsPartida.innerHTML = 0;
                clearInterval(temporitzador);
                document.getElementById("tempsRestant").innerText = '01:00';
                compte.style.display = 'none';
                Tauler.reiniciar(2);
            }

        }

    };

    //afegim onclick per al button jugar, descobrir i abandonar
    document.getElementById("juga").addEventListener("click", Tauler.inicialitzador);
    document.getElementById("descobrir").addEventListener("click", Tauler.canviarContingut);
    document.getElementById("abandonar").addEventListener("click", Tauler.reiniciar);
    document.getElementById("temporizador").addEventListener("click", Tauler.activarTemporitzador);


}


