document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Troca entre login e cadastro
    loginBtn.addEventListener('click', function() {
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    signupBtn.addEventListener('click', function() {
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Cadastro
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            full_name: signupForm.querySelector('input[name="name"]').value,
            username: signupForm.querySelector('input[name="username"]').value,
            email: signupForm.querySelector('input[name="email"]').value,
            password: signupForm.querySelector('input[name="password"]').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                signupForm.reset();
                loginBtn.click(); // volta pra tela de login
            } else {
                console.error(data.error || 'Erro ao cadastrar');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor', error);
        }
    });

    // Login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            email: loginForm.querySelector('input[name="email"]').value,
            password: loginForm.querySelector('input[name="password"]').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Salva token e user
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                window.location.href = '../perfil/perfil.html';
            } else {
                console.error(data.error || 'Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor', error);
        }
    });
});

// Alternar visibilidade da senha
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}
