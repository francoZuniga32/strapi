'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Usuarios', 'token', Sequelize.UUID, {
            before: 'createdAt'
        });
    },

    down: async(queryInterface, Sequelize) => {

    }
};