'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.addConstraint('Carritos-Albumes', {
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
        queryInterface.addConstraint('Carritos-Albumes', {
            fields: ['idalbum'],
            type: 'foreign key',
            name: 'carrito-album',
            references: { //Required field
                table: 'Albumes',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('Carritos-Albumes', {
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