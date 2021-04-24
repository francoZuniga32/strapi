'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        //agregamos las relaciones con la tabla de file
        await queryInterface.addConstraint('Albumes', {
            fields: ['minuatura'],
            type: 'foreign key',
            name: 'filaminuatura',
            references: { //Required field
                table: 'Files',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('Albumes', {
            fields: ['sample'],
            type: 'foreign key',
            name: 'filasample',
            references: { //Required field
                table: 'Files',
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