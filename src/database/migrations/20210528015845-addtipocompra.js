"use strict";

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.addColumn("Compras", "tipo", Sequelize.INTEGER, {
            after: "id", // after option is only supported by MySQL
        });
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};