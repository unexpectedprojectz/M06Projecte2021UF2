
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

    //vinculem variable text tauler
    textTauler = document.getElementById('texttauler');
}

function creacioTauler() {

    var valor = document.getElementById("filCol").value;

    //si el valor és correcte (entre 5 i 20) podem crear el tauler
    if (valor >= 5 && valor <= 20) {

        //inicialitzem els elements i preparem els que necessitarem de cada tipus
        let totalcaselles, estrelles, zombis, doblarpuntuacions, meitatzombis, videsextres;
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
            },

            veureContingut: function () {
                for (var files = 0; files <= valor - 1; files++) {
                    for (var columnes = 0; columnes <= valor - 1; columnes++) {
                        if (this.casellesusuari[files][columnes].contingut == 'g') {
                            imatge = "img/gespa.jpg"
                        }
                        if (this.casellesusuari[files][columnes].contingut == 'z') {
                            imatge = "img/zombi.jpg"
                        }
                        if (this.casellesusuari[files][columnes].contingut == 'e') {
                            imatge = "img/estrella.jpg"
                        }
                        if (this.casellesusuari[files][columnes].contingut == 'd') {
                            imatge = "img/doblepuntuacio.jpg"
                        }
                        if (this.casellesusuari[files][columnes].contingut == 'm') {
                            imatge = "img/meitatzombis.jpg"
                        }
                        if (this.casellesusuari[files][columnes].contingut == 'v') {
                            imatge = "img/vidaextra.jpg"
                        }

                        textTauler.innerHTML += "<button id='" + files + "-" + columnes + "' onclick='(function(){Tauler.canviarContingut()})'><img src='" + imatge + "'></button>";
                        /*document.getElementById("0-0").onclick = function() {
                            canviarContingut();
                        }*/
                    }
                    textTauler.innerHTML += "<br>";
                }

                divTauler.style.display = '';
            },

            canviarContingut: function () {
                console.log("hola");
            }

        };

        //Li pasem al tauler el nombre de files/columnes
        Tauler.inicialitzador(valor);
        //Veure les posicions i el contingut
        Tauler.veureContingut();

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