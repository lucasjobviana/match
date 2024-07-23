
// import { QueryInterface } from 'sequelize';
// import { readFileSync } from 'fs';
// import { resolve } from 'path';

// export default { 
//   up: async (queryInterface: QueryInterface) => {
//     const images = [
//       { fileName: 'alexi.jpeg', userId: 1 },
//       { fileName: 'alexi1.jpeg', userId: 1 },
//       { fileName: 'axl.jpeg', userId: 2 },
//       { fileName: 'axl1.jpeg', userId: 2 },
//       { fileName: 'axl2.jpeg', userId: 2 },
//       { fileName: 'clara.jpeg', userId: 3 },
//       { fileName: 'clara1.jpeg', userId: 3 },
//       { fileName: 'clara2.jpeg', userId: 3 },
//       { fileName: 'dez.jpeg', userId: 4 },
//       { fileName: 'emma.jpeg', userId: 5 },
//       { fileName: 'emma1.jpeg', userId: 5 },
//       // Adicione mais imagens aqui conforme necessário
//     ];

//     const imageRecords = images.map(image => {
//       const imagePath = resolve(__dirname, 'imgs', image.fileName);
//       const imageData = readFileSync(imagePath);
//       return {
//         file_name: image.fileName,
//         file_data: imageData,
//         user_id: image.userId
//       };
//     });

//     await queryInterface.bulkInsert('images_blob', imageRecords, {});
//   },

//   down: async (queryInterface: QueryInterface) => {
//     await queryInterface.bulkDelete('images_blob', {});
//   },
// };
import { QueryInterface } from 'sequelize';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export default {
  up: async (queryInterface: QueryInterface) => {
    const users = [
      { id: 1, firstName: 'Alexi' },
      { id: 2, firstName: 'Axl' },
      { id: 3, firstName: 'Clara' },
      { id: 4, firstName: 'Dez' },
      { id: 5, firstName: 'Emma' },
      { id: 6, firstName: 'Jack' },
      { id: 7, firstName: 'Mary' },
      { id: 8, firstName: 'Scarlett' },
      { id: 9, firstName: 'Pessoa' },
      { id: 10, firstName: 'Pessoa' },
      { id: 11, firstName: 'Pessoa' },
      { id: 12, firstName: 'Pessoa' },
      { id: 13, firstName: 'Pess' },
      { id: 14, firstName: 'Pesoa' },
      { id: 15, firstName: 'Pesoa' },
      { id: 16, firstName: 'Pesoa' },
      { id: 17, firstName: 'Pess' },
      { id: 18, firstName: 'Pess' },
    ];

    const images = users.flatMap(user => {
      return [0, 1, 2].map(i => ({
        fileName: `${user.firstName.toLowerCase()}${i}.jpeg`,
        userId: user.id
      }));
    });

    const imageRecords = images.map(image => {
      const imagePath = resolve(__dirname, 'imgs', image.fileName);
      const imageData = readFileSync(imagePath);
      return {
        file_name: image.fileName,
        file_data: imageData,
        user_id: image.userId
      };
    });

    await queryInterface.bulkInsert('images_blob', imageRecords, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('images_blob', {});
  },
};

