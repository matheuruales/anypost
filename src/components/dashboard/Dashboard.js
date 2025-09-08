import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI, socialAccountsAPI } from '../../services/api';
import { BarChart3, Calendar, Image, Users } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    connectedAccounts: 0,
    publishedPosts: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, accountsResponse] = await Promise.all([
          postsAPI.getAll(),
          socialAccountsAPI.getAll()
        ]);

        const posts = postsResponse.data;
        const accounts = accountsResponse.data;

        setStats({
          totalPosts: posts.length,
          scheduledPosts: posts.filter(post => post.status === 'SCHEDULED').length,
          connectedAccounts: accounts.length,
          publishedPosts: posts.filter(post => post.status === 'PUBLISHED').length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <StatCard 
          icon={BarChart3} 
          title="Total de Publicaciones" 
          value={stats.totalPosts} 
          color="blue" 
        />
        <StatCard 
          icon={Calendar} 
          title="Programadas" 
          value={stats.scheduledPosts} 
          color="green" 
        />
        <StatCard 
          icon={Users} 
          title="Cuentas Conectadas" 
          value={stats.connectedAccounts} 
          color="purple" 
        />
        <StatCard 
          icon={Image} 
          title="Publicadas" 
          value={stats.publishedPosts} 
          color="orange" 
        />
      </div>

      <div className="quick-actions">
        <h2>Acciones Rápidas</h2>
        <div className="action-buttons">
          <Link to="/posts" className="action-btn primary">
            <Image size={20} />
            <span>Crear Publicación</span>
          </Link>
          <Link to="/social-accounts" className="action-btn secondary">
            <Users size={20} />
            <span>Gestionar Cuentas</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;