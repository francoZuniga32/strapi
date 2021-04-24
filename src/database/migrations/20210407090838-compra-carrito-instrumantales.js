'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.addConstraint('Carritos-Instrumentales', {
            fields: ['idcompra'],
            type: 'foreign key',
            name: 'carrito-compra',
            references: { //Required field
                table: 'Compras',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('Carritos-Instrumentales', {
            fields: ['idinstrumental'],
            type: 'foreign key',
            name: 'carrito-instrumental',
            references: { //Required field
                table: 'Instrumentales',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('Carritos-Instrumentales', {
            fields: ['idcompra'],
            type: 'primary key',
            name: 'idcompra'
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