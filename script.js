// Substitua as informações abaixo pelas suas credenciais do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCJUfE_tJIR7-UiUjgU5K_sLR0_WkmR4Ug",
    authDomain: "datacenter-2e7cc.firebaseapp.com",
    projectId: "datacenter-2e7cc",
    storageBucket: "datacenter-2e7cc.firebasestorage.app",
    messagingSenderId: "522919313513",
    appId: "1:522919313513:web:2ad5daeba62f4ec27a62f8",
    measurementId: "G-318TQ8CWM0"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const authSection = document.getElementById('auth-section');
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const biDashboardsSection = document.getElementById('bi-dashboards');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutButton = document.getElementById('logout-button');

const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

const loginErrorMessage = document.getElementById('login-error-message');
const registerErrorMessage = document.getElementById('register-error-message');

// Função para exibir ou esconder seções
function toggleSections(loggedIn) {
    if (loggedIn) {
        authSection.classList.add('hidden');
        biDashboardsSection.classList.remove('hidden');
    } else {
        authSection.classList.remove('hidden');
        biDashboardsSection.classList.add('hidden');
    }
}

// Alternar entre os formulários de login e registro
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.classList.remove('hidden');
    registerContainer.classList.add('hidden');
});

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

// Lidar com o envio do formulário de registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm['register-email'].value;
    const password = registerForm['register-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            registerErrorMessage.textContent = '';
            // O usuário é automaticamente logado após o registro
        })
        .catch((error) => {
            if (error.code === 'auth/weak-password') {
                registerErrorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            } else if (error.code === 'auth/email-already-in-use') {
                registerErrorMessage.textContent = 'O e-mail fornecido já está em uso.';
            } else {
                registerErrorMessage.textContent = 'Erro ao criar a conta. Tente novamente.';
            }
            console.error(error.message);
        });
});

// Lidar com o botão de logout
logoutButton.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            // O observador onAuthStateChanged cuidará da mudança de tela
        })
        .catch((error) => {
            console.error('Erro ao sair:', error.message);
        });
});