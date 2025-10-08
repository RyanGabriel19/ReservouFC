import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p><strong>Reservou FC — sempre com você!</strong></p>
      <p>📞 Contato: (81) 999-999</p>
      <p>📧 Email: <a href="mailto:reservoufc@gmail.com">reservoufc@gmail.com</a></p>
      <p>📍 Localização: Rua Campo Verde, nº 123 — Vila Society, PE</p>
    </footer>
  );
}

export default Footer;
