'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.addConstraint('Compras', {
            fields: ['usuario'],
            type: 'foreign key',
            name: 'usuario-vendedor',
            references: { //Required field
                table: 'Usuarios',
                field: 'id'
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