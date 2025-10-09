document.addEventListener('DOMContentLoaded', function() {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

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

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            //alert('Login enviado!');
        });

        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            //alert('Cadastro enviado!');
        });

        signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            full_name: document.querySelector('#signup-form input[name="name"]').value,
            username: document.querySelector('#signup-form input[name="username"]').value,
            email: document.querySelector('#signup-form input[name="email"]').value,
            password: document.querySelector('#signup-form input[name="password"]').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                //alert('Cadastro realizado com sucesso!');
                signupForm.reset();
                // Muda para tela de login
                loginBtn.click();
            } else {
                //alert(data.error || 'Erro ao cadastrar');
            }
            } catch (error) {
                //alert('Erro ao conectar com o servidor');
                console.error(error);
            }
        });

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            email: document.querySelector('#login-form input[name="email"]').value,
            password: document.querySelector('#login-form input[name="password"]').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                //alert('Login realizado com sucesso!');

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                
                window.location.href = '/dashboard.html';
            } else {
                //alert(data.error || 'Erro ao fazer login');
            }
        } catch (error) {
           //alert('Erro ao conectar com o servidor');
            console.error(error);
        }
    });


});

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}
