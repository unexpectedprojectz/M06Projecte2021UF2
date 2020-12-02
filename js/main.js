window.onload = function() {

    let repetir = true;
    let numero;

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