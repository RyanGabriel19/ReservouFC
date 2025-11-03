export async function cadastroUsuario(dados){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/cadastrar`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const resultado = await response.json();
        
        if(!response.ok) throw new Error(resultado.error || "erro ao cadastrar usuario");
        return resultado;
        
    } catch(err){
        throw err;

    }
}

export async function LoginUsuario(dados){
  try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
      });
      const resultado = await response.json();
      
      if(!response.ok) throw new Error(resultado.error || "Erro ao fazer o login");
      return resultado;
  } catch(err){
      throw err;
  }
}

export function Logout(){
    try{
        localStorage.removeItem(`${import.meta.env.VITE_TOKEN_KEY_NAME}`)
        
        // Testando passar isso direto para o headeradm.jsx nos components
        // setTimeout(()=>{
        //     window.location.href = '/login';
        // }, 1000);
         
    } catch(err){
        console.log("erro ao sair da conta ", err)
        throw err;

    }
}