// Załaduj listę biletów
function loadTickets() {
    const container = document.getElementById('ticketsContainer');
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    
    if (tickets.length === 0) {
        container.innerHTML = '<p class="no-tickets">Brak kupionych biletów</p>';
        return;
    }
    
    // Sortuj bilety według daty zakupu (najnowsze najpierw)
    tickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    
    container.innerHTML = '';
    tickets.forEach((ticket, index) => {
        const ticketCard = document.createElement('div');
        ticketCard.className = 'ticket-card';
        ticketCard.onclick = () => viewTicket(index);
        
        // Sprawdź czy bilet jest aktywny (założenie: aktywny przez 30 dni od daty "ważny od")
        const validFromDate = parseDate(ticket.validFrom);
        const expiryDate = new Date(validFromDate);
        expiryDate.setDate(expiryDate.getDate() + 30);
        const isActive = new Date() < expiryDate;
        
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

// Konwersja daty z formatu DD.MM.YYYY
function parseDate(dateStr) {
    const parts = dateStr.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Wyświetl szczegóły biletu
function viewTicket(index) {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const ticket = tickets[index];
    
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

// Załaduj bilety przy starcie
loadTickets();
