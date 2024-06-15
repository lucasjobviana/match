import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import './Profile.css';
import './ImageUpload.css';

function Profile() {

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  });

  const maxUploads = 6;
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user, update_user } = useLoginContext();
  const initialImages= user?.imageUrls ?? [] 
  const [previews, setPreviews] = useState<string[]>(initialImages);
  
  const initializeSelectedFiles = (images:any, maxUploads:number) => {
    const my = [];
    images.forEach(element => {
      my.push(imageBlobToFile(element))
  });

    const filledImages = my.slice(0, maxUploads);
    while (filledImages.length < maxUploads) {
      filledImages.push(null);
    }
    return filledImages;
  };

  function imageBlobToFile(imageBlob) {
    const { fileData, fileName } = imageBlob;
    const blob = new Blob([fileData]);
    const file = new File([blob], fileName);
    return file;
  }

  const initialFiles = user?.images ? initializeSelectedFiles(user.images, maxUploads):null;
  const [selectedFiles, setSelectedFiles] = useState<File[]|null>(initialFiles);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const updatedFiles = [...selectedFiles];
      updatedFiles[index] = file;
      setSelectedFiles(updatedFiles);

      const previewUrl = URL.createObjectURL(file);
      const updatedPreviews = [...previews];
      updatedPreviews[index] = previewUrl;
      setPreviews(updatedPreviews);
    }
  };

  const validFiles = () => {
    const validFiles = selectedFiles.filter(file => file !== null)
    return validFiles;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files =  validFiles();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    formData.append('name',e.target['name'].value)
    formData.append('username',e.target['username'].value)
    formData.append('resume',e.target['resume'].value)
    formData.append('phone', e.target['phone'].value)
    formData.append('password', e.target['password'].value)
   
    try {
      await update_user(Number(id), formData);
      alert('Perfil atualizado com sucesso');
      navigate(`/user/${id}`);
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar o perfil');
    }
  };

  return (
    user && (
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={user.name}
          />
          <input 
            type="text"
            name="resume"
            placeholder="Resumo"
            defaultValue={user.resume}
          />
          <input 
            type="text"
            name="phone"
            placeholder="Telefone"
            defaultValue={user.phone}
          />
          <input 
            type="password"
            name="password"
            placeholder="Senha"
          />
          <input 
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
          />

          <div className="image-upload-container">
            <div className="image-grid">
              {
              Array.from({ length: maxUploads }).map((_, index) => (
                <div key={index} className="upload-item">
                  <input 
                    type="file" 
                    name={`image${index}`}
                    onChange={(e) => handleFileChange(e, index)} 
                    className="file-input"
                  />
                  {
                  previews[index] ? (
                    <img 
                      className="profile-image" 
                      src={previews[index]} 
                      alt={`Preview ${index}`} 
                      onClick={() => document.querySelectorAll<HTMLInputElement>('.file-input')[index].click()}
                    />) : (
                    <div className="placeholder" onClick={() => document.querySelectorAll<HTMLInputElement>('.file-input')[index].click()}>
                      Upload Image
                    </div>
                    )
                  }
                </div>
              ))}
            </div>
          </div>

          <button type="submit">Atualizar Perfil</button>
        </form>
      </div>
    )
  );
}

export default Profile;
