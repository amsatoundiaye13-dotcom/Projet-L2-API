import React from 'react';
import { Sparkles, Heart, Calendar, BookOpen } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '2rem', fontFamily: "'Poppins', sans-serif", backgroundColor: '#FDFCF8', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => onNavigate('home')}>E-Magal Gi</h1>
      </header>

      <section style={{ textAlign: 'center', marginBottom: '3rem', padding: '4rem 2rem', borderRadius: '1rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '3rem', color: '#A67C52', marginBottom: '1rem', letterSpacing: '0.5px' }}>
          Bienvenue au Magal de Touba
        </h2>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', color: '#2E2E2E', marginBottom: '1rem' }}>
          Célébration spirituelle en l'honneur du Cheikh Ahmadou Bamba Mbacké
        </p>
        <Sparkles size={48} color="#A67C52" />
      </section>

      <section style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
        <article style={{ flex: 1, backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem', transition: 'box-shadow 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Heart size={32} color="var(--color-primary)" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.5rem', margin: 0, color: 'var(--color-text-primary)' }}>
              Qu'est-ce que le Magal ?
            </h3>
          </div>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            Le Grand Magal de Touba est un pèlerinage annuel qui commémore le départ en exil du Cheikh Ahmadou Bamba
          </p>
        </article>

        <article style={{ flex: 1, backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem', transition: 'box-shadow 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Sparkles size={32} color="var(--color-secondary)" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.5rem', margin: 0, color: 'var(--color-text-primary)' }}>
              Signification spirituelle
            </h3>
          </div>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            Le Magal symbolise la victoire de la foi sur l'oppression, la patience face à l'adversité, et l'importance
          </p>
        </article>
      </section>

      <section style={{ background: 'linear-gradient(to right, var(--color-secondary), var(--color-primary))', borderRadius: '1rem', padding: '2rem', color: 'white', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          Actualités et Annonces
        </h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-around' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1rem', flex: 1 }}>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Date du Magal 2025</h3>
            <p>Le Grand Magal aura lieu le 15 novembre 2025. Préparez votre voyage dès maintenant.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1rem', flex: 1 }}>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Programme disponible</h3>
            <p>Consultez le programme complet des événements dans la section Agenda.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1rem', flex: 1 }}>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Nouvelle bibliothèque</h3>
            <p>Découvrez notre collection d'ouvrages et de Khassaïdes à télécharger gratuitement.</p>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '2rem', marginBottom: '2rem' }}>
          Navigation rapide
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <button
            onClick={() => onNavigate('agenda')}
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '1.5rem',
              width: '150px',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              border: 'none'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <Calendar size={48} color="var(--color-primary)" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.25rem', margin: '0.5rem 0' }}>Agenda du Magal</h3>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Découvrez le programme complet des événements et activités
            </p>
          </button>
          <button
            onClick={() => onNavigate('bibliotheque')}
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '1.5rem',
              width: '150px',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              border: 'none'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <BookOpen size={48} color="var(--color-secondary)" />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.25rem', margin: '0.5rem 0' }}>Bibliothèque</h3>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Accédez aux ouvrages, Khassaïdes et enseignements
            </p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
