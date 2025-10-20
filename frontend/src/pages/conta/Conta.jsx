import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useState } from "react";
import styles from './Conta.module.css';

const Conta = () => {

const [active, setActive] = useState("Perfil");

  const menuItems = ["Perfil", "Configurações", "Segurança", "Notificações"];

  return (
    <>
    <Header />
      <div className={styles.container}>
        <main className={styles.content}>
          <h2>Conta</h2>
          <p>Aqui você poderá gerenciar sua conta.</p>
          {/* Futuras funcionalidades */}
        </main>
        <aside className={styles.sidebar}>
          <ul>
            {menuItems.map(item => (
              <li
                key={item}
                className={active === item ? styles.active : ""}
                onClick={() => setActive(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  )
};
export default Conta;