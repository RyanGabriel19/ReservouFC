// ✅ Importações necessárias
import {useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { quadraConsultar } from "../../services/QuadraService";
import styles from './Carss.module.css';

// ✅ Lista de campos (dados estáticos)
const fields = [
  { id: 1, name: 'Campo 1', imageUrl: 'campo.png' },
  { id: 2, name: 'Campo 2', imageUrl: 'campo1.jpg' },
  { id: 3, name: 'Campo 3', imageUrl: 'campoo2.jpg' },
  { id: 4, name: 'Campo 4', imageUrl: '/campo3.jpg' }
];

const FieldCarousel = () => { const [quadras, setQuadras] = useState([]);
  const [erro, setErro] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  // 🔹 Carrega as quadras do backend
  useEffect(() => {
    async function carregarQuadras() {
      try {
        const data = await quadraConsultar();
        setQuadras(data);
      } catch (err) {
        setErro("Erro ao carregar quadras.");
        console.error(err);
      }
    }
    carregarQuadras();
  }, []);




  // 🔹 Função para rolar o carrossel
  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth / 1.2;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.offsetWidth < container.scrollWidth
      );
    }, 400);
  };

  // 🔹 Atualiza estados dos botões quando o usuário rola manualmente
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.offsetWidth < container.scrollWidth
      );
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>

      <div className={styles.carrosselContainer}>
        <h2>Quadras disponíveis</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {quadras.length === 0 && !erro ? (
          <p>Nenhuma quadra encontrada.</p>
        ) : (
          <div className={styles.carrosselWrapper}>
            {/* Botão esquerdo */}
            <button
              className={styles.navBtn}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Rolar para a esquerda"
            >
              &lt;
            </button>

            {/* Faixa do carrossel */}
            <div className={styles.carrosselTrack} ref={carouselRef}>
              {quadras.map((q) => (
                <div key={q.id} className={styles.carrosselItem}>
                  <div className={styles.fieldCard}>
                    <img
                      src={q.imagem || "/campo3.jpg"}
                      alt={q.nome}
                      className={styles.fieldImage}
                    />
                    <h3 className={styles.fieldName}>{q.nome}</h3>
                    <p>{q.endereco}</p>
                    <span className={styles.viewButton}onClick={() => navigate("/reserva")}>Ver detalhes</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão direito */}
            <button
              className={styles.navBtn}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Rolar para a direita"
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default FieldCarousel;
