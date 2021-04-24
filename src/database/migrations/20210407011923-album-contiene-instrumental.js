'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        queryInterface.addConstraint('Contiene-Instrumentales', {
            fields: ['idalbum'],
            type: 'foreign key',
            name: 'contiene-album',
            references: { //Required field
                table: 'Albumes',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('Contiene-Instrumentales', {
            fields: ['idinstrumental'],
            type: 'foreign key',
            name: 'contiene-instrumentakl',
            references: { //Required field
                table: 'Instrumentales',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('Contiene-Instrumentales', {
            fields: ['idalbum', 'idinstrumental'],
            type: 'primary key',
            name: 'album-instrumental'
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