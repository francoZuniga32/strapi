'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        //eliminamos las columnas de mp3 wav y sample de instrumental
        //creamos la tabla de mp3 files
        await queryInterface.createTable('Filesmp3', {
            fileid: {
                type: Sequelize.INTEGER,
            },
            instrumentalid: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });

        //creamos la tabla de sample files
        await queryInterface.createTable('Filesample', {
            fileid: {
                type: Sequelize.INTEGER,
            },
            instrumentalid: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });

        await queryInterface.createTable('Filewav', {
            fileid: {
                type: Sequelize.INTEGER,
            },
            instrumentalid: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
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