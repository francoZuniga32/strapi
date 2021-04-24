const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Usuarios extends Model {}
Usuarios.init({
    nombreusuario: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    contraseña: { type: DataTypes.STRING },
    foto: { type: DataTypes.STRING },
    token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
    }
}, {
    sequelize,
    modelName: 'Usuarios',
});

module.exports = Usuarios;