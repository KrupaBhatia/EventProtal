import { useEffect, useState } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/events')
      .then((res) => setEvents(res.data.events))
      .catch((err) => {
        console.error(err);
        navigate('/');
      });
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Event List</h2>
      {events.map((e) => (
        <div key={e.id} style={styles.card}>
          <h4 style={styles.title}>{e.title}</h4>
          <p style={styles.description}>{e.description}</p>
          <p style={styles.meta}><strong>By:</strong> {e.createdBy || 'Unknown'}</p>
          <p style={styles.meta}><strong>Category:</strong> {e.category}</p>
          <p style={styles.meta}><strong>Publish At:</strong> {e.publishAt}</p>
          <p style={{ ...styles.meta, color: e.isPublished ? 'green' : 'orange' }}>
            <strong>Status:</strong> {e.isPublished ? 'Published' : 'Scheduled'}
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  card: {
    background: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
  title: {
    marginBottom: '0.5rem',
  },
  description: {
    marginBottom: '1rem',
  },
  meta: {
    fontSize: '0.9rem',
    marginBottom: '0.3rem',
  },
};
