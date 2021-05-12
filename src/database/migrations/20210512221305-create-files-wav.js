'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('FilesWavs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fileid: {
                type: Sequelize.INTEGER
            },
            instrumentalid: {
                type: Sequelize.NUMBER
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });

        await queryInterface.addConstraint('FilesWavs', {
            fields: ['fileid'],
            type: 'foreign key',
            name: 'file-id',
            references: { //Required field
                table: 'Files',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('FilesWavs', {
            fields: ['instrumentalid'],
            type: 'foreign key',
            name: 'instrumentales-id',
            references: { //Required field
                table: 'Instrumentales',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('FilesWavs');
    }
};