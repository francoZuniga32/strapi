'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.addConstraint('Vendedores', {
            fields: ['idusuario'],
            type: 'foreign key',
            name: 'usuario-vendedor',
            references: { //Required field
                table: 'Usuarios',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('Vendedores', {
            fields: ['idusuario'],
            type: 'primary key',
            name: 'idusuario'
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