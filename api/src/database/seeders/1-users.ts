import { QueryInterface } from 'sequelize';

export default { 
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Alexi Laiho',
        phone: '44999133224',
        username: 'alexi',
        resume: 'Sou vocalista, guitarrista, compositor e alcolatra',
        password: 'a'
      },
      {
        name: 'Axl Rose',
        phone: '44988997764',
        username: 'axl',
        resume: 'Um eterno amante de lazanha', 
        password: 'a'
      },
      {
        name:'Clara das Neves',
        phone:'41945887455',
        username: 'clara',
        resume: 'Não sei quem sou, apenas sou quem eu sou',
        password: 'a'
      },
      {
        name:'Dez Fafara',
        phone:'4999889885',
        username: 'dez',
        resume: 'These fighting words deserve exile, banish, unbelievable',
        password: 'a'
      },
      {
        name:'Emma Stone',
        phone:'5587998722',
        username: 'emma',
        password: 'a'
      },
      {
        name:'Jack Black',
        phone:'5596633225',
        username: 'jack',
        password: 'a'
      },
      {
        name:'Mary Jane',
        phone:'5199877458',
        username: 'mary',
        resume: 'Adoro aranhas, queijo prata e dentes de leão',
        password: 'a'
      },
      {
        name:'Scarlett Johansson ',
        phone:'5587998722',
        username: 'scarlett',
        password: 'a'
      },
      {
        name:'Pessoa da Silva',
        phone:'4799899455',
        username: 'silva',
        resume: 'Oque minha mãe não tinha de criatividade tinha de humor',
        password: 'a'
      },
      {
        name:'Pessoa Viana ',
        phone:'5585514722',
        username: 'viana',
        password: 'a'
      },
      {
        name:'Pessoa das Neves ',
        phone:'5555441122',
        username: 'neves',
        password: 'a'
      },
      {
        name:'Pessoa Oliveira',
        phone:'5555668855',
        username: 'oliveira',
        password: 'a'
      },
      {
        name:'Pessoa Outra ',
        phone:'4122553322',
        username: 'outra',
        resume: 'Outra vez estamos aqui novamente repetindo a mesma redundancia',
        password: 'a'
      },
      {
        name:'Pessoa Junior',
        phone:'50445588825',
        username: 'junior',
        resume: 'Quem não gosta de arroz, que coma o feijão então',
        password: 'a'
      },
      {
        name:'Pessoa Folk',
        phone:'5522552552',
        username: 'folk',
        password: 'a'
      },
      {
        name:'Pessoa Azul',
        phone:'4565858964',
        username: 'azul',
        password: 'a'
      },
      {
        name:'Pessoa Pinto',
        phone:'1155228457',
        username: 'pinto',
        password: 'a'
      },
      {
        name:'Pessoa Sardela',
        phone:'8855221146',
        username: 'sardela',
        password: 'a'
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
