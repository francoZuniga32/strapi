'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        //mp3
        await queryInterface.addConstraint('Filesmp3', {
            fields: ['fileid'],
            type: 'foreign key',
            name: 'fileid',
            references: { //Required field
                table: 'Files',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('Filesmp3', {
            fields: ['instrumentalid'],
            type: 'foreign key',
            name: 'instrumentalid',
            references: { //Required field
                table: 'Instrumentales',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        //sample
        await queryInterface.addConstraint('Filesample', {
            fields: ['fileid'],
            type: 'foreign key',
            name: 'fileid',
            references: { //Required field
                table: 'Files',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('Filesample', {
            fields: ['instrumentalid'],
            type: 'foreign key',
            name: 'instrumentalid',
            references: { //Required field
                table: 'Instrumentales',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        //wav
        await queryInterface.addConstraint('Filewav', {
            fields: ['fileid'],
            type: 'foreign key',
            name: 'fileid',
            references: { //Required field
                table: 'Files',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('Filewav', {
            fields: ['instrumentalid'],
            type: 'foreign key',
            name: 'instrumentalid',
            references: { //Required field
                table: 'Instrumentales',
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