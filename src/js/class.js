/**
 * Permite crear instancias que contengan el presupuesto inicial, el restante y el array de los gastos. 
 *
 * @class Presupuesto
 * 
 * @example
 * 
 * presupuesto = new Presupuesto(presupuestoIngresadoPorElUsuario);
 *
 * @see https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes
 */
 class Presupuesto{


    /**
     * Crea una instancia de la clase.
     * @param {Object} presupuesto El presupuesto que agrega el cliente. 
     * @memberof Presupuesto
     */
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante    = Number(presupuesto);
        this.gastos      = [];
    }


    /**
     * Llena el arreglo con los gastos que se van generando y llama al método necesario para calcular el restando según los gastos.
     * @param {Object} gasto Objeto que contiene la información del gasto ingresado, como su nombre, cantidad y id. 
     * @memberof Presupuesto
     */
    nuevoGasto(gasto){

        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }


    /**
     * Calcula el restante del presupuesto según el total de los gastos.  
     * @memberof Presupuesto
     */
    calcularRestante(){

        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0 );
        this.restante = this.presupuesto - gastado; 
    }


    /**
     * Crea un nuevo array con los gastos eliminando el gasto que coincida con el id que fue eliminado.
     * @param {Number} id Identificador único de cada gasto.
     * @memberof Presupuesto
     */
    borrarGasto(id){

        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
}


/**
 * Contiene métodos para controlar todo lo relacionado con la interfaz gráfica y los elementos del DOM. 
 * @class UI
 * 
 * @example
 * 
 * const ui = new UI();
 *
 * @see https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes
 */
class UI {

    /**
     * Inserta el presupuesto inicial y el restante en el DOM.
     * @param {Object} cantidad Instancia de Presupuesto, que contiene el presupuesto, el restante y los gastos.
     * @memberof UI
     */
    insertarPresupuesto(cantidad){

        const {presupuesto, restante} = cantidad;

        document.querySelector('#presupuestoTotal').textContent = `${presupuesto}`;
        document.querySelector('#restante').textContent = `${restante}`;
    }

    
    /**
     * Genera los elementos HTML que insertan un gasto en el DOM. 
     * @param {Array} gastos Arreglo de gastos, que contiene el nombre, cantidad y id de cada gasto. 
     * @memberof UI
     */
    agregarGastoDom(gastos){

        this.limpiarHTML();

        // Se itera sobre el arreglo de objetos que contienen la información de los gastos.  
        gastos.forEach(gasto => {
            
            // Creación del botón para eliminar los gastos. 
            let btnEliminar         = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
            btnEliminar.textContent = 'Borrar';
            btnEliminar.onclick     = () => {
                borrarGasto(id);
            };       

            const {nombre, cantidad, id } = gasto;

            // Cada elemento de lista generado es un gasto agregado. 
            const contenedorGastos     = document.createElement('div');
            contenedorGastos.innerHTML = `
                <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${id}">
                    ${nombre} <span class="badge text-bg-info">$${cantidad}</span>
                </li>
            `;

            listaGastos.appendChild(contenedorGastos);
            let elementoLista = document.querySelector(`[data-id="${id}"]`);
            elementoLista.appendChild(btnEliminar);

        });
    }


    /**
     * Limpia el HTML que contenga la lista de gastos mientras exista algún elemento, cuando se agrega o elimina un gasto. 
     * @memberof UI
     */
    limpiarHTML(){

        while (listaGastos.firstChild) {
            listaGastos.removeChild(listaGastos.firstChild);
        }
    }


    /**
     * Actualiza el restante en el DOM, una vez que ocurre algún cambio en el objeto de gastos. 
     * @param {Number} restante Cantidad que resta del presupuesto. 
     * @memberof UI
     */
    actualizarRestante(restante){

        document.querySelector('#restante').textContent = `${restante}`;

    }


    /**
     * Verifica cuánto se ha gastado del presupuesto para cambiar el color de la alerta de restante o notificar cuando se acabó el presupuesto. 
     * @param {Object} presupuestoObj El objeto que se instancia de la clase Presupuesto. 
     * @memberof UI
     */
    comprobarPresupuesto(presupuestoObj){

        const {presupuesto, restante} = presupuestoObj;
        const contenedorRestante      = document.querySelector('#restanteInicial');

        // Si se ha gastado más del 75% del presupuesto o más del 50%.
        if((presupuesto/4) > restante){
            contenedorRestante.classList.remove('alert-success', 'alert-warning');
            contenedorRestante.classList.add('alert-danger');
        }else if((presupuesto/2) > restante){
            contenedorRestante.classList.remove('alert-success');
            contenedorRestante.classList.add('alert-warning');
        }else{
            contenedorRestante.classList.remove('alert-warning', 'alert-danger');
            contenedorRestante.classList.add('alert-success');
        }

        // Si el presupuesto se acabó. 
        if (restante <= 0){
            
            swal({
                title: "¡Ya no más!",
                text: "Se agotó el presupuesto",
                icon: "error",
            });

            forms[0].querySelector('button[type="submit"]').disabled = true;

            this.actualizarRestante(0);

        }else{

            forms[0].querySelector('button[type="submit"]').disabled = false;
        }

    }

}

/** 
 * Instancia de la clase para manejar la interfaz. 
 * @type {Object}
*/
const ui = new UI();
