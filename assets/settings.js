// Wczytaj dane użytkownika
const userName = document.getElementById('userName');
const userSurname = document.getElementById('userSurname');
const userIdNumber = document.getElementById('userIdNumber');
const saveBtn = document.getElementById('saveUserData');
const successMsg = document.getElementById('successMsg');

// Załaduj zapisane dane
userName.value = localStorage.getItem('userName') || '';
userSurname.value = localStorage.getItem('userSurname') || '';
userIdNumber.value = localStorage.getItem('userIdNumber') || '';

// Zapisz dane użytkownika
saveBtn.addEventListener('click', function() {
    localStorage.setItem('userName', userName.value.trim());
    localStorage.setItem('userSurname', userSurname.value.trim());
    localStorage.setItem('userIdNumber', userIdNumber.value.trim());
    
    // Pokaż komunikat
    successMsg.classList.add('show');
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 3000);
});

// Załaduj listę biletów
function loadTickets() {
    const ticketsList = document.getElementById('ticketsList');
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    
    if (tickets.length === 0) {
        ticketsList.innerHTML = '<p class="no-tickets">Brak kupionych biletów</p>';
        return;
    }
    
    ticketsList.innerHTML = '';
    tickets.forEach((ticket, index) => {
        const ticketItem = document.createElement('div');
        ticketItem.className = 'ticket-item';
        ticketItem.innerHTML = `
            <div class="ticket-item-info">
                <div class="ticket-item-name">${ticket.name}</div>
                <div class="ticket-item-date">Zakupiony: ${ticket.purchaseDate}</div>
            </div>
            <button class="delete-ticket-btn" onclick="deleteTicket(${index})">Usuń</button>
        `;
        ticketsList.appendChild(ticketItem);
    });
}

// Usuń bilet
window.deleteTicket = function(index) {
    if (confirm('Czy na pewno chcesz usunąć ten bilet?')) {
        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets.splice(index, 1);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        loadTickets();
    }
};

// Reset aplikacji
document.getElementById('resetApp').addEventListener('click', function() {
    if (confirm('Czy na pewno chcesz zresetować wszystkie ustawienia?')) {
        localStorage.removeItem('tickets');
        localStorage.removeItem('sortNormal');
        loadTickets();
        alert('Ustawienia zostały zresetowane');
    }
});

// Załaduj bilety przy starcie
loadTickets();

// Stan konta
const accountBalanceInput = document.getElementById('accountBalance');
const saveBalanceBtn = document.getElementById('saveBalance');
const balanceSuccessMsg = document.getElementById('balanceSuccessMsg');

accountBalanceInput.value = localStorage.getItem('accountBalance') || '';

saveBalanceBtn.addEventListener('click', function() {
    const val = parseFloat(accountBalanceInput.value);
    if (!isNaN(val) && val >= 0) {
        localStorage.setItem('accountBalance', val.toFixed(2));
        balanceSuccessMsg.classList.add('show');
        setTimeout(() => balanceSuccessMsg.classList.remove('show'), 3000);
    }
});

// Zapisz ustawienie sortowania
document.getElementById('sortNormal').addEventListener('change', function() {
    localStorage.setItem('sortNormal', this.checked);
});

// Załaduj ustawienie sortowania
const sortNormal = localStorage.getItem('sortNormal');
if (sortNormal !== null) {
    document.getElementById('sortNormal').checked = sortNormal === 'true';
}
