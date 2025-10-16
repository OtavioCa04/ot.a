document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        window.location.href = '/login/index.html';
        return;
    }
    
    function formatPhone(phone) {
        if (!phone) return 'Não informado';
        
        const cleaned = phone.replace(/\D/g, '');
        
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        else if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
        }
        
        return phone;
    }
    
    document.getElementById('user-fullname').textContent = user.full_name;
    document.getElementById('user-username').textContent = '@' + user.username;
    document.getElementById('user-email').textContent = user.email;
    
    const telefoneElement = document.getElementById('telefone');
    telefoneElement.textContent = formatPhone(user.phone);
    if (!user.phone) {
        telefoneElement.classList.add('text-gray-500', 'italic');
    }
    
    const bioElement = document.getElementById('user-bio');
    if (user.bio) {
        bioElement.textContent = user.bio;
        bioElement.classList.remove('italic');
    }
    
    if (user.avatar_url) {
        document.querySelector('.profile-photo-edit__preview').src = user.avatar_url;
    }

    const editBioBtn = document.querySelector('.text-blue-500');

    editBioBtn.addEventListener('click', function() {
        bioElement.contentEditable = true;
        bioElement.focus();
        bioElement.classList.add('border', 'border-blue-500', 'p-2', 'rounded');
        editBioBtn.textContent = 'Salvar';
        
        editBioBtn.onclick = async function() {
            const novaBio = bioElement.textContent.trim();
            
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/auth/profile/bio', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ bio: novaBio })
                });

                const data = await response.json();

                if (response.ok) {
                    bioElement.contentEditable = false;
                    bioElement.classList.remove('border', 'border-blue-500', 'p-2', 'rounded', 'italic');
                    user.bio = novaBio;
                    localStorage.setItem('user', JSON.stringify(user));
                    editBioBtn.textContent = '';
                    
                    editBioBtn.onclick = null;
                    location.reload();
                } else {
                    alert(data.error);
                }
            } catch (error) {
                alert('Erro ao atualizar biografia');
                console.error(error);
            }
        };
    });
});