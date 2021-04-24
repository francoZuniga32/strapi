'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Vendedores', {
            idusuario: {
                type: Sequelize.INTEGER
            },
            banner: {
                type: Sequelize.STRING
            },
            mercadopago: {
                type: Sequelize.JSON
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Vendedores');
    }
};