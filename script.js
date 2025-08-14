// Substitua as informações abaixo pelas suas credenciais do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCJUfE_tJIR7-UiUjgU5K_sLR0_WkmR4Ug",
    authDomain: "datacenter-2e7cc.firebaseapp.com",
    projectId: "datacenter-2e7cc",
    // ... outras configurações
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const authSection = document.getElementById('auth-section');
const loginContainer = document.getElementById('login-container');
const biDashboardsSection = document.getElementById('bi-dashboards');

const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');

const loginErrorMessage = document.getElementById('login-error-message');

// Variáveis para controle de inatividade
const inactivityTime = 10 * 60 * 1000; // 10 minutos em milissegundos
let timeout;

// Função para resetar o temporizador
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(logout, inactivityTime);
}

// Função para deslogar o usuário e recarregar a página
function logout() {
    auth.signOut()
        .then(() => {
            window.location.reload(true);
        })
        .catch((error) => {
            console.error('Erro ao sair:', error.message);
        });
}

// Eventos para detectar a atividade do usuário
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);
document.addEventListener('scroll', resetTimer);
document.addEventListener('click', resetTimer);

// Função para exibir ou esconder seções
function toggleSections(loggedIn) {
    if (loggedIn) {
        authSection.classList.add('hidden');
        biDashboardsSection.classList.remove('hidden');
        resetTimer(); // Inicia o temporizador quando o usuário faz login
    } else {
        authSection.classList.remove('hidden');
        biDashboardsSection.classList.add('hidden');
        clearTimeout(timeout); // Limpa o temporizador quando o usuário está deslogado
    }
}

// Verifica o estado da autenticação
auth.onAuthStateChanged(user => {
    if (user) {
        toggleSections(true);
    } else {
        toggleSections(false);
    }
});

// Lidar com o envio do formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then((cred) => {
            loginErrorMessage.textContent = '';
        })
        .catch((error) => {
            loginErrorMessage.textContent = 'Erro ao fazer login. Verifique seu e-mail e senha.';
        });
});

// Lidar com o botão de logout
logoutButton.addEventListener('click', () => {
    logout();
});