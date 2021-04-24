'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        //cambios en instrumentales
        await queryInterface.changeColumn('Instrumentales', 'minuatura', Sequelize.INTEGER);
        await queryInterface.changeColumn('Instrumentales', 'mp3', Sequelize.INTEGER);
        await queryInterface.changeColumn('Instrumentales', 'wav', Sequelize.INTEGER);
        await queryInterface.changeColumn('Instrumentales', 'sample', Sequelize.INTEGER);
        //cambios en album
        await queryInterface.changeColumn('Albumes', 'minuatura', Sequelize.INTEGER);
        await queryInterface.changeColumn('Albumes', 'sample', Sequelize.INTEGER);

        await queryInterface.addConstraint('Instrumentales', {
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

        await queryInterface.addConstraint('Instrumentales', {
            fields: ['mp3'],
            type: 'foreign key',
            name: 'filamp3',
            references: { //Required field
                table: 'Files',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('Instrumentales', {
            fields: ['wav'],
            type: 'foreign key',
            name: 'filawav',
            references: { //Required field
                table: 'Files',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('Instrumentales', {
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