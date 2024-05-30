import { api } from '..';
import { TUser } from '../../../Type';
// import { User } from '../../../entities'; 

export const login = async (username:string, password:string) => {
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

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
  
export const register = async(username:string, password:string) => {
  const loggedUser = await api.post('/login/register',{
    username,password
});
console.log(loggedUser);
if(loggedUser) return loggedUser.data;
return null;
}

export const getAllUsers = async (username:string | undefined) => {
  const users = await api.get('/users', {
    headers: {
      username: username,
    }
  }).then((response: { data: TUser[]; }) => {
    return response.data;
  });
  console.log(users)

  const allUsers = users;
  allUsers.forEach((user)=>{
    if(user && user.images[0]){
      const urls = user.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      user.imageUrls = urls;
    } 
  })
  console.log(allUsers)
  return allUsers;
  
  // return users.filter((user)=>user.id !== Number(id));
}; 

export const likeTo = async (idLoggedUser:number, idTargetUser:number) => {
  const loggedUser = await api.post('/users/like', {idTargetUser}, {
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

export const undislikeTo = async (idLoggedUser:number, idTargetUser:number) => {
  const loggedUser = await api.post('/users/undislike', {idTargetUser}, {
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
  
export const updateUser = async (idLoggedUser:number, formData:FormData) => {
  console.log('________user_________')
  console.log(formData) //nao uso mais 
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  
  const updatedUser = await api.put(`/users/${idLoggedUser}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      user: idLoggedUser,
    }
  }).then((response: { data: TUser[]; }) => {
    return response.data;
  });
  console.log(updatedUser)
  // console.log(typeof updatedUser)

  const user = updatedUser;
  // allUsers && allUsers.forEach((user)=>{
    if(user && user.images[0]){
      const urls = user.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      user.imageUrls = urls;
    }
  // })
  console.log(user)
  return user;//user.filter((user)=>user.id !== Number(id)) ||[];
  // return updatedUser; 
};
