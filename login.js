// Usuário padrão
const usuarios = [
    {
        email: "contato@enertekeng.com.br",
        senha: "123456",
        nome: "Administrador"
    }
];

// Salva usuário padrão no localStorage se não existir
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const lembrar = document.getElementById("lembrar").checked;
    const errorMsg = document.getElementById("errorMsg");

    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = listaUsuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(user));
        if (lembrar) {
            localStorage.setItem('usuarioLembrado', email);
        } else {
            localStorage.removeItem('usuarioLembrado');
        }
        window.location.href = "index.html";
    } else {
        errorMsg.textContent = "E-mail ou senha incorretos.";
    }
});

// Preenche o campo de email se "lembrar-me" estiver ativo
window.onload = function() {
    const lembrado = localStorage.getItem('usuarioLembrado');
    if (lembrado) {
        document.getElementById("email").value = lembrado;
        document.getElementById("lembrar").checked = true;
    }
};
