import { useState } from "react";
import Header from "../../../components/header/Header";
import Funcionalidade from "../opcoes_nav/Funcionalidade";
import styles from "./Sorteador.module.css"; 

export default function SorteadorTime() {
  const [goleiros, setGoleiros] = useState([]);
  const [linha, setLinha] = useState([]);
  const [nomeGoleiro, setNomeGoleiro] = useState("");
  const [nomeLinha, setNomeLinha] = useState("");
  const [resultado, setResultado] = useState(null);

  function adicionarGoleiro() {
    if (!nomeGoleiro.trim()) return;
    setGoleiros([...goleiros, nomeGoleiro.trim()]);
    setNomeGoleiro("");
  }

  function adicionarLinha() {
    if (!nomeLinha.trim()) return;
    setLinha([...linha, nomeLinha.trim()]);
    setNomeLinha("");
  }

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function sortearTimes() {
    const goleirosEmbaralhados = shuffle(goleiros);
    const linhaEmbaralhado = shuffle(linha);

    const timeA = [];
    const timeB = [];
    const reservas = [];

    if (goleirosEmbaralhados.length >= 2) {
      timeA.push({ nome: goleirosEmbaralhados[0], posicao: "Goleiro" });
      timeB.push({ nome: goleirosEmbaralhados[1], posicao: "Goleiro" });

      goleirosEmbaralhados.slice(2).forEach((g) => reservas.push({ nome: g, posicao: "Goleiro" }));
    } else if (goleirosEmbaralhados.length === 1) {
      timeA.push({ nome: goleirosEmbaralhados[0], posicao: "Goleiro" });
    }

    const metade = Math.floor(linhaEmbaralhado.length / 2);

    linhaEmbaralhado.forEach((jogador) => {
      if (timeA.filter((p) => p.posicao === "Linha").length < metade) {
        timeA.push({ nome: jogador, posicao: "Linha" });
      } else if (timeB.filter((p) => p.posicao === "Linha").length < metade) {
        timeB.push({ nome: jogador, posicao: "Linha" });
      } else {
        reservas.push({ nome: jogador, posicao: "Linha" });
      }
    });

    setResultado({ timeA, timeB, reservas });
  }

  function limparTudo() {
    setGoleiros([]);
    setLinha([]);
    setResultado(null);
  }

  return (
    <>
      <Header />
      <Funcionalidade />

      <div className={styles.sorteadorContainer}>
        <h1 className={styles.titulo}>Sorteador de Times </h1>

        <div className={styles.grupo}>
          <h2>Goleiros</h2>
          <div className={styles.inserirArea}>
            <input
              type="text"
              value={nomeGoleiro}
              placeholder="Nome do goleiro"
              onChange={(e) => setNomeGoleiro(e.target.value)}
            />
            <button onClick={adicionarGoleiro}>Adicionar</button>
          </div>
          <ul className={styles.lista}>
            {goleiros.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>

        <div className={styles.grupo}>
          <h2>Jogadores de Linha</h2>
          <div className={styles.inserirArea}>
            <input
              type="text"
              value={nomeLinha}
              placeholder="Nome do jogador"
              onChange={(e) => setNomeLinha(e.target.value)}
            />
            <button onClick={adicionarLinha}>Adicionar</button>
          </div>
          <ul className={styles.lista}>
            {linha.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>

        <div className={styles.botoesAcoes}>
          <button className={styles.sortear} onClick={sortearTimes}>
            Sortear Times
          </button>
          <button className={styles.limpar} onClick={limparTudo}>
            Limpar Tudo
          </button>
        </div>

        {resultado && (
          <div className={styles.resultado}>
            <div className={styles.cardTime}>
              <h2> Time A</h2>
              <ul>
                {resultado.timeA.map((p, i) => (
                  <li key={i}>
                    {p.nome} ({p.posicao})
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cardTime}>
              <h2> Time B</h2>
              <ul>
                {resultado.timeB.map((p, i) => (
                  <li key={i}>
                    {p.nome} ({p.posicao})
                  </li>
                ))}
              </ul>
            </div>

            {resultado.reservas.length > 0 && (
              <div className={`${styles.cardTime} ${styles.reservas}`}>
                <h2> Reservas</h2>
                <ul>
                  {resultado.reservas.map((r, i) => (
                    <li key={i}>
                      {r.nome} ({r.posicao})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}