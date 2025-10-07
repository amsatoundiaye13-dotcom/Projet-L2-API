import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'bibliotheque', label: 'Bibliothèque' },
  ];

  if (user && user.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Administration' });
  }

  const buttonStyle = (active: boolean) => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontSize: window.innerWidth < 768 ? '16px' : window.innerWidth < 1024 ? '20px' : '22px',
    fontWeight: 400,
    color: 'white',
    backgroundColor: active ? 'rgba(255,255,255,0.2)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: "'Poppins', sans-serif",
    marginRight: '25px',
  });

  const navStyle = {
    backgroundColor: '#4CAF50',
    color: '#2E2E2E',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const containerStyle = {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={logoStyle} onClick={() => onNavigate('home')}>
          E-Mgal-gi
        </div>

        <div style={{ display: 'flex', gap: '1rem' }} className="desktop-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={buttonStyle(currentPage === item.id)}
            >
              {item.label}
            </button>
          ))}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{user.username}</span>
              <button
                onClick={logout}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                title="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Hide hamburger menu button on desktop */}
        <button
          style={{ display: 'none' }}
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        </button>
      </div>

      {isMenuOpen && (
        <div style={{ backgroundColor: '#A67C52', padding: '1rem' }} className="mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'white',
                backgroundColor: currentPage === item.id ? '#2E2E2E' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '0.5rem',
              }}
            >
              {item.label}
            </button>
          ))}
          {user && (
            <div style={{ borderTop: '1px solid #2E2E2E', paddingTop: '1rem' }}>
              <div style={{ color: '#A67C52', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{user.username}</div>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <LogOut size={20} />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
