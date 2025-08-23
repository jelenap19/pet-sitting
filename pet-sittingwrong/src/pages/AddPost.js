import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePost.js';
import { AuthContext } from '../authorization/AuthContext';

export const AddPost = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const [values, setValues] = useState({
    title: '',
    location: '',
    description: '',
    tags: [],
    imageFile: null,
  });
  const [error, setError] = useState('');

  const TAG_OPTIONS = [
    'dog','cat','fish','bird','reptile','other',
    'weekend','week','month'
  ];

  const {
    execute: createAd,
    loading: creatingAd,
    error: createError
  } = usePost('/ads/createAd');

  const {
    execute: uploadImage,
    loading: uploadingImage,
    error: uploadError
  } = usePost('/ads/'); 

  const handleTagChange = (tag) => {
    setValues((v) => {
      const already = v.tags.includes(tag);
      return {
        ...v,
        tags: already
          ? v.tags.filter((t) => t !== tag)
          : [...v.tags, tag]
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleFileChange = (e) => {
    setValues((v) => ({ ...v, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, location, description, tags, imageFile } = values;

    if (!title || !location || !description) {
      setError('Title, location, and description are required');
      return;
    }
    if (!authUser) {
      setError('You must be logged in to post');
      return;
    }

    try {
      const newAd = await createAd({
        owner_id: authUser.user.id,
        title,
        location,
        description,
        image_url: '',
        tags: tags.join(',')
      });
      console.log('New ad created:', newAd);
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        await uploadImage(
          formData,
          {
            url: `/ads/${newAd.id}/image`
          }
        );
      }

      navigate(`/post/${newAd.id}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create post';
      setError(msg);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4">Add New Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {(createError || uploadError) && (
        <div className="alert alert-danger">
          {createError?.response?.data?.message || uploadError?.response?.data?.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            name="location"
            type="text"
            className="form-control"
            value={values.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Tags (select as many as apply):</label>
          <div className="d-flex flex-wrap">
            {TAG_OPTIONS.map((tag) => (
              <div key={tag} className="form-check me-3 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`tag-${tag}`}
                  checked={values.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                <label className="form-check-label" htmlFor={`tag-${tag}`}>
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Image (optional)</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={creatingAd || uploadingImage}
        >
          {creatingAd || uploadingImage ? 'Posting…' : 'Post Ad'}
        </button>
      </form>
    </div>
  );
};
