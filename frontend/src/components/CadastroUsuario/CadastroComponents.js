import { cadastroUsuario } from "../../services/UsuarioService";

const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {nome, telefone, email, senha};

    try {
        const resultado = await cadastroUsuario(dados);
        setMensagem('Usuario cadastrado com sucesso');
        setNome('');
        setTelefone('');
        setEmail('');
        setSenha('');
    }catch(err){
        setMensagem("Erro: " + err.message);
    }
};