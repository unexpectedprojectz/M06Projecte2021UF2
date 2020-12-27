
window.onload = function () {
    inici();
}

function inici() {
    //mostrem input i button
    divFilesColumnes = document.getElementById('filesColumnes');
    divFilesColumnes.style.display = '';

    //ocultem tauler, estadistiques/altres
    divTauler = document.getElementById('tauler');
    divTauler.style.display = 'none';

    divEstadistiques = document.getElementById('estadistiques');
    divEstadistiques.style.display = 'none';
    document.getElementById("juga").addEventListener("click", creacioTauler);

    //vinculem variables necessaries amb html
    casellesTauler = document.getElementById('casellestauler');
    totals = document.getElementById('totals');
    descoberts = document.getElementById('descoberts');
    filaDescobrir = document.getElementById('filadescobrir');
    columnaDescobrir = document.getElementById('columnadescobrir');
}

function creacioTauler() {

    var valor = document.getElementById("filCol").value;

    //si el valor és correcte (entre 5 i 20) podem crear el tauler
    if (valor >= 5 && valor <= 20) {

        //inicialitzem els elements i preparem els que necessitarem de cada tipus
        let totalcaselles, estrelles, zombis, doblarpuntuacions, meitatzombis, videsextres;
        let estrellesd = 0, zombisd = 0, doblarpuntuacionsd = 0, meitatzombisd = 0, videsextresd = 0;
        let rcolumna, rfila, seguir;
        let imatge;

        estrelles = valor;

        totalcaselles = valor * valor;
        zombis = Math.round((totalcaselles * 25) / 100);

        doblarpuntuacions = 1, meitatzombis = 2, videsextres = 3;

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
                            if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rcolumna][rfila] = new VidaExtra('v');
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
                            if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rcolumna][rfila] = new VidaExtra('v');
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
                            if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rcolumna][rfila] = new MeitatZombis('m');
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
                            if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                                this.casellesresposta[rcolumna][rfila] = new MeitatZombis('m');
                                seguir = false;
                            }
                        } while (seguir == true);
                    }
                }

                //doble puntuacio
                seguir = true;

                do {
                    rcolumna = Math.floor(Math.random() * (valor));
                    rfila = Math.floor(Math.random() * (valor));
                    if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                        this.casellesresposta[rcolumna][rfila] = new DoblePunts('d');
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
                        if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                            switch (tipusrecompensa) {
                                case 0: //vida extra
                                    this.casellesresposta[rcolumna][rfila] = new VidaExtra('v');
                                    videsextres++;
                                    break;
                                case 1: //meitat zombis
                                    this.casellesresposta[rcolumna][rfila] = new MeitatZombis('m');
                                    meitatzombis++;
                                    break;
                                case 2: //doble puntuacio
                                    this.casellesresposta[rcolumna][rfila] = new DoblePunts('d');
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
                        if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                            this.casellesresposta[rcolumna][rfila] = new Estrella('e');
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
                        if (this.casellesresposta[rcolumna][rfila].contingut == 'g') { //si la casella es troba lliure
                            this.casellesresposta[rcolumna][rfila] = new Zombi('z');
                            seguir = false;
                        }
                    } while (seguir == true);
                }

                //mostrem el nombre d'elements totals de cada tipus
                totals.innerHTML += "Zombis: " + zombis + " Estrelles: " + estrelles + " Doble puntuació: " + doblarpuntuacions + " Meitat zombis: " + meitatzombis + " Vides extres: "+ videsextres
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

                //COMPROBAR QUE NO SE SALGA DE POSICIONES ARRAY AL INTRODUCIR COORDENADAS

                if(filaDescobrir.value !="" && columnaDescobrir!=""){
                    nfila = filaDescobrir.value;
                    ncolumna = columnaDescobrir.value;
                }

                else{
                    let coordenades = (this.id).split("-"); //extreiem les coordenades del boto clicat
                    nfila = coordenades[0];
                    ncolumna = coordenades[1];
                }

                if (Tauler.casellesresposta[nfila][ncolumna].contingut===Tauler.casellesresposta[nfila][ncolumna].contingut.toLowerCase()){ // si la casella no està destapada encara
                    Tauler.casellesusuari[nfila][ncolumna].contingut = Tauler.casellesresposta[nfila][ncolumna].contingut; //col·loquem l'element del tauler resposta al tauler usuari
                    Tauler.casellesresposta[nfila][ncolumna].contingut = Tauler.casellesresposta[nfila][ncolumna].contingut.toUpperCase(); //posem el contingut com a ja destapat al tauler resposta
                    
                    switch(Tauler.casellesusuari[nfila][ncolumna].contingut) { //afegim +1 al recompte de destapats i actualitzem les dades a mostrar
                        case 'z':
                            zombisd++;
                        break;
                        case 'e':
                            estrellesd++;
                        break;
                        case 'd':
                            doblarpuntuacionsd++;
                        break;
                        case 'm':
                            meitatzombisd++;
                        break;
                        case 'v':
                            videsextresd++;
                        break;
                    }

                    descoberts.innerHTML = "Zombis: " + zombisd + " Estrelles: " + estrellesd + " Doble puntuació: " + doblarpuntuacionsd + " Meitat zombis: " + meitatzombisd + " Vides extres: " + videsextresd;

                    let botocanviar = document.getElementById(nfila + "-" + ncolumna); //canviem la imatge de dintre del boto
                    imatge = Tauler.rutaImatge(nfila,ncolumna);
                    botocanviar.innerHTML = "<img src='" + imatge + "'>"
                }

                else { //si la casella ja es troba destapada
                    alert("Aquesta casella ja ha sigut descoberta");
                }

                filaDescobrir.value = "";
                columnaDescobrir.value = "";
                
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
            }
            
        };

        /* Afegim Onclick per al button descobrir */
        document.getElementById("descobrir").addEventListener("click", Tauler.canviarContingut);

        //Li pasem al tauler el nombre de files/columnes
        Tauler.inicialitzador(valor);
        //Veure les posicions i el contingut
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