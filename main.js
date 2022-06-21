
function calcularModificador(caracteristica)
{
    let modificador = 0;
    let retorno;
    if(caracteristica<10)
    {
        for(let i = 10; i>=caracteristica; i--)
        {
            if(!(i%2 == 0))
            {
                modificador -= 1;
            }
        }
        retorno = modificador;
    }
    else
    {
        for(let i = 11; i<=caracteristica; i++)
        {
            if(i%2 == 0)
            {
                modificador += 1;
            }
        }
        retorno = "+" + modificador;
    }

    return retorno;
}


function agregarRazas(razas)
{
    let newForm = document.getElementById('formRazas');

    let contador = 0;
    let texto = '';
    for(let raza of razas)
    {
        texto += `<input type="radio" name="raza" id="raza${contador}" value="${raza.nombre}" class="radio-raza">
                  <label for="raza${contador}" class="radio-r mode-radio">
                  <div class="nombre-raza">${raza.nombre}</div>
                  </label>`;
        contador++;
    }
    newForm.innerHTML = texto;
}

function agregarClases(clases)
{
    let newForm = document.getElementById('formClases');

    let contador = 0;
    let texto = '';
    for(let clase of clases)
    {
        texto += `<input type="radio" name="clase" id="clase${contador}" value="${clase.nombre}" class="radio-clase">
                  <label for="clase${contador}" class="radio-c mode-radio">
                  <div class="nombre-clase">${clase.nombre}</div>
                  </label>`;
        contador++;
    }
    newForm.innerHTML = texto;
}


function agregarPuntos2(caracteristica, arrayNumeros)
{
    let destino = document.getElementById('idCaracteristicas'); 
    let newDiv = document.createElement('div');
    let menor = encontrarMenor(arrayNumeros);
    let suma = calcularPuntaje(arrayNumeros, menor);
    let flag = 0;

    newDiv.className = 'carac';
    let texto = `<p class="nombreCarac mode">${caracteristica.nombre}</p>
                 <div class="puntoSuma puntos-mode">${suma}</div><div class="listaPun">`;
    arrayNumeros.forEach(num => {
        if(num == menor && flag == 0)
        {
            texto += `<p class="unNum numMenor">${num}</p>`
            flag = 1;
        }
        else
        {
            texto += `<p class="unNum puntos-mode">${num}</p>`
        }
    });
    texto += `</div>`;

    newDiv.innerHTML = texto;
    destino.append(newDiv);

    caracteristica.puntos = suma;
}

function mostrarPersonaje(personaje, caracteristicas)
{
    const {nombrePersonaje, nombreUsuario, raza, clase, habilidades, puntosCaracteristica} = personaje;

    let destino = document.getElementById('destinoPersonaje');
    let newDiv = document.createElement('div');
    newDiv.id = 'divPersonaje';
    let texto = `<div id="nombresPer"><h1 class="text-center mode">Personaje de ${nombreUsuario}</h1><h1 class="nombrePer mode">${nombrePersonaje}</h1></div>`;
    texto += `<div id="razaClase"><div id="divINFO"><p class="div-info mode" id="raza-clase"><strong>Raza: </strong>${raza.nombre}<strong><br><br>Clase: </strong>${clase.nombre}</p><br><br>`;
    texto += `<p class="div-info mode" id="habilidades"><strong><br>Habilidades:<br> </strong><br>∘ ${habilidades.join('<br>∘ ')}</p></div><div id="finCarac">`;

    let cont = 0;
    for(let carac of caracteristicas)
    {
        texto += `<div class="fin-carac carac-mode"><p class="nombreCarac nombreCaracEx mode">${carac.nombre}</p><p class="modificador mode">${calcularModificador(puntosCaracteristica[cont])}</p><p class="punto-fin">${personaje.puntosCaracteristica[cont]}</p></div>`;
        cont ++;
    }

    texto += `</div></div>`;

    newDiv.innerHTML = texto;
    destino.append(newDiv);

}

function darkMode()
{
    document.body.classList.toggle('dark');
    document.querySelector('.form').classList.toggle('dark');
    let mode = document.querySelectorAll('.mode');
    mode.forEach(m => {
        m.classList.toggle('dark');
    })

    let input = document.querySelectorAll('.input');
    input.forEach(i => {
        i.classList.toggle('dark');
    })

    let radio = document.querySelectorAll('.mode-radio');
    radio.forEach(r => {
        r.classList.toggle('dark');
    })

    let puntos = document.querySelectorAll('.puntos-mode');
    puntos.forEach(p => {
        p.classList.toggle('dark');
    })

    let menor = document.querySelectorAll('.numMenor');
    menor.forEach(p => {
        p.classList.toggle('dark');
    })

    let num = document.querySelectorAll('.punto-fin');
    num.forEach(p => {
        p.classList.toggle('dark');
    })
}

function ocultar(id)
{
    let elemento = document.getElementById(id);
    elemento.style.display = 'none';
    elemento.style.visibility = 'hidden';
}

function mostrar(id)
{
    let elemento = document.getElementById(id);
    elemento.style.display = 'block';
    elemento.style.visibility = 'visible';
}


function tirarDados2() 
{
    let numero;
    let numeros = [];

    for(let i=0; i<4; i++)
    {
        numero = Math.floor(Math.random() * 6) + 1;
        numeros.push(numero);
    }
    return numeros;
}

function encontrarMenor(numeros) 
{
    let menor = Math.min(...numeros);

    return menor;
}

function calcularPuntaje(array, menor) 
{
    let acumulador = 0;
    let flag = 0;
    array.forEach(num => {
        acumulador += num;
        if(num == menor && flag == 0)
        {
            acumulador -= num;
            flag = 1;
        }
    });
    return acumulador;
}


class Raza
{
    constructor(nombre, puntosCaracteristica)
    {
        this.nombre = nombre;
        this.puntosCaracteristica = puntosCaracteristica;
    }
}

class Clase
{
    constructor(nombre, habilidades)
    {
        this.nombre = nombre;
        this.habilidades = habilidades;
    }
}

class Personaje
{
    constructor(nombrePersonaje, nombreUsuario, raza, clase, habilidades, puntosCaracteristica)
    {
        this.nombrePersonaje = nombrePersonaje;
        this.nombreUsuario = nombreUsuario;
        this.raza = raza;
        this.clase = clase;
        this.habilidades = habilidades;
        this.puntosCaracteristica = puntosCaracteristica;
    }
    asignarBonus()
    {
        for(let i = 0; i<6; i++)
        {
            this.puntosCaracteristica[i] += this.raza.puntosCaracteristica[i];
        }
    }
}




const draconido = new Raza("Dracónido", [2, 0, 0, 2, 0, 1]);
const elfo = new Raza("Elfo", [0, 2, 0, 0, 0, 0]);
const enano = new Raza("Enano", [0, 0, 2, 0, 0, 0]);
const gnommo = new Raza("Gnomo", [0, 0, 0, 2, 0, 0]);
const humano = new Raza("Humano", [1, 1, 1, 1, 1, 1]);
const mediano = new Raza("Mediano", [0, 2, 0, 0, 0, 0]);
const semielfo = new Raza("Semielfo", [0, 0, 0, 0, 0, 2]);
const semiorco = new Raza("Semiorco", [2, 0, 1, 0, 0, 0]);
const tiflin = new Raza("Tiflin", [0, 0, 0, 0, 0, 2]);

const barbaro = new Clase("Bárbaro", ["Furia", "Defensa sin armadura"]);
const bardo = new Clase("Bardo", ["Inspiración de bardo", "Lanzamiento de conjuros"]);
const brujo = new Clase("Brujo", ["Magia del pacto"]);
const clerigo = new Clase("Clérigo", ["Dominio divino", "Lanzamiento de conjuros"]);
const druida = new Clase("Druida", ["Lanzamiento de conjuros"]);
const explorador = new Clase("Explorador", ["Enemigo predilecto", "Explorador de la naturaleza"]);
const guerrero = new Clase("Guerrero", ["Estilo de combate", "Nuevas energías"]);
const hechicero = new Clase("Hechicero", ["Lanzamiento de conjuros"]);
const mago = new Clase("Mago", ["Recuperación arcana", "Lanzamiento de conjuros"]);
const monje = new Clase("Monje", ["Defensa sin armadura"]);
const paladin = new Clase("Paladín", ["Sentidos divinos", "Imponer las manos"]);
const picaro = new Clase("Pícaro", ["Ataque furtivo"]);

const personaje = new Personaje('', '', draconido, barbaro, barbaro.habilidades, []);

let nombreUsuario;
let nombrePersonaje;
let razas = [draconido, elfo, enano, gnommo, humano, mediano, semielfo, semiorco, tiflin];
let clases = [barbaro, bardo, brujo, clerigo, druida, explorador, guerrero, hechicero, mago, monje, paladin, picaro];

let caracteristicas = [{nombre: "Fuerza", puntos: 0}, 
                       {nombre: "Destreza", puntos: 0},
                       {nombre: "Constitución", puntos: 0},
                       {nombre: "Inteligencia", puntos: 0},
                       {nombre: "Sabiduría", puntos: 0},
                       {nombre: "Carisma", puntos: 0}];


let razaPersonaje;
let clasePersonaje;
let flagMode = 0;


agregarRazas(razas);
agregarClases(clases);
ocultar('divRazas');
ocultar('divPuntos');
ocultar('divPersonaje');

caracteristicas.forEach(carac => {
    agregarPuntos2(carac, tirarDados2())    
});


let btnContinuar = document.getElementById('idbtn');
let btnContinuar2 = document.getElementById('idbtn2');
let btnContinuar3 = document.getElementById('idbtn3');
let btnDeNuevo = document.getElementById('idbtnagain');
let btnFinalizar = document.getElementById('idbtn4');

btnContinuar.addEventListener('click', ()=>{
    nombreUsuario = document.getElementById('idNombre').value || 'Fulano';
    nombrePersonaje = document.getElementById('idPersonaje').value  || 'Mengano';

    personaje.nombreUsuario = nombreUsuario;
    personaje.nombrePersonaje = nombrePersonaje;
    ocultar('idNombres');
    mostrar('divRazas');
})

btnContinuar2.addEventListener('click', ()=>{
    let razaRadio = document.querySelector('input[name="raza"]:checked').value;
        for(let raza of razas)
        {
            if(razaRadio == raza.nombre)
            {
                personaje.raza = raza; 
            }
        }
    ocultar('divRazas');
    mostrar('divClases');
})

btnContinuar3.addEventListener('click', ()=>{
    let claseRadio = document.querySelector('input[name="clase"]:checked').value;
        for(let clase of clases)
        {
            if(claseRadio == clase.nombre)
            {
                personaje.clase = clase; 
                personaje.habilidades = clase.habilidades;
            }
        }

        ocultar('divClases');
        mostrar('divPuntos');

        personaje.puntosCaracteristica = [caracteristicas[0].puntos, caracteristicas[1].puntos, caracteristicas[2].puntos, caracteristicas[3].puntos, caracteristicas[4].puntos, caracteristicas[5].puntos];

        mostrarPersonaje(personaje, caracteristicas);
})

btnDeNuevo.addEventListener('click', ()=>{
    let div = document.getElementById('idDestinoP');
    let remover = document.getElementById('idCaracteristicas');
    div.removeChild(remover);
    let destino = document.getElementById('idDestinoP');
    let newDiv = document.createElement('div');
    newDiv.id = 'idCaracteristicas';
    destino.append(newDiv);
    caracteristicas.forEach(carac => {
        agregarPuntos2(carac, tirarDados2())    
    });
})

btnFinalizar.addEventListener('click', ()=>{
    ocultar('divPuntos');
    ocultar('titulo');
    mostrar('divPersonaje');

    if(flagMode!=0 || flagMode%2!=0 || localStorage.getItem('dark-mode') === 'true'){
        let mode = document.querySelectorAll('.mode');
        mode.forEach(m => {
            m.classList.toggle('dark');
        })
        let num = document.querySelectorAll('.punto-fin');
        num.forEach(p => {
            p.classList.toggle('dark');
        })
    }
})

let btnSwitch = document.getElementById('switch');


//modo oscuro
btnSwitch.addEventListener('change', ()=>{
    darkMode();
    flagMode ++;

    document.body.classList.contains('dark') ? localStorage.setItem('dark-mode', 'true') : localStorage.setItem('dark-mode', 'false');

})


if(localStorage.getItem('dark-mode') === 'true'){

    document.body.classList.add('dark');
    document.querySelector('.form').classList.add('dark');
    let mode = document.querySelectorAll('.mode');
    mode.forEach(m => {
        m.classList.add('dark');
    })

    let input = document.querySelectorAll('.input');
    input.forEach(i => {
        i.classList.add('dark');
    })

    let radio = document.querySelectorAll('.mode-radio');
    radio.forEach(r => {
        r.classList.add('dark');
    })

    let puntos = document.querySelectorAll('.puntos-mode');
    puntos.forEach(p => {
        p.classList.add('dark');
    })

    let menor = document.querySelectorAll('.numMenor');
    menor.forEach(p => {
        p.classList.add('dark');
    })

    let num = document.querySelectorAll('.punto-fin');
    num.forEach(p => {
        p.classList.add('dark');
    })

    document.getElementById('switch').checked = true;

}