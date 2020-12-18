
window.onload = function () {

    let numero, caselles, estrelles, zombis, doblarpuntuacio, eliminarzombis, vidaextra;

    caselles = numero * numero;
    estrelles = numero;
    zombis = Math.round((caselles * 25) / 100);
    doblarpuntuacio = 1, eliminarzombis = 2, vidaextra = 3; // PARA ESTOS TRES HABRÁ QUE CREAR ATRIBUTO BOOLEAN POSICIO PARA SABER SI ES VERTICAL 0 O HORIZONTAL 1 CUANDO SE COLOQUE EN TABLERO

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
}

function comprovaFilesColumnes() {

    var valor = document.getElementById("filCol").value;

    //si el valor és correcte (entre 5 i 20) podem crear el tauler
    if (valor >= 5 && valor <= 20) {

        var Tauler = {
            posicions: {},
            inicialitzador: function (filesColumnes) {
                //segons files i columnes creem les posicions del tauler
                for (var files = 1; files <= filesColumnes; files++) {
                    for (var columnes = 1; columnes <= filesColumnes; columnes++) {
                        this.posicions[files][columnes] = 'g'; // inicialitzem totes les posicions amb una g (gespa tapada)
                    }

                }
            },
            veureContingut: function () {
                for (var posicio in Tauler.posicions) {
                    console.log(posicio, " : ", Tauler.posicions[posicio]);
                }
            }
        };

        //Li pasem al tauler el nombre de files/columnes
        Tauler.inicialitzador(valor);
        //Veure les posicions i el contingut
        Tauler.veureContingut();

        //valor introduït incorrecte
    } else {
        alert("Valor incorrecte! El número de files i columnes ha d'estar entre 5 i 20");
    }


}