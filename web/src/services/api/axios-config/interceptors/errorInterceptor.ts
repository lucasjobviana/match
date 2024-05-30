import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  const code = error.response?.status;
  console.log('errorInterceptor: error.response.status =', code);
  const message = error.response.data['message'];
  console.log('errorInterceptor: error.response.data.message =', message);

  if (error.message === 'Network Error') {
    console.log('Error: Network Error');
  }
  if (code === 400) {
    switch (message) {
    // case '"displayName" length must be at least 8 characters long': return Promise.reject(new Error('O nome deve ter pelo menos 8 caracteres'));
    // case '"password" length must be at least 6 characters long': return Promise.reject(new Error('A senha deve ter pelo menos 6 caracteres'));
    // case '"email" must be a valid email': return Promise.reject(new Error('O email deve ser válido'));
    // case '"name" is required': return Promise.reject(new Error('O nome é obrigatório'));
    // case 'Some required fields are missing': return Promise.reject(new Error('Algum campo obrigatório está faltando'));
    // case 'Invalid fields': return Promise.reject(new Error('Campos inválidos'));
    // case 'one or more "categoryIds" not found': return Promise.reject(new Error('Uma ou mais categorias não foram encontradas'));
    // case '"name" is not allowed to be empty': return Promise.reject(new Error('O nome não pode ser vazio'));
    default:
    }
  }
  else if (code === 409) {
    switch (message) {
    case 'User already registered': return Promise.reject(new Error('Este usuário já está cadastrado'));
    default:
    }
  }
  else if (code === 401) {
    switch (message) {
    case 'Usuário ou senha inválidos': return Promise.reject(new Error('Usuário ou senha inválidos!'));
    // case 'Post does not exist': return Promise.reject(new Error('Este post não existe'));
    default:
    }
  }
  else if (code === 404) {
    switch (message) {
    case 'User does not exist': return Promise.reject(new Error('Este usuário não existe'));
    // case 'Post does not exist': return Promise.reject(new Error('Este post não existe'));
    // case 'Category does not exist': return Promise.reject(new Error('Esta categoria não existe'));
    default:
    }
  }

  return Promise.reject(error);
};
