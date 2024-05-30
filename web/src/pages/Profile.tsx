import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';
import './Profile.css';
import { api } from '../services/api';
import './ImageUpload.css';

function Profile() {
  const maxUploads = 6;
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, update_user } = useLoginContext();
  const initialImages= user?.imageUrls ?? [] 
  const [selectedFiles, setSelectedFiles] = useState<File[]>(Array(maxUploads).fill(null));
  const [previews, setPreviews] = useState<string[]>(initialImages);

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

  const handleUpload = () => {
    const validFiles = selectedFiles.filter(file => file !== null);
    if (validFiles.length === 0) return Promise.resolve([]);
  
    const uploadPromises = validFiles.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      return api.post(`/users/upload/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });
  
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    try {
      const uploadResponses = await handleUpload();
      const urls = uploadResponses.map(response => response.data.imageUrl);
      setPreviews(prev => prev.map((preview, index) => selectedFiles[index] ? urls.shift() : preview));
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
