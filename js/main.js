
window.onload = function () {

    inici();

}

function inici() {
    //MOSTREM input i button
    divFilesColumnes = document.getElementById('filesColumnes');
    divFilesColumnes.style.display = '';

    //OCULTEM tauler, estadistiques/altres
    divTauler = document.getElementById('tauler');
    divTauler.style.display = 'none';

    divEstadistiques = document.getElementById('estadistiques');
    divEstadistiques.style.display = 'none';

    document.getElementById("juga").addEventListener("click", comprovaFilesColumnes);

    // TEXT TAULER
    textTauler = document.getElementById('texttauler');
}

function comprovaFilesColumnes() {

    var valor = document.getElementById("filCol").value;

    //si el valor és correcte (entre 5 i 20) podem crear el tauler
    if (valor >= 5 && valor <= 20) {
        
        //inicialitzem els elements i recomptem els que necessitarem de cada tipus
        let totalcaselles, estrelles, zombis, doblarpuntuacio, eliminarzombis, vidaextra;
        let posicio1, posicio2, seguir;

        estrelles = valor;

        totalcaselles = valor * valor;
        zombis = Math.round((totalcaselles * 25) / 100);
    
        doblarpuntuacio = 1, eliminarzombis = 2, vidaextra = 3; // PARA ESTOS TRES HABRÁ QUE CREAR ATRIBUTO BOOLEAN POSICIO PARA SABER SI ES VERTICAL 0 O HORIZONTAL 1 CUANDO SE COLOQUE EN TABLERO

        



        //creem l'objecte tauler
        var Tauler = {
            
            posicions: [],

            inicialitzador: function (filesColumnes) {
                //segons files i columnes creem les posicions del tauler
                for (var files = 0; files <= filesColumnes - 1; files++) {
                    this.posicions.push([]);
                }
                //emplenem el tauler amb objectes element de gespa tapada
                for (var files = 0; files <= filesColumnes - 1; files++) {
                    for (var columnes = 0; columnes <= filesColumnes - 1; columnes++) {
                        this.posicions[files][columnes] = new Element('g');
                    }
                }
                //distribuim i col·loquem els elements al tauler
                
                //ESTRELLES
                for (var contestrelles = 0; contestrelles <= estrelles; contestrelles++) {
                    seguir = true;
                
                    do {
                        posicio1 = Math.floor(Math.random() * (valor-1));
                        posicio2 = Math.floor(Math.random() * (valor-1));
                        if (this.posicions[posicio1][posicio2].contingut == 'g'){ //si la casella es troba lliure
                            this.posicions[posicio1][posicio2] = new Estrella('e');
                            seguir = false;
                        }
                    } while(seguir==true);
                }
            },

            veureContingut: function () {
                for (var files = 0; files <= valor - 1; files++) {
                    for (var columnes = 0; columnes <= valor - 1; columnes++) {
                        textTauler.innerHTML += this.posicions[files][columnes].contingut + " ";
                    }
                    textTauler.innerHTML += "<br>";
                }

                divTauler.style.display = '';
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