// ✅ Importações necessárias
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Carss.module.css';

// ✅ Lista de campos (dados estáticos)
const fields = [
  { id: 1, name: 'Campo 1', imageUrl: 'campo.png' },
  { id: 2, name: 'Campo 2', imageUrl: 'campo1.jpg' },
  { id: 3, name: 'Campo 3', imageUrl: 'campoo2.jpg' },
  { id: 4, name: 'Campo 4', imageUrl: '/campo3.jpg' },
  { id: 5, name: 'Campo 5', imageUrl: '/campo5.jpg' },
];

const FieldCarousel = () => {
  // ✅ useRef: cria uma referência para acessar o elemento DOM diretamente
  const carouselRef = useRef(null);

  // ✅ useNavigate: usado para navegar entre rotas (vem do react-router-dom)
  const navigate = useNavigate();

  // ✅ useState: cria estados que controlam se pode rolar pra esquerda/direita
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ✅ Função chamada quando o usuário clica em um campo
  const handleFieldClick = (fieldId) => {
    navigate(`/campo/${fieldId}`);
  };

  // ✅ Atualiza o estado de rolagem (verifica se ainda pode rolar)
  const checkScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // ✅ Faz o carrossel rolar para a direita ou esquerda
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollLeft += direction === 'right' ? scrollAmount : -scrollAmount;
      setTimeout(checkScrollState, 350);
    }
  };

  // ✅ useEffect: executa código assim que o componente é montado
  useEffect(() => {
    const element = carouselRef.current;
    if (element) {
      checkScrollState();
      element.addEventListener('scroll', checkScrollState);
      return () => element.removeEventListener('scroll', checkScrollState);
    }
  }, []);

  // ✅ JSX: estrutura visual do carrossel
  return (
    <div className={styles.carrosselContainer}>
      <h2>Nossos campos</h2>
      <div className={styles.carrosselWrapper}>
        
        {/* Botão esquerdo */}
        <button
          className={styles.navBtn}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
        >
          &lt;
        </button>

        {/* Faixa do carrossel */}
        <div className={styles.carrosselTrack} ref={carouselRef}>
          {fields.map((field) => (
            <div key={field.id} className={styles.carrosselItem}>
              <div
                className={styles.fieldCard}
                onClick={() => handleFieldClick(field.id)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={field.imageUrl}
                  alt={field.name}
                  className={styles.fieldImage}
                />
                <h3 className={styles.fieldName}>{field.name}</h3>
                <span className={styles.viewButton}>Ver detalhes</span>
              </div>
            </div>
          ))}
        </div>

        {/* Botão direito */}
        <button
          className={styles.navBtn}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FieldCarousel;
