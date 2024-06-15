import { api } from '..';
import { TUser } from '../../../Type';
import { arrayBufferToBase64 } from '../../../util/util';

// const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
//   let binary = '';
//   const bytes = new Uint8Array(buffer);
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return window.btoa(binary);
// };

export const sendMessageTo = async(userId:number, matchId:number, content:string) => {
  const loggedUser = await api.post('/users/matchs/message',{
    headers:{id:userId},
    content,matchId, userId
});
if(loggedUser) return loggedUser.data;
return null;
}

export const loadMatches = async (id:number) => {
  const matches = await api.get('/users/matchs', {
    headers: {
      id,
    }
  }).then((response: { data: TUser[]; }) => {
    return response.data;
  });
  console.log(matches)

  const allMatches = matches;
  allMatches.forEach((user)=>{
    if(user && user.images[0]){
      const urls = user.images.map((image: { fileData: ArrayBuffer; fileName: string }) => {
        return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
      });
      user.imageUrls = urls;
    } 
  })
  console.log(allMatches)
  return allMatches;
  
  // return users.filter((user)=>user.id !== Number(id));
}; //sendMessageTo