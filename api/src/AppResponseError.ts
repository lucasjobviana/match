class AppResponseError extends Error {
  public statusCode:number;

  private error400 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
    case 'All fields must be filled':
      return 400;
    default:
    }
  };

  private error401 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
    case 'Não é possivél se curtir':
    case 'Usuário ou senha inválidos':
    // case 'Token must be a valid token':
      return 401;
    default:
    }
  };

  private error404 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
    case 'Bad Request':
    case 'There is no team with such id!':
      return 404;
    default:
    }
  };

  private error422 = (errorMessage:string):number | undefined => {
    switch (errorMessage) {
    case '"default" is not allowed':
    case 'It is not possible to create a match with two equal teams':
      return 422;
    default:
    }
  };

  public mapMsgToStatusCode = (errorMessage = ''):number | undefined =>
    this.error400(errorMessage) || this.error422(errorMessage) || this.error401(errorMessage)
    || this.error404(errorMessage);

  constructor(message:string, defaultStatusCode = 333) {
    super(message);
    this.statusCode = this.mapMsgToStatusCode(message) || defaultStatusCode;
  }
}

export default AppResponseError;
