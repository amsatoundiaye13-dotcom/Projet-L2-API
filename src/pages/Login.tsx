import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await login(username, password);
        onLoginSuccess();
      } else {
        // Utiliser l'API d'inscription réelle
        const { api } = await import('../services/api');
        await api.register(username, email, password);
        // Après inscription réussie, basculer vers la connexion
        setIsLogin(true);
        setError('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '2.25rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>E-Magal Gi</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Plateforme du Magal de Touba</p>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                backgroundColor: isLogin ? 'var(--color-primary)' : '#e2e8f0',
                color: isLogin ? 'white' : 'var(--color-text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                backgroundColor: !isLogin ? 'var(--color-primary)' : '#e2e8f0',
                color: !isLogin ? 'white' : 'var(--color-text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              Inscription
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>
            {!isLogin && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                />
              </div>
            )}
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
            </div>
            {error && (
              <div style={{ backgroundColor: '#fee2e2', color: 'var(--color-error)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontWeight: 600,
                padding: '0.75rem',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                border: 'none',
                transition: 'background-color 0.3s ease'
              }}
            >
              {isLogin ? (
                <>
                  <LogIn size={20} />
                  {loading ? 'Connexion...' : 'Se connecter'}
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  {loading ? 'Inscription...' : 'S\'inscrire'}
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
