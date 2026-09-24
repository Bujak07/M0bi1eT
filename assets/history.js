let allTickets = [];
let currentFilter = 'all';

// Załaduj wszystkie bilety
function loadTickets() {
    allTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    displayTickets();
    updateStats();
}

// Wyświetl bilety z filtrowaniem
function displayTickets() {
    const container = document.getElementById('ticketsContainer');
    
    if (allTickets.length === 0) {
        container.innerHTML = '<p class="no-tickets">Brak historii biletów</p>';
        return;
    }
    
    // Filtruj bilety
    let filteredTickets = allTickets;
    if (currentFilter === 'active') {
        filteredTickets = allTickets.filter(isTicketActive);
    } else if (currentFilter === 'expired') {
        filteredTickets = allTickets.filter(ticket => !isTicketActive(ticket));
    }
    
    if (filteredTickets.length === 0) {
        container.innerHTML = '<p class="no-tickets">Brak biletów w wybranej kategorii</p>';
        return;
    }
    
    // Sortuj bilety według daty zakupu (najnowsze najpierw)
    filteredTickets.sort((a, b) => {
        const dateA = parseDateTime(a.purchaseDate);
        const dateB = parseDateTime(b.purchaseDate);
        return dateB - dateA;
    });
    
    container.innerHTML = '';
    filteredTickets.forEach((ticket, index) => {
        const ticketCard = document.createElement('div');
        ticketCard.className = 'ticket-card';
        ticketCard.onclick = () => viewTicket(findTicketIndex(ticket));
        
        const isActive = isTicketActive(ticket);
        
        ticketCard.innerHTML = `
            <div class="ticket-header">
                <div class="ticket-name">${ticket.name}</div>
                <div class="ticket-price">${ticket.price.toFixed(2)} PLN</div>
            </div>
            <div class="ticket-info">
                <div>Ilość: ${ticket.quantity}</div>
                <div>Ważny od: ${ticket.validFrom}</div>
            </div>
            <div class="ticket-date">Zakupiono: ${ticket.purchaseDate}</div>
            <span class="ticket-status ${isActive ? 'active' : 'expired'}">
                ${isActive ? 'Aktywny' : 'Wygasły'}
            </span>
        `;
        
        container.appendChild(ticketCard);
    });
}

// Sprawdź czy bilet jest aktywny
function isTicketActive(ticket) {
    const validFromDate = parseDate(ticket.validFrom);
    const expiryDate = new Date(validFromDate);
    expiryDate.setDate(expiryDate.getDate() + 30); // Bilet ważny 30 dni
    return new Date() < expiryDate;
}

// Konwersja daty z formatu DD.MM.YYYY
function parseDate(dateStr) {
    const parts = dateStr.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Konwersja daty i czasu
function parseDateTime(dateTimeStr) {
    // Format: DD.MM.YYYY, HH:MM:SS
    const parts = dateTimeStr.split(', ');
    const dateParts = parts[0].split('.');
    const timeParts = parts[1] ? parts[1].split(':') : [0, 0, 0];
    return new Date(
        dateParts[2], 
        dateParts[1] - 1, 
        dateParts[0],
        timeParts[0],
        timeParts[1],
        timeParts[2]
    );
}

// Znajdź indeks biletu w oryginalnej tablicy
function findTicketIndex(ticket) {
    return allTickets.findIndex(t => t.id === ticket.id);
}

// Wyświetl szczegóły biletu
function viewTicket(index) {
    const ticket = allTickets[index];
    
    if (!ticket) return;
    
    // Zapisz dane biletu do localStorage (aby ticket.html mógł je wyświetlić)
    localStorage.setItem('selectedTicketName', ticket.name);
    localStorage.setItem('selectedTicketPrice', ticket.price / ticket.quantity);
    localStorage.setItem('ticketQuantity', ticket.quantity);
    localStorage.setItem('ticketValidFrom', ticket.validFrom);
    localStorage.setItem('ticketPurchaseDate', ticket.purchaseDate);
    localStorage.setItem('ticketNumber', ticket.id);
    localStorage.setItem('controlNumber', ticket.controlNumber);
    
    // Przejdź do widoku biletu
    window.location.href = 'ticket.html';
}

// Aktualizuj statystyki
function updateStats() {
    const totalTickets = allTickets.length;
    const totalSpent = allTickets.reduce((sum, ticket) => sum + ticket.price, 0);
    
    document.getElementById('totalTickets').textContent = totalTickets;
    document.getElementById('totalSpent').textContent = totalSpent.toFixed(2) + ' PLN';
}

// Obsługa filtra
document.getElementById('filterSelect').addEventListener('change', function() {
    currentFilter = this.value;
    displayTickets();
});

// Załaduj bilety przy starcie
loadTickets();
