// Variables
/** 
 * El objeto que se instancia de la clase Presupuesto para contener la información del restante y los gastos. 
 * @type {Object}
*/
let presupuesto;
/**
 * Contenedor del presupuesto con el que se inicia.
 * @type {HTMLElement}
*/
const presupuestoInicial = document.querySelector('#presupuestoInicial :nth-child(2)');

/** 
 * Contenedor del cálculo del restante del presupuesto. 
 * @type {HTMLElement} 
*/
const restanteInicial    = document.querySelector('#restanteInicial :nth-child(2)');
/** 
 * Contenedor de los gastos que se van agregando dinámicamente con JS. 
 * @type {HTMLElement} 
*/
const listaGastos        = document.querySelector('#listaGastos');
/** 
 * Captura de los formularios de la aplicación. 
 * @type {NodeList} 
*/
const forms              = document.querySelectorAll('.needs-validation');
/** 
 * Input donde se ingresa la cantidad del gasto. 
 * @type {HTMLElement} 
*/
const cantidadGasto      = document.querySelector('#cantidadGasto');
/** 
 * Input donde se ingresa el nombre del gasto. 
 * @type {HTMLElement} 
*/
const nombreGasto        = document.querySelector('#nombreGasto');
/** 
 * Botón para iniciar la app y solicitar el presupuesto inicial. 
 * @type {HTMLElement} 
*/
const btnIniciar         = document.querySelector('#iniciarPresupuesto');
/** 
 * Botón para agregar un gasto a la lista. 
 * @type {HTMLElement} 
*/
const btnAgregar         = document.querySelector('#agregarGasto');

// Listeners 
document.addEventListener('DOMContentLoaded', () => {

    btnAgregar.disabled = true;

});

btnIniciar.addEventListener('click', obtenerPresupuesto);

// Validación de formularios con Bootstrap
Array.from(forms).forEach(form => {
    // Agrega un Listener de tipo submit a todos los formulario de la app. 
    form.addEventListener('submit', e => {
        // Si no se cumple la validación se previene el envío del formulario.  
        if (!form.checkValidity()) {
            
            e.preventDefault();

            if (nombreGasto.value === '') {
                
                nombreGasto.focus();
                
            }else{

                cantidadGasto.focus();
            }
            
        }else{
            // Si pasa la validación, se crea el gasto. 
            agregarGasto(e);
        }
        
        form.classList.add('was-validated');
    }, false);
})




