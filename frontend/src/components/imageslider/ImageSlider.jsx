import { useState, useEffect } from 'react';
import styles from './ImageSlider.module.css';

const images = [
  '/campo1.jpg',
  '/campoo2.jpg',
  '/campo3.jpg'
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
        />
      ))}
    </div>
  );
}
