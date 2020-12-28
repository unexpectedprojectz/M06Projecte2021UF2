
window.onload = function () {
    inicialitzacio();
}

function inicialitzacio() {
    //mostrem input i button
    divFilesColumnes = document.getElementById('filesColumnes');
    divFilesColumnes.style.display = '';

    //ocultem tauler, estadistiques/altres
    divTauler = document.getElementById('tauler');
    divTauler.style.display = 'none';

    divEstadistiques = document.getElementById('estadistiques');
    divEstadistiques.style.display = 'none';
    document.getElementById("juga").addEventListener("click", iniciarPartida);

    //vinculem variables necessaries amb html
    casellesTauler = document.getElementById('casellestauler');
    totals = document.getElementById('totals');
    descoberts = document.getElementById('descoberts');
    filaDescobrir = document.getElementById('filadescobrir');
    columnaDescobrir = document.getElementById('columnadescobrir');
    videsPartida = document.getElementById('vides');
    puntsPartida = document.getElementById('punts');
    infoDescobert = document.getElementById('infodescobert');
}

function iniciarPartida() {

    var valor = document.getElementById("filescolumnes").value;

    //si el valor és correcte (entre 5 i 20) podem crear el tauler
    if (valor >= 5 && valor <= 20) {

        divFilesColumnes.style.display = 'none'; //ocultem l'input
        divEstadistiques.style.display = ''; //mostrem les estadistiques

        //inicialitzem els elements i preparem els que necessitarem de cada tipus
        let totalcaselles, estrelles, zombis, doblarpuntuacions, meitatzombis, videsextres;
        let estrellesd = 0, zombisd = 0, doblarpuntuacionsd = 0, meitatzombisd = 0, videsextresd = 0;
        
        totalcaselles = valor * valor;
        zombis = Math.round((totalcaselles * 25) / 100);
        estrelles = valor;
        doblarpuntuacions = 1, meitatzombis = 2, videsextres = 3;

        let rcolumna, rfila, seguir;
        let imatge;

        let vides = 3, punts = 0, increment = 1;
        let descobriment;

        //inicialitzem les vides i punts de la partida
        videsPartida.innerHTML = vides;
        puntsPartida.innerHTML = punts;

        descoberts.innerHTML = "Zombis: " + zombisd + " Estrelles: " + estrellesd + " Doble puntuació: " + doblarpuntuacionsd + " Meitat zombis: " + meitatzombisd + " Vides extres: " + videsextresd;
        infoDescobert.innerHTML = "Escriu les coordenades a descobrir o bé clica a una casella";

        //creem l'objecte tauler
        var Tauler = {

            casellesusuari: [],
            casellesresposta: [],

            inicialitzador: function (filesColumnes) {

                //TAULER DE CARA A L'USUARI
                //creem les posicions del tauler que veurà l'usuari segons numero de files i columnes
                for (var files = 0; files <= filesColumnes - 1; files++) {
                    this.casellesusuari.push([]);
                }
                //emplenem el tauler amb objectes element de gespa tapada
                for (var files = 0; files <= filesColumnes - 1; files++) {
                    for (var columnes = 0; columnes <= filesColumnes - 1; columnes++) {
                        this.casellesusuari[files][columnes] = new Element('g');
                    }
                }

                // TAULER RESPOSTA
                //creem les posicions del tauler resposta segons numero de files i columnes
                for (var files = 0; files <= filesColumnes - 1; files++) {
                    this.casellesresposta.push([]);
                }
                //emplenem el tauler amb objectes element de gespa tapada
                for (var files = 0; files <= filesColumnes - 1; files++) {
                    for (var columnes = 0; columnes <= filesColumnes - 1; columnes++) {
                        this.casellesresposta[files][columnes] = new Element('g');
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
                            if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rfila][rcolumna] = new VidaExtra('v');
                                seguir = false;
                            }
                        } while (seguir == true);
                    }
                }
                else { //si és horitzontal
                    rfila = Math.floor(Math.random() * (valor));
                    for (var contvidesextres = 1; contvidesextres <= videsextres; contvidesextres++) {
                        seguir = true;

                        do {
                            rcolumna = Math.floor(Math.random() * (valor));
                            if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rfila][rcolumna] = new VidaExtra('v');
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
                            if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rfila][rcolumna] = new MeitatZombis('m');
                                seguir = false;
                            }
                        } while (seguir == true);
                    }
                }
                else { //si és horitzontal
                    rfila = Math.floor(Math.random() * (valor));
                    for (var contmeitatzombis = 1; contmeitatzombis <= meitatzombis; contmeitatzombis++) {
                        seguir = true;

                        do {
                            rcolumna = Math.floor(Math.random() * (valor));
                            if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rfila][rcolumna] = new MeitatZombis('m');
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
                    if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                        this.casellesresposta[rfila][rcolumna] = new DoblePunts('d');
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
                        if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                            switch (tipusrecompensa) {
                                case 0: //vida extra
                                    this.casellesresposta[rfila][rcolumna] = new VidaExtra('v');
                                    videsextres++;
                                    break;
                                case 1: //meitat zombis
                                    this.casellesresposta[rfila][rcolumna] = new MeitatZombis('m');
                                    meitatzombis++;
                                    break;
                                case 2: //doble puntuacio
                                    this.casellesresposta[rfila][rcolumna] = new DoblePunts('d');
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
                        if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                            this.casellesresposta[rfila][rcolumna] = new Estrella('e');
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
                        if (this.casellesresposta[rfila][rcolumna].contingut == 'g') { //si la casella es troba lliure
                            this.casellesresposta[rfila][rcolumna] = new Zombi('z');
                            console.log(rfila + "-" + rcolumna);
                            seguir = false;
                        }
                    } while (seguir == true);
                }

                //mostrem el nombre d'elements totals de cada tipus
                totals.innerHTML = "Zombis: " + zombis + " Estrelles: " + estrelles + " Doble puntuació: " + doblarpuntuacions + " Meitat zombis: " + meitatzombis + " Vides extres: "+ videsextres
            },

            mostrarContingut: function () {
                for (var files = 0; files <= valor - 1; files++) {
                    for (var columnes = 0; columnes <= valor - 1; columnes++) {
                        imatge = Tauler.rutaImatge(files,columnes);
                        casellesTauler.innerHTML += "<button id='" + files + "-" + columnes + "'><img src='" + imatge + "'></button>";
                    }
                    casellesTauler.innerHTML += "<br>";
                }

                divTauler.style.display = '';

                //afegim events onClick per a les diferents posicions o botons
                for (var files = 0; files <= valor - 1; files++) {
                    for (var columnes = 0; columnes <= valor - 1; columnes++) {
                        document.getElementById(files + "-" + columnes).addEventListener("click", this.canviarContingut);
                    }
                }

            },

            canviarContingut: function () {
                let nfila;
                let ncolumna;
                let canviarimatge = true;

                if(filaDescobrir.value !="" && columnaDescobrir.value !=""){
                    if(filaDescobrir.value<=valor-1 && columnaDescobrir.value<=valor-1){
                        nfila = filaDescobrir.value;
                        ncolumna = columnaDescobrir.value;
                    }
                    else{
                        canviarimatge = false;
                        alert("Coordenades invàlides o fora de rang");
                    }
                }

                else{
                    let coordenades = (this.id).split("-"); //extreiem les coordenades del boto clicat
                    nfila = coordenades[0];
                    ncolumna = coordenades[1];
                }

                if(canviarimatge == true) {
                    if (Tauler.casellesresposta[nfila][ncolumna].contingut === (Tauler.casellesresposta[nfila][ncolumna].contingut).toLowerCase()){ // si la casella no està destapada encara
                        Tauler.casellesusuari[nfila][ncolumna].contingut = Tauler.casellesresposta[nfila][ncolumna].contingut; //col·loquem l'element del tauler resposta al tauler usuari
                        Tauler.casellesresposta[nfila][ncolumna].contingut = Tauler.casellesresposta[nfila][ncolumna].contingut.toUpperCase(); //posem el contingut com a ja destapat al tauler resposta
                        
                        switch(Tauler.casellesusuari[nfila][ncolumna].contingut) { //afegim +1 al recompte de destapats i actualitzem les dades a mostrar
                            case 'g':
                                descobriment = "gespa";
                                punts = punts + (50 * increment);
                            break;
                            case 'z':
                                descobriment = "un zombi";
                                zombisd++;
                                vides--;
                                if((punts-100)>=0){
                                    punts = punts - 100;
                                }
                            break;
                            case 'e':
                                descobriment = "una estrella";
                                estrellesd++;
                                punts = punts + (200 * increment);
                            break;
                            case 'd':
                                descobriment = "una doble puntuacio";
                                doblarpuntuacionsd++;
                                if(doblarpuntuacionsd == doblarpuntuacionsd){
                                    increment = 2;
                                }
                            break;
                            case 'm':
                                descobriment = "un meitat de zombis";
                                meitatzombisd++;
                                if(meitatzombisd == meitatzombis) { //en cas de destapar tots els meitat zombis
                                    let zombiseliminar = Math.round((zombis-zombisd)/2); //calculem quina es la meitat dels zombis encara tapats
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
                                    totals.innerHTML = "Zombis: " + zombis + " Estrelles: " + estrelles + " Doble puntuació: " + doblarpuntuacions + " Meitat zombis: " + meitatzombis + " Vides extres: "+ videsextres
                                }
                            break;
                            case 'v':
                                descobriment = "una vida extra";
                                videsextresd++;
                                if(videsextresd == videsextres) { //en cas de destapar totes les vides extres
                                    vides++;
                                }
                            break;
                        }

                        infoDescobert.innerHTML = "Has descobert " + descobriment + "!";
    
                        descoberts.innerHTML = "Zombis: " + zombisd + " Estrelles: " + estrellesd + " Doble puntuació: " + doblarpuntuacionsd + " Meitat zombis: " + meitatzombisd + " Vides extres: " + videsextresd;
    
                        let botocanviar = document.getElementById(nfila + "-" + ncolumna); //canviem la imatge de dintre del boto
                        imatge = Tauler.rutaImatge(nfila,ncolumna);
                        botocanviar.innerHTML = "<img src='" + imatge + "'>"
                        
                        videsPartida.innerHTML = vides; //actualitzem les vides i punts de la partida
                        puntsPartida.innerHTML = punts;

                    }
    
                    else { //si la casella ja es troba destapada
                        alert("Aquesta casella ja ha sigut descoberta");
                    }
                }

                filaDescobrir.value = "";
                columnaDescobrir.value = "";

                if (vides == 0){ //si el jugador es queda sense vides
                    Tauler.abandonar();
                    alert("Has perdut!");
                }

                if (estrellesd == estrelles){
                    alert("Has guanyat!");
                }

            },

            rutaImatge: function (fila, columna) { //segons contingut de l'element retorna una ruta d'imatge
                let imatge;
                switch(this.casellesusuari[fila][columna].contingut){
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

            abandonar: function (){
                casellesTauler.innerHTML = "";
                divFilesColumnes.style.display = '';
                divTauler.style.display = 'none';
                divEstadistiques.style.display = 'none';
            }
            
        };

        //afegim onclick per al button descobrir i abandonar
        document.getElementById("descobrir").addEventListener("click", Tauler.canviarContingut);
        document.getElementById("abandonar").addEventListener("click", Tauler.abandonar);

        //li pasem al tauler el nombre de files/columnes
        Tauler.inicialitzador(valor);
        //veure les posicions i el contingut
        Tauler.mostrarContingut();

    }

    //si el valor introduït és incorrecte
    else {
        alert("Valor incorrecte! El número de files i columnes ha d'estar entre 5 i 20");
    }


}

/* ********************** localStorage *********************************** */

/* emmagatzema dades sense data de caducitat.
 Les dades no es suprimiran quan el navegador estigui tancat i estaran disponibles el dia,
 la setmana o l'any següent. */

/* GUARDAR DATO

localStorage.setItem("key", "value");

*/

/* LEER DATO

var lastname = localStorage.getItem("key");

*/

/* ELIMINAR DATO

localStorage.removeItem("key");

*/