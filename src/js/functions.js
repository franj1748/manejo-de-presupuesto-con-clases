
/**
 * Todas las funciones de la app.
 * @module Funciones
 */

/**
 * Despliega un mensaje para obtener el presupuesto con el que se trabajará. 
 */
 function obtenerPresupuesto(){

    swal("¿Cuál es su presupuesto?:", {
        content: "input",
    })
    .then((presupuestoIngresado) => {

        // Si el valor ingresado no es válido. 
        if (presupuestoIngresado === '' || presupuestoIngresado === null || isNaN(presupuestoIngresado) || presupuestoIngresado <= 0) {

            // Arroja una alerta y recarga la página para volver a preguntar el presupuesto. 
            swal({
                title: "¡Algo salió mal!",
                text: "Ingrese un número positivo válido y presione OK",
                icon: "error",
            }).then((valor) => {
                if (valor === null || valor === true) {
        
                    location.reload();
                }
            });
        }else{

            // Si el presupuesto es válido, se crea una instancia de la clase Presupuesto y se pasa como argumento al método que lo inserta en el HTML. 
            presupuesto = new Presupuesto(presupuestoIngresado);
            ui.insertarPresupuesto(presupuesto);
            btnAgregar.disabled = false;
            btnIniciar.disabled = true; 
        }
    });

}


/**
 * Si se supera la validación del formulario, se crea el objeto del gasto y se pasa la información necesaria al resto de los métodos para agregar el gasto al DOM.
 * @param {Event} e Evento submit del formulario. 
 * @return {void} Regresa a la función de validación si el campo de la cantidad del gasto no contiene un valor válido. 
 */
function agregarGasto(e){

    const cantidadGasto      = document.querySelector('#cantidadGasto');
    const errorCantidadGasto = document.querySelector('#errorCantidadGasto');

    if(isNaN(cantidadGasto.value) || cantidadGasto.value < 0 ){
        e.preventDefault();

        cantidadGasto.classList.add('is-invalid', 'form-input-invalid');
        cantidadGasto.classList.remove('form-input-valid');
        errorCantidadGasto.textContent = 'Ingresa un número válido';
        cantidadGasto.focus();
        return;

    }else{
        e.preventDefault();
        
        cantidadGasto.classList.add('form-input-valid');
        cantidadGasto.classList.remove('is-invalid', 'form-input-invalid');
        errorCantidadGasto.textContent = 'Este campo no puede estar vacío';
        
        const nombre   = document.querySelector('#nombreGasto').value;
        const cantidad = Number(cantidadGasto.value);
        const gasto    = {nombre, cantidad, id: Date.now()};
    
        presupuesto.nuevoGasto(gasto);
    
        const {gastos, restante} = presupuesto;
        ui.agregarGastoDom(gastos); 
        ui.actualizarRestante(restante);
        ui.comprobarPresupuesto(presupuesto);
        
        nombreGasto.focus();
        forms[0].reset();        
    }
    
}


/**
 * Recibe el id del gasto que quiere ser eliminado y llama a los métodos necesarios para eliminar ese gasto, actualizar la lista de gastos en el DOM, verificar el nuevo restante y comprobar el presupuesto. 
 * @param {Number} id Identificador único del gasto. 
 */
function borrarGasto(id){

    presupuesto.borrarGasto(id);
    const {gastos, restante} = presupuesto;
    ui.agregarGastoDom(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}