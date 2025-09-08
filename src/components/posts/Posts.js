import React, { useEffect, useState } from 'react';
import { postsAPI, mediaAPI } from '../../services/api';
import './Posts.css';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ text: '', mediaId: null });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await postsAPI.getAll();
        setPosts(data || []);
      } catch (e) {
        console.error('Error fetching posts', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postsAPI.create(newPost);
      setPosts((prev) => [data, ...prev]);
      setNewPost({ text: '', mediaId: null });
    } catch (e) {
      alert('No se pudo crear el post');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const { data } = await mediaAPI.upload(fd);
      setNewPost((p) => ({ ...p, mediaId: data.id }));
    } catch (e) {
      alert('No se pudo subir el archivo');
    }
  };

  if (loading) return <p>Cargando publicaciones…</p>;

  return (
    <div className="posts-page">
      <h1>Publicaciones</h1>

      <form className="post-form" onSubmit={handleCreate}>
        <textarea
          placeholder="¿Qué quieres publicar?"
          value={newPost.text}
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          required
        />
        <div className="post-form__row">
          <input type="file" accept="image/*,video/*" onChange={handleUpload} />
          <button type="submit">Crear</button>
        </div>
      </form>

      <ul className="posts-list">
        {posts.map((p) => (
          <li key={p.id} className="post-item">
            <div className="post-head">
              <span className={`badge badge--${p.status?.toLowerCase?.() || 'draft'}`}>
                {p.status || 'DRAFT'}
              </span>
              {p.scheduledAt && <span className="scheduled-at">⏰ {new Date(p.scheduledAt).toLocaleString()}</span>}
            </div>
            <p>{p.text}</p>
            {p.mediaUrl && (
              p.mediaUrl.match(/\.(mp4|webm|ogg)$/i)
                ? <video src={p.mediaUrl} controls className="media" />
                : <img src={p.mediaUrl} alt="" className="media" />
            )}
          </li>
        ))}
        {posts.length === 0 && <p>No hay publicaciones todavía.</p>}
      </ul>
    </div>
  );
}