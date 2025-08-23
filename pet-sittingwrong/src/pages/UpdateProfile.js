import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const ProfilePictureUploader = () => {
  const { authUser } = useContext(AuthContext); 
  const [file, setFile]   = useState(null);
  const [preview, setPreview] = useState(authUser.user.avatar_url || '');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose a file first');
      return;
    }
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(
        `/api/users/${authUser.user.id}/avatar`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const newUrl = response.data.avatar_url;
      setPreview(newUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="mb-4">
      <h5>Profile Picture</h5>
      {preview && (
        <div className="mb-3">
          <img
            src={preview.startsWith('/uploads') ? `http://localhost:7000${preview}` : preview}
            alt="Avatar preview"
            className="rounded-circle"
            style={{ width: 120, height: 120, objectFit: 'cover' }}
          />
        </div>
      )}
      {error && <div className="text-danger mb-2">{error}</div>}

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};
