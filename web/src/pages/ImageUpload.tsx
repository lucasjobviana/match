// import React, { useState, ChangeEvent } from 'react';
// import { api } from '../services/api';
// import { useLoginContext } from '../context/LoginContext';
// import './ImageUpload.css';

// const ImageUpload: React.FC = () => {
//     const { user } = useLoginContext();
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [imageUrl, setImageUrl] = useState<string>('');

//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setSelectedFile(event.target.files[0]);
//         }
//     }; 

//     const handleUpload = async () => {
//         console.log('selectedFile')
//         console.log(selectedFile)
//         if (!selectedFile) return; 

//         const formData = new FormData();
//         formData.append('file', selectedFile);
//         console.log('formdata')
//         console.log(formData) 

//         try {
//             const response = await api.post(`/users/upload/${user.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log('setar a url')
//             console.log(response.data)
//             setImageUrl(response.data.imageUrl);
//         } catch (error) {
//             console.error('Error uploading the image', error);
//         }
//     };

//     console.log(imageUrl)

//     return (
        
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload</button>
//             {imageUrl && <img className='profile-image' src={imageUrl} alt="Uploaded" />}
//         </div>
//     );
// };

// export default ImageUpload;
// // ImageUpload.js
// import React, { useState, ChangeEvent } from 'react';
// import { api } from '../services/api';
// import { useLoginContext } from '../context/LoginContext';
// import './ImageUpload.css';

// const ImageUpload: React.FC = () => {
//   const { user } = useLoginContext();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string>('');

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await api.post(`/users/upload/${user.id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setImageUrl(response.data.imageUrl);
//     } catch (error) {
//       console.error('Error uploading the image', error);
//     }
//   };

//   return (
//     <div className="image-upload-container">
//       <input type="file" onChange={handleFileChange} />
//       <button type="button" onClick={handleUpload}>Upload</button>
//       {imageUrl && <img className="profile-image" src={imageUrl} alt="Uploaded" />}
//     </div>
//   );
// };

// export default ImageUpload;
//v3__________________________________________
// // ImageUpload.js
// import React, { useState, ChangeEvent } from 'react';
// import { api } from '../services/api';
// import { useLoginContext } from '../context/LoginContext';
// import './ImageUpload.css';

// const ImageUpload: React.FC<{ maxUploads: number }> = ({ maxUploads }) => {
//   const { user } = useLoginContext();
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [imageUrls, setImageUrls] = useState<string[]>([]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
//     if (event.target.files) {
//       const file = event.target.files[0];
//       const updatedFiles = [...selectedFiles];
//       updatedFiles[index] = file;
//       setSelectedFiles(updatedFiles);
//     }
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) return;

//     try {
//       const uploadPromises = selectedFiles.map(file => {
//         const formData = new FormData();
//         formData.append('file', file);
//         return api.post(`/users/upload/${user.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       });

//       const responses = await Promise.all(uploadPromises);
//       const urls = responses.map(response => response.data.imageUrl);
//       setImageUrls(urls);
//     } catch (error) {
//       console.error('Error uploading the images', error);
//     }
//   };

//   return (
//     <div className="image-upload-container">
//       {Array.from({ length: maxUploads }).map((_, index) => (
//         <input key={index} type="file" onChange={(e) => handleFileChange(e, index)} />
//       ))}
//       <button type="button" onClick={handleUpload}>Upload</button>
//       <div className="image-grid">
//         {imageUrls.map((url, index) => (
//           <img key={index} className="profile-image" src={url} alt={`Uploaded ${index}`} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
//v4__________________________________
// // ImageUpload.js
// import React, { useState, ChangeEvent } from 'react';
// import { api } from '../services/api';
// import { useLoginContext } from '../context/LoginContext';
// import './ImageUpload.css';

// const ImageUpload: React.FC<{ maxUploads: number }> = ({ maxUploads }) => {
//   const { user } = useLoginContext();
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [imageUrls, setImageUrls] = useState<string[]>([]);
//   const [previews, setPreviews] = useState<string[]>(Array(maxUploads).fill(''));

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
//     if (event.target.files) {
//       const file = event.target.files[0];
//       const updatedFiles = [...selectedFiles];
//       updatedFiles[index] = file;
//       setSelectedFiles(updatedFiles);

//       // Generate preview URL
//       const previewUrl = URL.createObjectURL(file);
//       const updatedPreviews = [...previews];
//       updatedPreviews[index] = previewUrl;
//       setPreviews(updatedPreviews);
//     }
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) return;

//     try {
//       const uploadPromises = selectedFiles.map(file => {
//         const formData = new FormData();
//         formData.append('file', file);
//         return api.post(`/users/upload/${user.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       });

//       const responses = await Promise.all(uploadPromises);
//       const urls = responses.map(response => response.data.imageUrl);
//       setImageUrls(urls);
//     } catch (error) {
//       console.error('Error uploading the images', error);
//     }
//   };

//   return (
//     <div className="image-upload-container">
//       {Array.from({ length: maxUploads }).map((_, index) => (
//         <div key={index} className="upload-item">
//           <input 
//             type="file" 
//             onChange={(e) => handleFileChange(e, index)} 
//           />
//           {previews[index] && (
//             <img 
//               className="profile-image" 
//               src={previews[index]} 
//               alt={`Preview ${index}`} 
//             />
//           )}
//         </div>
//       ))}
//       <button type="button" onClick={handleUpload}>Upload</button>
//       <div className="image-grid">
//         {imageUrls.map((url, index) => (
//           <img key={index} className="profile-image" src={url} alt={`Uploaded ${index}`} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
//v5_____________________________________________________
// // ImageUpload.js
// import React, { useState, ChangeEvent } from 'react';
// import { api } from '../services/api';
// import { useLoginContext } from '../context/LoginContext';
// import './ImageUpload.css';

// const ImageUpload: React.FC<{ maxUploads: number }> = ({ maxUploads }) => {
//   const { user } = useLoginContext();
//   const [selectedFiles, setSelectedFiles] = useState<File[]>(Array(maxUploads).fill(null));
//   const [previews, setPreviews] = useState<string[]>(Array(maxUploads).fill(''));
//   const [imageUrls, setImageUrls] = useState<string[]>([]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
//     if (event.target.files) {
//       const file = event.target.files[0];
//       const updatedFiles = [...selectedFiles];
//       updatedFiles[index] = file;
//       setSelectedFiles(updatedFiles);

//       // Generate preview URL
//       const previewUrl = URL.createObjectURL(file);
//       const updatedPreviews = [...previews];
//       updatedPreviews[index] = previewUrl;
//       setPreviews(updatedPreviews);
//     }
//   };

//   const handleUpload = async () => {
//     const validFiles = selectedFiles.filter(file => file !== null);
//     if (validFiles.length === 0) return;

//     try {
//       const uploadPromises = validFiles.map(file => {
//         const formData = new FormData();
//         formData.append('file', file);
//         return api.post(`/users/upload/${user.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       });

//       const responses = await Promise.all(uploadPromises);
//       const urls = responses.map(response => response.data.imageUrl);
//       setImageUrls(urls);
//     } catch (error) {
//       console.error('Error uploading the images', error);
//     }
//   };

//   return (
//     <div className="image-upload-container">
//       <div className="image-grid">
//         {Array.from({ length: maxUploads }).map((_, index) => (
//           <div key={index} className="upload-item">
//             {previews[index] ? (
//               <img 
//                 className="profile-image" 
//                 src={previews[index]} 
//                 alt={`Preview ${index}`} 
//               />
//             ) : (
//               <input 
//                 type="file" 
//                 onChange={(e) => handleFileChange(e, index)} 
//               />
//             )}
//           </div>
//         ))}
//       </div>
//       <button type="button" onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default ImageUpload;
//v6=====================================
// // ImageUpload.js
// import React, { useState, ChangeEvent } from 'react';
// import { api } from '../services/api';
// import { useLoginContext } from '../context/LoginContext';
// import './ImageUpload.css';

// const ImageUpload: React.FC<{ maxUploads: number }> = ({ maxUploads }) => {
//   const { user } = useLoginContext();
//   const [selectedFiles, setSelectedFiles] = useState<File[]>(Array(maxUploads).fill(null));
//   const [previews, setPreviews] = useState<string[]>(Array(maxUploads).fill(''));
//   const [imageUrls, setImageUrls] = useState<string[]>([]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
//     if (event.target.files) {
//       const file = event.target.files[0];
//       const updatedFiles = [...selectedFiles];
//       updatedFiles[index] = file;
//       setSelectedFiles(updatedFiles);

//       // Generate preview URL
//       const previewUrl = URL.createObjectURL(file);
//       const updatedPreviews = [...previews];
//       updatedPreviews[index] = previewUrl;
//       setPreviews(updatedPreviews);
//     }
//   };

//   const handleUpload = async () => {
//     const validFiles = selectedFiles.filter(file => file !== null);
//     if (validFiles.length === 0) return;

//     try {
//       const uploadPromises = validFiles.map(file => {
//         const formData = new FormData();
//         formData.append('file', file);
//         return api.post(`/users/upload/${user.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       });

//       const responses = await Promise.all(uploadPromises);
//       const urls = responses.map(response => response.data.imageUrl);
//       setImageUrls(urls);
//     } catch (error) {
//       console.error('Error uploading the images', error);
//     }
//   };

//   return (
//     <div className="image-upload-container">
//       <div className="image-grid">
//         {Array.from({ length: maxUploads }).map((_, index) => (
//           <div key={index} className="upload-item">
//             <input 
//               type="file" 
//               onChange={(e) => handleFileChange(e, index)} 
//               className="file-input"
//             />
//             {previews[index] ? (
//               <img 
//                 className="profile-image" 
//                 src={previews[index]} 
//                 alt={`Preview ${index}`} 
//                 onClick={() => document.querySelectorAll<HTMLInputElement>('.file-input')[index].click()}
//               />
//             ) : (
//               <div className="placeholder" onClick={() => document.querySelectorAll<HTMLInputElement>('.file-input')[index].click()}>
//                 Upload Image
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <button type="button" onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default ImageUpload;
// v7__________
// ImageUpload.js
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useLoginContext } from '../context/LoginContext';
import { api } from '../services/api';
import './ImageUpload.css';

const ImageUpload: React.FC<{ maxUploads: number; initialImages: string[]}> = ({ maxUploads, initialImages }) => {
  const { user } = useLoginContext();
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>(Array(maxUploads).fill(null));
  const [previews, setPreviews] = useState<string[]>(initialImages);

  useEffect(() => {
    setPreviews(initialImages);
  }, [initialImages]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const updatedFiles = [...selectedFiles];
      updatedFiles[index] = file;
      setSelectedFiles(updatedFiles);

      // Generate preview URL
      const previewUrl = URL.createObjectURL(file);
      const updatedPreviews = [...previews];
      updatedPreviews[index] = previewUrl;
      setPreviews(updatedPreviews);
    }
  };

  const handleUpload = async () => {
    const validFiles = selectedFiles.filter(file => file !== null);
    if (validFiles.length === 0) return;

    try {
      const uploadPromises = validFiles.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(`/users/upload/${user.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      });

      const responses = await Promise.all(uploadPromises);
      const urls = responses.map(response => response.data.imageUrl);
      setPreviews(prev => prev.map((preview, index) => selectedFiles[index] ? urls.shift() : preview));
    } catch (error) {
      console.error('Error uploading the images', error);
    }
  };

  return (
    <div className="image-upload-container">
      <div className="image-grid">
        {Array.from({ length: maxUploads }).map((_, index) => (
          <div key={index} className="upload-item">
            <input 
              type="file" 
              onChange={(e) => handleFileChange(e, index)} 
              className="file-input"
            />
            {previews[index] ? (
              <img 
                className="profile-image" 
                src={previews[index]} 
                alt={`Preview ${index}`} 
                onClick={() => document.querySelectorAll<HTMLInputElement>('.file-input')[index].click()}
              />
            ) : (
              <div className="placeholder" onClick={() => document.querySelectorAll<HTMLInputElement>('.file-input')[index].click()}>
                Upload Image
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <button type="button" onClick={handleUpload}>Upload</button> */}
    </div>
  );
};

export default ImageUpload;
