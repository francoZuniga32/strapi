'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Instrumentales', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombre: {
                type: Sequelize.STRING
            },
            descripcion: {
                type: Sequelize.STRING
            },
            precio: {
                type: Sequelize.REAL
            },
            categoria: {
                type: Sequelize.STRING
            },
            minuatura: {
                type: Sequelize.STRING
            },
            bpm: {
                type: Sequelize.INTEGER
            },
            escala: {
                type: Sequelize.STRING
            },
            vendedor: {
                type: Sequelize.INTEGER
            },
            licencia: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Instrumentales');
    }
};