// Sprawdź czy użytkownik już był w aplikacji
window.addEventListener('DOMContentLoaded', function() {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited === 'true') {
        // Przekieruj od razu do home
        window.location.href = 'home.html';
    }
});

// Toggle instrukcji
document.querySelector('.top-holder').addEventListener('click', function() {
    document.querySelector('.guide-holder').classList.toggle('active');
});

// Walidacja i zapis danych
document.getElementById('goButton').addEventListener('click', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    
    let valid = true;
    
    // Reset błędów
    document.querySelectorAll('.input-holder').forEach(holder => {
        holder.classList.remove('error');
    });
    
    // Walidacja
    if (!name) {
        document.getElementById('name').parentElement.classList.add('error');
        valid = false;
    }
    
    if (!surname) {
        document.getElementById('surname').parentElement.classList.add('error');
        valid = false;
    }
    
    if (!idNumber) {
        document.getElementById('idNumber').parentElement.classList.add('error');
        valid = false;
    }
    
    if (valid) {
        // Zapisz dane do localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userSurname', surname);
        localStorage.setItem('userIdNumber', idNumber);
        localStorage.setItem('hasVisited', 'true');
        
        // Przejdź do strony głównej
        window.location.href = 'home.html';
    }
});

// Obsługa inputów - usuwanie błędów przy wpisywaniu
document.querySelectorAll('.input').forEach(input => {
    input.addEventListener('input', function() {
        this.parentElement.classList.remove('error');
    });
});
