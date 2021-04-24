'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user: {
                type: Sequelize.INTEGER
            },
            tipe: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            meta: {
                type: Sequelize.JSON
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addConstraint('Files', {
            fields: ['user'],
            type: 'foreign key',
            name: 'filesuser',
            references: { //Required field
                table: 'Vendedores',
                field: 'idusuario'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Files');
    }
};