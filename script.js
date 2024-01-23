const max = 151;
let pokemon;
let lider;

//INIT (Random)
var ficha = 1;
var batalla = 0;
var region = 3;
//Kanto
//let starters = [1, 4, 7, 52, 133]
//Johto
//let starters = [152, 155, 158, 172, 175]
//Hoenn
let starters = [252, 255, 258, 298, 360]

let miEquipo = [];
let miTrio = []
var teamOrder = 0

var capturar = 0
var capturasConcretadas = 0

var intentosUno = 0
var intentosDos = 0
var intentosTres = 0
var intentosCuatro = 0
var intentosCinco = 0

var capturasUno = 0
var capturasDos = 0
var capturasTres = 0
var capturasCuatro = 0

var capturado1 = 0
var capturado2 = 0
var capturado3 = 0
var capturado4 = 0
var capturado5 = 0


var nombreAleatorio
var liderAleatorio
var pokemonDisponibles
var pokemonRound
var pokemonLider

var shuffledPokemons
var pokemonRandoms

var pokemonCapturados


//BUSCAR POKEMONES Y LIDERES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
fetch('./pokedex.json').then(response => response.json()).then(data => {
    if(JSON.stringify(data)!="null") {
        pokemon = buscarPokemon(data)
    }
}).catch(err => console.log(err))

fetch('./gym.json').then(response => response.json()).then(gym => {
    lider = buscarGym(gym)
}).catch(err => console.log(err))

const buscarPokemon = (data) => {
    if(JSON.stringify(data)!="null") {
        //console.log(data[rdm])
        //return data
        return data.map(pokemon => {
            return {
              ...pokemon,
              name: pokemon.name.english // Reemplaza el campo 'name' por el nombre en ingles directamente
            };
          });
    }
    return null;
}

const buscarGym = (gym) => {
    if(JSON.stringify(gym)!="null") {
        //console.log(gym)
        return gym
    }
    return null;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//DIBUJO INICIAL
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    drawCanvas(ctx, ficha, lider, pokemon, 0, 0);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CAPTURAR
var teamButtonCatch = document.getElementsByClassName("teamButtonCatch");
for (var i = 0; i < teamButtonCatch.length; i++) {
    teamButtonCatch[i].addEventListener("click", function(event) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
    
        capturar = event.target.dataset.catch;
        
        drawCanvas(ctx, ficha, lider, pokemon, capturar, 0);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//AGRUPAR
var agrupar = document.getElementById("agrupar");
agrupar.addEventListener("click", function(event) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    let miEquipoDisponible = miEquipo.filter(pokemon => pokemon.alive);
    console.log("miEquipoDisponible: ")
    console.log(miEquipoDisponible)
    
    if (miEquipoDisponible.length > 0) {

        //Encuentra los 3 Pokémon con el mayor valor de "cp"
        miTrio = miEquipoDisponible.slice().sort((a, b) => b.cp - a.cp).slice(0, 3);

        //Ordena el nuevo array de menor a mayor por "cp" (si tiene más de un elemento)
        if (miTrio.length > 1) {
            miTrio.sort((a, b) => a.cp - b.cp);
        }
          
        console.log("Equipo de Pokémon:", miTrio);
    } else {
        console.log("El array original no tiene Pokémon.");
    }
        
    drawCanvas(ctx, ficha, lider, pokemon, 6, 0);
});

var battle = document.getElementById("battle");
battle.addEventListener("click", function(event) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
    
    batalla = 1
    drawCanvas(ctx, ficha, lider, pokemon, 6, 0);
    batalla = 0
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//REGION
var teamButtonRegion = document.getElementsByClassName("teamButtonRegion");
for (var i = 0; i < teamButtonRegion.length; i++) {
    teamButtonRegion[i].addEventListener("click", function(event) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
    
        region = event.target.dataset.region;

        if (region == 1) {
            starters = [1, 4, 7, 52, 133]
        } else if (region == 2) {
            starters = [152, 155, 158, 175]
        } else if (region == 3) {
            starters = [252, 255, 258, 360]
        }
        
        drawCanvas(ctx, ficha, lider, pokemon, 0, 0);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ROUND
var teamButtonsRound = document.getElementsByClassName("teamButtonRound");
for (var i = 0; i < teamButtonsRound.length; i++) {
    teamButtonsRound[i].addEventListener("click", function(event) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        ficha = event.target.dataset.ficha;
    
        drawCanvas(ctx, ficha, lider, pokemon, 0, 0);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TEAM
var teamButtons = document.getElementsByClassName("teamButton");
for (var i = 0; i < teamButtons.length; i++) {
    teamButtons[i].addEventListener("click", function(event) {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        
        capturar = 6
        var pokemonElegido = event.target.dataset.numero;

        console.log("pokemonElegido:" + pokemonElegido)
        drawCanvas(ctx, ficha, lider, pokemon, capturar, pokemonElegido);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCanvas(ctx, ficha, lider, pokemon, capturar, pokemonElegido) {
    console.log("ficha: " + ficha)
    console.log("capturar: " + capturar)
    console.log("capturasConcretadas: " + capturasConcretadas)

    console.log("miEquipo actual")
    console.log(miEquipo)

    //EVOLUCIONAR POR ROUND
    if (miEquipo.length > 0 && capturar == 0 && pokemonElegido == 0 ) {
        console.log("holaaaa")
        var i = 0
        miEquipo.forEach(pkmn => {
            console.log(pkmn.evolution.next)
            
            if (pkmn.evolution.next) {
                console.log("sarasaaaaaaa")
                console.log(pkmn.evolution.next[0][0])

                var y = 0
                var trampa = 0
                var rdmEvo = 0
                while (y == 0 && trampa < 100) {
                    var rdmEvo = Math.floor(Math.random() * pkmn.evolution.next.length)
                    console.log("rdmEvo: " + rdmEvo)
                    if (pkmn.evolution.next[rdmEvo][0] <= 386) {
                        y++
                    }
                    trampa++
                }
                //si no metia esta trampa me crasheaba en while infinito al intentar evolucionar un pokemon de generacion siguiente por ej crobat
                if (trampa < 100) { 
                //console.log(pokemon.find(pokemon => pokemon.id == pkmn.evolution.next[0]))
                if (miTrio.find(miTrio => miTrio.id === pkmn.id) && miEquipo[i].alive) {
                    miEquipo[i] = pokemon.find(pokemon => pokemon.id === parseInt(pkmn.evolution.next[rdmEvo][0]))
                    miEquipo[i].alive = true
                }
                
                var z = 0
                
                console.log("miEquipo[i]]: " + miEquipo[i].id)
                miTrio.forEach(pkmnTrio => {
                    console.log("pkmnTrio.id: " + pkmnTrio.id)
                    //console.log("pkmnTrio.name : " + pkmnTrio.name + ", miEquipo[i].evolution.prev[0]: " + miEquipo[i].evolution.prev[1])
                    
                    if (miEquipo[i].evolution.prev && pkmnTrio.id == miEquipo[i].evolution.prev[0] /*&& miEquipo[i].alive === true*/) {
                        miTrio[z] = miEquipo[i]
                    }
                    z++
                });
                }
                

            }
            i++
        });
    }

    if (pokemonElegido > 0 && capturasConcretadas >= pokemonElegido) {
        
        if (teamOrder == 3) {
            teamOrder = 0
        }


        if (miTrio.length == 3 && miTrio[0] && miTrio[0].id  && miTrio[0].id == miEquipo[pokemonElegido-1].id && teamOrder != 0) {
            miTrio[0] = null
        }

        if (miTrio.length == 3 && miTrio[1] && miTrio[1].id && miTrio[1].id  == miEquipo[pokemonElegido-1].id && teamOrder != 1) {
            miTrio[1] = null
        }

        if (miTrio.length == 3 && miTrio[2] && miTrio[2].id  && miTrio[2].id  == miEquipo[pokemonElegido-1].id && teamOrder != 2) {
            miTrio[2] = null
        }

        miTrio[teamOrder] = miEquipo[pokemonElegido-1]
        teamOrder++
        console.log(miTrio)
    }

    if (capturar == 0) {
        intentosUno = 0
        intentosDos = 0
        intentosTres = 0
        intentosCuatro = 0
        intentosCinco = 0

        capturado1 = 0
        capturado2 = 0
        capturado3 = 0
        capturado4 = 0
        capturado5 = 0

        //via libre para capturar
        //capturasUno = 0
    }

    if (lider && ficha==1) {
        if (capturar == 0) {
             //console.log(lider.green)
        const verde = lider.green;
        if (verde && Object.keys(verde).length > 0) {
            const nombres = Object.keys(verde);
            const randomIndex = Math.floor(Math.random() * nombres.length);
            nombreAleatorio = nombres[randomIndex];
            liderAleatorio = verde[nombreAleatorio];
            console.log('nombreAleatorio:', nombreAleatorio);
            console.log('liderAleatorio:', liderAleatorio);
        } else {
                console.log('No hay datos para el líder verde');
        }

        if (region == 1) {
        pokemonDisponibles = [10, 13, 16, 19, 21, 23, 27, 29, 32, 37, 41, 43, 46, 48, 50, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 90, 92, 98, 100, 102, 104, 109, 111, 116, 118, 120, 129, 132, 137, 138, 140, 147];
        } else if (region == 2) {
        pokemonDisponibles = [161, 163, 165, 167, 170, 172, 173, 174, 177, 179, 187, 191, 194, 201, 204, 209, 216, 218, 220, 223, 225, 228, 231, 236, 238, 239, 240, 246]
        } else if (region == 3) {
            pokemonDisponibles = [374, 371, 366, 363, 361, 355, 353, 351, 343, 341, 333, 328, 327, 325, 322, 320, 318, 316, 312, 311, 309, 304, 300, 296, 293, 290, 287, 285, 280, 278, 276, 273, 270, 265, 263, 261, ]
        }

        } else if (capturasConcretadas < 10 && capturasUno < 4) { 
            dado6 = Math.floor(Math.random() * 6) + 1;
            //console.log("tirada de dado de seis caras: " + dado6);
            
            var capturado = false
            if (dado6 >= 2) {
                //console.log("capturado")
                capturado = true
            } else {
                //console.log("se escapó") 
            }

            
            /*} else*/ if (intentosDos == 0 && capturar == 2) {
                capturado2 = 0
                if (capturado) { 
                    capturado2 = 1
                    capturasConcretadas++
                    capturasUno++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado2 = 2  }
                intentosDos++
                console.log("intentosDos: " + intentosDos)
            } else if (intentosTres == 0 && capturar == 3) {
                capturado3 = 0
                if (capturado) { 
                    capturado3 = 1 
                    capturasConcretadas++
                    capturasUno++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado3 = 2 }
                intentosTres++
                console.log("intentosTres: " + intentosTres)
            } else if (intentosCuatro == 0 && capturar == 4) {
                capturado4 = 0
                if (capturado) { 
                    capturado4 = 1 
                    capturasConcretadas++
                    capturasUno++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado4 = 2 }
                intentosCuatro++
                console.log("intentosCuatro: " + intentosCuatro)
            } else if (intentosCinco == 0 && capturar == 5) {
                capturado5 = 0
                if (capturado) { 
                    capturado5 = 1 
                    capturasConcretadas++
                    capturasUno++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado5 = 2 }
                intentosCinco++
                console.log("intentosCinco: " + intentosCinco)
            }
            console.log("capturasConcretadas: " + capturasConcretadas)
        }
    }
    if (lider && ficha==2) {
        if (capturar==0) {
        //console.log(lider.red)
        const rojo = lider.red;
        if (rojo && Object.keys(rojo).length > 0) {
            const nombres = Object.keys(rojo);
            const randomIndex = Math.floor(Math.random() * nombres.length);
            nombreAleatorio = nombres[randomIndex];
            liderAleatorio = rojo[nombreAleatorio];
            console.log('nombreAleatorio:', nombreAleatorio);
            console.log('liderAleatorio:', liderAleatorio);
        } else {
                console.log('No hay datos para el líder rojo');
        }

        if (region == 1) {
            pokemonDisponibles = [95, 96, 97, 108, 113, 114, 123, 127];
        } else if (region == 2) {
            pokemonDisponibles = [190, 193, 198, 200, 203, 206, 215, 226, 234]
        } else if (region == 3) {
            pokemonDisponibles = [370, 358, 352, 349, 347, 345, 339, 336, 315, 314, 313, 302, 299]
        }

        } else if (capturasConcretadas < 10 && capturasDos < 3) { 
            dado6 = Math.floor(Math.random() * 6) + 1;
            //console.log("tirada de dado de seis caras: " + dado6);
            
            var capturado = false
            if (dado6 >= 3) {
                //console.log("capturado")
                capturado = true
            } else {
                //console.log("se escapó") 
            }

            if (intentosUno == 0 && capturar == 1) {
                capturado1 = 0
                if (capturado) { 
                    capturado1 = 1 
                    capturasConcretadas++
                    capturasDos++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado1 = 2 }
                intentosUno++
                console.log("intentosUno: " + intentosUno)
            } else if (intentosDos == 0 && capturar == 2) {
                capturado2 = 0
                if (capturado) { 
                    capturado2 = 1
                    capturasConcretadas++
                    capturasDos++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado2 = 2  }
                intentosDos++
                console.log("intentosDos: " + intentosDos)
            } else if (intentosTres == 0 && capturar == 3) {
                capturado3 = 0
                if (capturado) { 
                    capturado3 = 1 
                    capturasConcretadas++
                    capturasDos++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado3 = 2 }
                intentosTres++
                console.log("intentosTres: " + intentosTres)
            } else if (intentosCuatro == 0 && capturar == 4) {
                capturado4 = 0
                if (capturado) { 
                    capturado4 = 1 
                    capturasConcretadas++
                    capturasDos++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado4 = 2 }
                intentosCuatro++
                console.log("intentosCuatro: " + intentosCuatro)
            } else if (intentosCinco == 0 && capturar == 5) {
                capturado5 = 0
                if (capturado) { 
                    capturado5 = 1 
                    capturasConcretadas++
                    capturasDos++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado5 = 2 }
                intentosCinco++
                console.log("intentosCinco: " + intentosCinco)
            }
            console.log("capturasConcretadas: " + capturasConcretadas)
        }

    }
    if (lider && ficha==3) {
        if (capturar == 0) {
        //console.log(lider.blue)
            const azul = lider.blue;
            if (azul && Object.keys(azul).length > 0) {
                const nombres = Object.keys(azul);
                const randomIndex = Math.floor(Math.random() * nombres.length);
                nombreAleatorio = nombres[randomIndex];
                liderAleatorio = azul[nombreAleatorio];
                console.log('nombreAleatorio:', nombreAleatorio);
                console.log('liderAleatorio:', liderAleatorio);
            } else {
                console.log('No hay datos para el líder azul');
            }

            if (region == 1) {
                pokemonDisponibles = [83, 115, 122, 128, 131, 142, 143];
            } else if (region == 2) {
                pokemonDisponibles = [241, 227, 222, 214, 213, 211, 185];
            } else if (region == 3) {
                pokemonDisponibles = [369, 359, 357, 337, 338, 335, 324, 303]
            }

        } else if (capturasConcretadas < 10 && capturasTres < 2) { 
            dado6 = Math.floor(Math.random() * 6) + 1;
            //console.log("tirada de dado de seis caras: " + dado6);
            
            var capturado = false
            if (dado6 >= 4) {
                //console.log("capturado")
                capturado = true
            } else {
                //console.log("se escapó") 
            }

            if (intentosUno == 0 && capturar == 1) {
                capturado1 = 0
                if (capturado) { 
                    capturado1 = 1 
                    capturasConcretadas++
                    capturasTres++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado1 = 2 }
                intentosUno++
                console.log("intentosUno: " + intentosUno)
            } else if (intentosDos == 0 && capturar == 2) {
                capturado2 = 0
                if (capturado) { 
                    capturado2 = 1
                    capturasConcretadas++
                    capturasTres++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado2 = 2  }
                intentosDos++
                console.log("intentosDos: " + intentosDos)
            } else if (intentosTres == 0 && capturar == 3) {
                capturado3 = 0
                if (capturado) { 
                    capturado3 = 1 
                    capturasConcretadas++
                    capturasTres++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado3 = 2 }
                intentosTres++
                console.log("intentosTres: " + intentosTres)
            } else if (intentosCuatro == 0 && capturar == 4) {
                capturado4 = 0
                if (capturado) { 
                    capturado4 = 1 
                    capturasConcretadas++
                    capturasTres++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado4 = 2 }
                intentosCuatro++
                console.log("intentosCuatro: " + intentosCuatro)
            } else if (intentosCinco == 0 && capturar == 5) {
                capturado5 = 0
                if (capturado) { 
                    capturado5 = 1 
                    capturasConcretadas++
                    capturasTres++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado5 = 2 }
                intentosCinco++
                console.log("intentosCinco: " + intentosCinco)
            }
            console.log("capturasConcretadas: " + capturasConcretadas)
        }
    }
    if (lider && ficha==4) {
        if (capturar == 0) {
            //console.log(lider.yellow)
            const amarillo = lider.yellow;
            if (amarillo && Object.keys(amarillo).length > 0) {
                const nombres = Object.keys(amarillo);
                const randomIndex = Math.floor(Math.random() * nombres.length);
                nombreAleatorio = nombres[randomIndex];
                liderAleatorio = amarillo[nombreAleatorio];
                console.log('nombreAleatorio:', nombreAleatorio);
                console.log('liderAleatorio:', liderAleatorio);
            } else {
                    console.log('No hay datos para el líder amarillo');
            }

            if (region == 1) {
                pokemonDisponibles = [144, 145, 146, 150];
            } else if (region == 2) {
                pokemonDisponibles = [243, 244, 245, 249, 250];
            } else if (region == 3) {
                pokemonDisponibles = [384, 383, 382, 381, 380, 379, 378, 377]
            }
        } else if (capturasConcretadas < 10 && capturasCuatro < 1) { 
            dado6 = Math.floor(Math.random() * 6) + 1;
            //console.log("tirada de dado de seis caras: " + dado6);
            
            var capturado = false
            if (dado6 >= 5) {
                //console.log("capturado")
                capturado = true
            } else {
                //console.log("se escapó") 
            }

            if (intentosUno == 0 && capturar == 1) {
                capturado1 = 0
                if (capturado) { 
                    capturado1 = 1 
                    capturasConcretadas++
                    capturasCuatro++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado1 = 2 }
                intentosUno++
                console.log("intentosUno: " + intentosUno)
            } else if (intentosDos == 0 && capturar == 2) {
                capturado2 = 0
                if (capturado) { 
                    capturado2 = 1
                    capturasConcretadas++
                    capturasCuatro++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado2 = 2  }
                intentosDos++
                console.log("intentosDos: " + intentosDos)
            } else if (intentosTres == 0 && capturar == 3) {
                capturado3 = 0
                if (capturado) { 
                    capturado3 = 1 
                    capturasConcretadas++
                    capturasCuatro++
                    pokemonRandoms[capturar - 1].alive = true
                    miEquipo.push(pokemonRandoms[capturar - 1])
                    console.log(miEquipo)
                } else { capturado3 = 2 }
                intentosTres++
                console.log("intentosTres: " + intentosTres)
            } 
            console.log("capturasConcretadas: " + capturasConcretadas)
        }
    }
    if (lider && ficha==5 && capturar==0) {
        //console.log(lider.champion)
        const campeon = lider.champion;
        if (campeon && Object.keys(campeon).length > 0) {
            const nombres = Object.keys(campeon);
            const randomIndex = Math.floor(Math.random() * nombres.length);
            nombreAleatorio = nombres[randomIndex];
            liderAleatorio = campeon[nombreAleatorio];
            console.log('nombreAleatorio:', nombreAleatorio);
            console.log('liderAleatorio:', liderAleatorio);
        } else {
                console.log('No hay datos para el líder campeon');
        }
    }

    if (lider && ficha != null && ficha <=4 && capturar==0) {
        pokemonRound = pokemon.filter(pokemones => {
            return pokemonDisponibles.includes(pokemones.id);
          });
        console.log(pokemonRound)

        // Barajar aleatoriamente el array de pokemones
        shuffledPokemons = pokemonRound.sort(() => Math.random() - 0.5);


        if (ficha < 4) {
        // Tomar los primeros 5 elementos del array barajado para obtener los 5 pokemones aleatorios
            pokemonRandoms = shuffledPokemons.slice(0, 5);
            console.log(pokemonRandoms);
            if (ficha == 1) {
                if (miEquipo.length == 0) {
                    startersRound = pokemon.filter(pokemones => {
                        return starters.includes(pokemones.id);
                    });
                    shuffledStarters = startersRound.sort(() => Math.random() - 0.5);

                    //capturado1 = 1 
                    capturasConcretadas++
                    capturasUno++
                    shuffledStarters[0].alive = true
                    miEquipo.push(shuffledStarters[0])
                    console.log(miEquipo)
                    intentosUno++
                }
                capturado1 = 1 
                pokemonRandoms[0] = shuffledStarters[0]
                
            }
        }
        if (ficha == 4) {
        // Tomar los primeros 3 elementos del array barajado para obtener los 5 pokemones aleatorios
        pokemonRandoms = shuffledPokemons.slice(0, 3);
        console.log(pokemonRandoms);
        }
    }

    if (lider && ficha != null && capturar==0) {
        pokemonLider = liderAleatorio.Pokemon.map(pokemonName => {
            return pokemon.find(pokemon => pokemon.name === pokemonName);
        });
        console.log(pokemonLider);
    }

    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 3.1;
    const distance = 60; // Distancia entre los círculos
    const radius = 20; // Radio de los círculos
      
    function drawCircle(x, y, rad, color) {
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
      
    function drawLine(startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    function drawEquilateralTriangle(x, y, size, color) {
        ctx.beginPath();
        const height = (Math.sqrt(3) / 2) * size;
        ctx.moveTo(x, y - height / 2); // Punto superior
        ctx.lineTo(x + size / 2, y + height / 2); // Punto inferior derecho
        ctx.lineTo(x - size / 2, y + height / 2); // Punto inferior izquierdo
        ctx.closePath();
    
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
      
    const colors = ["lightgrey", "lightyellow", "lightblue", "lightpink", "lightgreen"]; // Colores por nivel
      
    const directions = [
        { x: 0, y: -distance },
        { x: distance, y: 0 },
        { x: 0, y: distance },
        { x: -distance, y: 0 },
        { x: distance * Math.cos(Math.PI / 4), y: -distance * Math.sin(Math.PI / 4) },
        { x: distance * Math.cos(Math.PI / 4), y: distance * Math.sin(Math.PI / 4) },
        { x: -distance * Math.cos(Math.PI / 4), y: distance * Math.sin(Math.PI / 4) },
        { x: -distance * Math.cos(Math.PI / 4), y: -distance * Math.sin(Math.PI / 4) }
    ];

    var potenciador = 0
    if (ficha == 1) {
        potenciador = -1
    }
        if (ficha == 4) {
            potenciador = 1
        }
        if (ficha == 5) {
            potenciador = 1
        }

        var ganador1 = 0
        var ganador2 = 0
        if (batalla == 1) {
            var batallaX1 = 366
            var batallaX2 = 436
            var batallaY = 584 
            console.log(potenciador)
            let dados3Player1
            let dados3Lider
            for (let i = 0; i < 3; i++) {
                
                dados3Player1 = Math.floor(Math.random() * 3); //numero al azar del 0 al 3
                dados3Lider = Math.floor(Math.random() * 3);
                
                if ((miTrio[i].cp + dados3Player1) > (pokemonLider[i].cp + potenciador + dados3Lider)) {
                    console.log((i+1) + "° batalla: ganaste " + (miTrio[i].cp + dados3Player1) + " > " + (pokemonLider[i].cp + potenciador + dados3Lider))
                    ganador1++
                    drawCircle(batallaX1, batallaY + (i*70), 30, "lightgreen")
                    drawCircle(batallaX2, batallaY + (i*70), 30, "lightpink")
                } else if ((miTrio[i].cp + dados3Player1) < (pokemonLider[i].cp + potenciador + dados3Lider)) {
                    console.log((i+1) + "° batalla: perdiste " + (miTrio[i].cp + dados3Player1) + " < " + (pokemonLider[i].cp + potenciador + dados3Lider))
                    drawCircle(batallaX1, batallaY + (i*70), 30, "lightpink")
                    drawCircle(batallaX2, batallaY + (i*70), 30, "lightgreen")
                    ganador2++
                    for (let y = 0; y < miEquipo.length; y++) {
                        if (miTrio[i].name == miEquipo[y].name) {
                            console.log(miEquipo[y].name + "está debilitado")
                            miEquipo[y].alive = false
                        }
                    }
                } else {
                    console.log((i+1) + "° batalla: empate")
                    drawCircle(batallaX1, batallaY + (i*70), 30, "lightblue")
                    drawCircle(batallaX2, batallaY + (i*70), 30, "lightblue")
                }

                if (ganador1 >= 2) {
                    console.log("Has ganado el Round " + ficha)
                    break
                }
            }
            
        }
      
    directions.forEach((direction, index) => {
        const circleX = centerX + direction.x;
        const circleY = centerY + direction.y;
      
        const color = colors[1]; // Asignar color según nivel
      
        drawCircle(circleX, circleY, radius, color);
      
        for (let i = -1; i <= 3; i++) {
            const currentX = circleX + direction.x * i;
            const currentY = circleY + direction.y * i;
            const nextX = circleX + direction.x * (i + 1);
            const nextY = circleY + direction.y * (i + 1);
            const levelColor = colors[i + 1]; // Color del siguiente nivel
      
            drawCircle(currentX, currentY, radius, levelColor);
            if (i == 1 && index == 3) {
                var triangleOffset = ficha * 60
                //console.log("index: " + index + ", i: " + i)
                drawEquilateralTriangle(400, 574 - triangleOffset, 21, "red")
                drawEquilateralTriangle(400, 576 - triangleOffset, 9, "white")
            }
            if (ficha == 5) {
                drawEquilateralTriangle(400, 574 - 300, 21, "red")
                drawEquilateralTriangle(400, 576 - 300, 9, "white")
            }
      
            if (i != 3) {
              const startX = currentX + radius * Math.cos(Math.atan2(nextY - currentY, nextX - currentX));
              const startY = currentY + radius * Math.sin(Math.atan2(nextY - currentY, nextX - currentX));
              const endX = nextX - radius * Math.cos(Math.atan2(nextY - currentY, nextX - currentX));
              const endY = nextY - radius * Math.sin(Math.atan2(nextY - currentY, nextX - currentX));
              drawLine(startX, startY, endX, endY);
            }
        }
      
        function drawSquare(x, y, size, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(x, y, size, size);
        }
      
        function drawRectangle(x, y, width, height, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            ctx.strokeStyle = "black";
            ctx.strokeRect(x, y, width, height);
        }
      
        // Dibujar 6 circulos
        const circleSize = 30; // Tamaño del círculo en el rectángulo
        const circleGap = 40; // Espacio entre los círculos
        const circlesCount = 6; // Cantidad de círculos

        if (batalla == 0) {
            for (let i = 0; i < circlesCount; i++) {
                const row = Math.floor(i / 2); // Calcular fila
                const col = i % 2 - 1; // Calcular columna
                const circleX = 369 + col * (circleSize + circleGap) + circleSize / 0.45; // Posición en X del círculo
                const circleY = 580 + row * (circleSize + circleGap) + circleSize / 8; // Posición en Y del círculo
                colorBattleCircle = "lightgrey"       
                    drawCircle(circleX, circleY, circleSize, colorBattleCircle);
                }
        }
      
        // Dibujar los rectángulos
        const rectWidth = 63 * 2; // Ancho del rectángulo
        const rectHeight = 88 * 2; // Alto del rectángulo
    
        const rectX1 = centerX - rectWidth / 1.5 - 125;
        const rectY1 = centerY + distance * 4.7;
        const rectX2 = centerX - rectWidth / 2 + 150;
        const rectY2 = centerY + distance * 4.7;

        function drawImageOnCanvas(imagePath, x, y, width, height) {
            const image = new Image();
            image.src = imagePath;
          
            image.onload = function() {
              ctx.drawImage(image, x, y, width, height);
            };
          }
      
        drawRectangle(rectX1, rectY1, rectWidth, rectHeight, "lightgrey");
        drawRectangle(rectX1, rectY1 + rectHeight + 3, rectWidth, 30, "lightgrey");
        drawImageOnCanvas('./assets/00_ash.png', rectX1, rectY1, rectWidth, rectHeight);
        
        drawRectangle(rectX2, rectY2, rectWidth, rectHeight, "lightgrey");
        drawRectangle(rectX2, rectY2 + rectHeight + 3, rectWidth + 30, 30, "lightgrey");

        var randomPX = 40
        var randomPY = 450
        var randomDMT = 30
        var colorX1 = "lightgrey"
        var colorX2 = "lightgrey"
        var colorX3 = "lightgrey"
        var colorX4 = "lightgrey"
        var colorX5 = "lightgrey"
        if (capturado1==1) { colorX1 = "green"} else if (capturado1==2) {colorX1 = "red"}
        if (capturado2==1) { colorX2 = "green"} else if (capturado2==2) {colorX2 = "red"}
        if (capturado3==1) { colorX3 = "green"} else if (capturado3==2) {colorX3 = "red"}
        if (capturado4==1) { colorX4 = "green"} else if (capturado4==2) {colorX4 = "red"}
        if (capturado5==1) { colorX5 = "green"} else if (capturado5==2) {colorX5 = "red"}
        drawCircle(randomPX, randomPY, randomDMT, colorX1);
        drawCircle(randomPX, randomPY + 70, randomDMT, colorX2);
        drawCircle(randomPX, randomPY + 140, randomDMT, colorX3);
        drawCircle(randomPX, randomPY + 210, randomDMT, colorX4);
        drawCircle(randomPX, randomPY + 280, randomDMT, colorX5);

        
        if (miTrio.length > 0 && miTrio[0] && miTrio[0].image && miTrio[0].image.thumbnail) {
            drawImageOnCanvas(miTrio[0].image.thumbnail, 347, 576, 35, 35);
            var offSetLeg = 0
            if (miTrio[0].cp == 10) {
                offSetLeg += 10
            }
            clearAndWriteText(miTrio[0].cp, 347 + 27 - offSetLeg, 573, '16px Arial');
        }
        if (miTrio.length > 1 && miTrio[1] && miTrio[1].image && miTrio[1].image.thumbnail) {
            drawImageOnCanvas(miTrio[1].image.thumbnail, 347, 646, 35, 35);
            var offSetLeg = 0
            if (miTrio[1].cp == 10) {
                offSetLeg += 10
            }
            clearAndWriteText(miTrio[1].cp, 347 + 27 - offSetLeg, 643, '16px Arial');
        }
        if (miTrio.length > 2 && miTrio[2] && miTrio[2].image && miTrio[2].image.thumbnail) {
            drawImageOnCanvas(miTrio[2].image.thumbnail, 347, 716, 35, 35);
            var offSetLeg = 0
            if (miTrio[2].cp == 10) {
                offSetLeg += 10
            }
            clearAndWriteText(miTrio[2].cp, 347 + 27 - offSetLeg, 713, '16px Arial');
        }


        if (lider && ficha != null) {
            /*var potenciador = 0
            if (ficha == 4) {
                potenciador = 1
            }
            if (ficha == 5) {
                potenciador = 2
            }*/

            drawImageOnCanvas(liderAleatorio.asset, rectX2, rectY2, rectWidth, rectHeight);
        
            drawImageOnCanvas(pokemonLider[0].image.thumbnail, 423, 572, 35, 35);
            drawImageOnCanvas(pokemonLider[1].image.thumbnail, 423, 642, 35, 35);
            drawImageOnCanvas(pokemonLider[2].image.thumbnail, 423, 712, 35, 35);
            clearAndWriteText(pokemonLider[0].cp + potenciador, 418, 573, '16px Arial');
            clearAndWriteText(pokemonLider[1].cp + potenciador, 418, 643, '16px Arial');
            clearAndWriteText(pokemonLider[2].cp + potenciador, 418, 713, '16px Arial');
                    
            if (ficha < 5) {
                drawImageOnCanvas(pokemonRandoms[0].image.thumbnail, randomPX - 22, randomPY - 21, randomDMT * 1.45, randomDMT * 1.45);
                drawImageOnCanvas(pokemonRandoms[1].image.thumbnail, randomPX - 22, randomPY + 48, randomDMT * 1.45, randomDMT * 1.45);
                drawImageOnCanvas(pokemonRandoms[2].image.thumbnail, randomPX - 22, randomPY + 118, randomDMT * 1.45, randomDMT * 1.45);
        
                if (ficha < 4) {
                    drawImageOnCanvas(pokemonRandoms[3].image.thumbnail, randomPX - 22, randomPY + 188, randomDMT * 1.45, randomDMT * 1.45);
                    drawImageOnCanvas(pokemonRandoms[4].image.thumbnail, randomPX - 22, randomPY + 258, randomDMT * 1.45, randomDMT * 1.45);
                }
            }
        }

        function clearAndWriteText(newText, x, y, font, color) {
            ctx.fillStyle = color || 'black'; // color predeterminado: negro
            ctx.font = font || '20px Arial'; // fuente predeterminada: Arial 20px
            ctx.fillText(newText, x, y); // Coordenadas predeterminadas: (50, 50)
        }
        clearAndWriteText("Player 1", 204, 756);
        if (lider && ficha != null) {
            clearAndWriteText(nombreAleatorio, 500, 756);
        }

        const squareSize = 80; // Tamaño del cuadrado
        const gap = 0; // Espacio entre los cuadrados
        const squaresCount = 10; // Cantidad de cuadrados
      
        // Dibujar los cuadrados consecutivos
        for (let i = 0; i < squaresCount; i++) {
            const squareX = i * (squareSize + gap); // Posición en el eje X
            const squareY = ctx.canvas.height - squareSize; // Posición en el eje Y
            var colorCuadrados = "lightsalmon"
            if (miEquipo[i] && miEquipo[i].alive == false){
                colorCuadrados = "grey"
                /*for (let y = 0; y < miTrio; y++) {
                    if (miTrio[y] == miEquipo[i]) {
                        miTrio.splice(y, 1)
                    }
                }*/
            } 
            drawSquare(squareX, squareY, squareSize, colorCuadrados);
        }

        if (lider && ficha != null) {
            var offSetX = 4 
            miEquipo.forEach(pokemon => {
                drawImageOnCanvas(pokemon.image.thumbnail, offSetX, 800, 45, 45)
                clearAndWriteText(pokemon.name, offSetX - 1, 783, '13px Arial');
                clearAndWriteText(pokemon.rarity, offSetX + 55, 846, '13px Arial');
                clearAndWriteText(pokemon.cp, offSetX + 50, 804, '19px Arial');
                offSetX += 80
            });
        }
    });

}      

/*
// UNIR CONJUNTOS
const conjunto1 = [2, 5, 8, 11, 20, 22, 24, 26, 28, 30, 33, 36, 38, 40, 42, 44, 47, 49, 51, 53, 55, 57, 59, 61, 64, 67, 70, 73, 75, 78, 80, 82, 83, 85, 87, 89, 91, 93, 96, 97, 99, 101, 103, 105, 106, 107, 108, 110, 112, 113, 114, 115, 117, 119, 121, 122, 123, 124, 125, 126, 127, 128, 130, 134, 135, 136, 137, 139, 141, 148];
const conjunto2 = [3, 6, 9, 12, 15, 18, 31, 34, 45, 62, 65, 68, 71, 76, 94, 131, 142, 143, 149];
const conjunto3 = [144, 145, 146, 150];
const arrayOrdenado = conjunto1.concat(conjunto2, conjunto3).sort((a, b) => a - b);
console.log(arrayOrdenado);
*/
/*
// CUANTOS FALTAN DEL arrayOrdenado
const listaNumeros = new Set([2, 3, 5, 6, 8, 9, 11, 12, 15, 18, 20, 22, 24, 26, 28, 30, 31, 33, 34, 36, 38, 40, 42, 44, 45, 47, 49, 51, 53, 55, 57, 59, 61, 62, 64, 65, 67, 68, 70, 71, 73, 75, 76, 78, 80, 82, 83, 85, 87, 89, 91, 93, 94, 96, 97, 99, 101, 103, 105, 106, 107, 108, 110, 112, 113, 114, 115, 117, 119, 121, 122, 123, 124, 125, 126, 127, 128, 130, 131, 134, 135, 136, 137, 139, 141, 142, 143, 144, 145, 146, 148, 149, 150]);
const conjuntoCompleto = new Set(Array.from({ length: 150 }, (_, i) => i + 1));
const conjuntoFaltante = new Set([...conjuntoCompleto].filter(num => !listaNumeros.has(num)));
const numerosFaltantes = Array.from(conjuntoFaltante).sort((a, b) => a - b);
console.log(numerosFaltantes);
*/