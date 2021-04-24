'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Instrumentales', [{
            nombre: "instrumental 1",
            descripcion: "descripcion instrumental",
            precio: 120.2,
            categoria: "cosa",
            minuatura: "asdfsdf",
            bpm: 120,
            escala: "sdfsdf",
            mp3: "sdf",
            wav: "sdfsdf",
            sample: "sdfasf",
            vendedor: 0,
            licencia: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', Instrumentales, {});
    }
};