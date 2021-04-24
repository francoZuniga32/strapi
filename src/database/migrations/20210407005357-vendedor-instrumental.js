'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.addConstraint('Instrumentales', {
            fields: ['vendedor'],
            type: 'foreign key',
            name: 'vendedor-instrumental',
            references: { //Required field
                table: 'Vendedores',
                field: 'idusuario'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};