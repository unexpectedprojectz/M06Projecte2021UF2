
window.onload = function() {


    let repetir = true;
    let numero, caselles, estrelles, zombis, doblarpuntacio, eliminarzombis, vidaextra;

    caselles = numero * numero;
    estrelles = numero;
    zombis = Math.round((caselles * 25) / 100);
    doblarpuntuacio = 1, eliminarzombis = 2, vidaextra = 3; // PARA ESTOS TRES HABRÁ QUE CREAR ATRIBUTO BOOLEAN POSICIO PARA SABER SI ES VERTICAL 0 O HORIZONTAL 1 CUANDO SE COLOQUE EN TABLERO

    while (repetir == true) {
        numero = prompt("Introdueix un número de files i columnes contingut entre 5 i 20");

        if (numero >= 5 && numero <= 20) {
            repetir = false;
        }
    }

    var Tauler = {
        elements: []
        //dades: function() // metodes : funció,
        //{ return(this.nom + "-" + this.ocupacio + "-" + this.edat);
        //}
    };
 
}