import { api } from '..';
import { TUser } from '../../../Type';
import { arrayBufferToBase64 } from '../../../util/util';

export const login = async (username:string, password:string) => {
  console.log('ca')
  const loggedUser = await api.post('/login',{
      username,password
  });

  const user = loggedUser.data;
  if(user && user.images[0]){
    const urls = user.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
      return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
    });
    user.imageUrls = urls;
  }

  if(user) return user;
  return null;
}

export const register = async(username:string, password:string) => {
  const loggedUser = await api.post('/login/register',{
    username,password
});
if(loggedUser) return loggedUser.data;
return null;
}

export const getAllUsers = async (username:string | undefined, id:number) => {
  const nextUser = await api.get('/users', {
    headers: {
      username: username,
      id,
    }
  }).then((response: { data: TUser; }) => {
    return response.data;
  });
  console.log(nextUser)
  if(nextUser && nextUser.images && nextUser.images[0]){
    const urls = nextUser.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
      return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
    });
    nextUser.imageUrls = urls;
  }
  console.log(nextUser)
  return nextUser;
}; 

export const likeTo = async (idLoggedUser:number, idTargetUser:number) => {
  const loggedUser = await api.post('/users/like', {idTargetUser}, {
    headers: {
      user: idLoggedUser,
    }
  }).then((response) => {
    return response.data;
  });

  const allUsers = loggedUser;
    if(loggedUser && loggedUser.images[0]){
      const urls = loggedUser.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      allUsers.imageUrls = urls;
    } 

  return allUsers;
}

export const unlikeTo = async (idLoggedUser:number, idTargetUser:number) => {
  const loggedUser = await api.post('/users/unlike', {idTargetUser}, {
    headers: {
      user: idLoggedUser,
    }
  }).then((response) => {
    return response.data;
  });console.log(loggedUser)

  const allUsers = loggedUser;
  // allUsers.forEach((user)=>{
    if(loggedUser && loggedUser.images[0]){
      const urls = loggedUser.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      allUsers.imageUrls = urls;
    } 
  // })
  console.log(allUsers)
  console.log(allUsers)
  return allUsers;
}

export const dislikeTo = async (idLoggedUser:number, idTargetUser:number) => {
  const loggedUser = await api.post('/users/dislike', {idTargetUser}, {
    headers: {
      user: idLoggedUser,
    }
  }).then((response) => {
    return response.data;
  });console.log(loggedUser)

  const allUsers = loggedUser;
    if(loggedUser && loggedUser.images[0]){
      const urls = loggedUser.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      allUsers.imageUrls = urls;
    } 
    
  return allUsers;
}

export const undislikeTo = async (idLoggedUser:number, idTargetUser:number) => {
  const loggedUser = await api.post('/users/undislike', {idTargetUser}, {
    headers: {
      user: idLoggedUser,
    }
  }).then((response) => {
    return response.data;
  });

  const allUsers = loggedUser;
    if(loggedUser && loggedUser.images[0]){
      const urls = loggedUser.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      allUsers.imageUrls = urls;
    } 

  return allUsers;
}
  
export const updateUser = async (idLoggedUser:number, formData:FormData) => {
  const updatedUser = await api.put(`/users/${idLoggedUser}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      user: idLoggedUser,
    }
  }).then((response: { data: TUser[]; }) => {
    return response.data;
  });

  // if(user && user.images[0]){
  //   const urls = user.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
  //     return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
  //   });
  //   user.imageUrls = urls;
  // }

  const user = updatedUser;
    if(user && user.images[0]){
      const urls = user.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      user.imageUrls = urls;
    }

  return user;
};