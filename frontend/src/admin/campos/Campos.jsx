import styles from './Campos.module.css';

function Campo () {
    return (<>
    <div className={styles['containercampo']}>
        <div className={styles['cadastrocampo']}>
            <h2>Cadastrar nova quadra</h2>
            <form className={styles['campoform']}>
                <label htmlFor="nome">Nome da Quadra:</label><br />
                <input type="text" id="nomecampo" name="nomecampo" required /><br /><br />

                <label htmlFor="localizacao">Localização:</label><br />
                <input type="text" id="localizacao" name="localizacao" required /><br /><br />

                <label htmlFor="tipo">Tipo de Quadra:</label><br />
                <select id="tipo" name="tipo" required>
                    <option value="">Selecione</option>
                    <option value="society">Society</option>
                    <option value="futebol">Futebol de Campo</option>
                    <option value="futsal">Futsal</option>
                </select><br /><br />
                
                <label htmlFor="preco">Preço por Hora (R$):</label><br />
                <input type="number" id="preco" name="preco" step="0.01" required /><br /><br />

                <button type="submit" className={styles['submitbtn']}>Cadastrar Quadra</button>

            </form>
        </div> 
        

    </div>
    
    </>)
}

export default Campo;