const controlador = {};

controlador.porcentaje = async(precio) => {
    const porcentaje = 5;
    var retorno = (porcentaje / 100) * precio;
    return parseFloat(retorno);
};

module.exports = controlador;