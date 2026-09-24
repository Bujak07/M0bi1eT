// Wczytaj dane z localStorage
const ticketName = localStorage.getItem('selectedTicketName') || 'Miesięczny wsz.linie U';
const ticketPrice = parseFloat(localStorage.getItem('selectedTicketPrice')) || 90.00;
const ticketCategory = localStorage.getItem('selectedTicketCategory') || 'miesieczne';
const ticketType = localStorage.getItem('selectedTicketType') || '';
const userName = localStorage.getItem('userName') || 'Jan';
const userSurname = localStorage.getItem('userSurname') || 'Kowalski';
const fullName = `${userName} ${userSurname}`;

// Wypełnij dane na stronie
document.getElementById('ticketName').textContent = ticketName;
document.getElementById('buyerName').textContent = fullName;
document.getElementById('totalPrice').textContent = ticketPrice.toFixed(2) + ' PLN';

// Pokaż odpowiednie pola w zależności od kategorii
if (ticketCategory === 'jednorazowe') {
    document.getElementById('lineNumberSection').style.display = 'block';
} else if (ticketCategory === 'miesieczne' && ticketType !== 'wszystkie') {
    document.getElementById('unitsSection').style.display = 'block';
    
    // Utwórz odpowiednią ilość pól dla jednostek
    const unitsInputsDiv = document.getElementById('unitsInputs');
    let unitsCount = 1;
    
    if (ticketType === '2jednostki') {
        unitsCount = 2;
    } else if (ticketType === '3jednostki') {
        unitsCount = 3;
    }
    
    for (let i = 1; i <= unitsCount; i++) {
        const label = document.createElement('p');
        label.className = 'card-label';
        label.textContent = `Nazwa jednostki ${i}:`;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-input';
        input.id = `unitName${i}`;
        input.placeholder = `np. Obszar Gminy Klucze`;
        input.setAttribute('list', 'unitSuggestions');
        
        unitsInputsDiv.appendChild(label);
        unitsInputsDiv.appendChild(input);
    }
}

// Ustaw domyślną datę (dzisiaj)
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
const formattedDate = `${day}.${month}.${year}`;
document.getElementById('validFrom').value = formattedDate;

// Obsługa formatowania daty "ważny od" przy wprowadzaniu
document.getElementById('validFrom').addEventListener('blur', function() {
    let value = this.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    
    if (parts.length === 3) {
        const d = String(parts[0]).padStart(2, '0');
        const m = String(parts[1]).padStart(2, '0');
        const y = parts[2];
        this.value = `${d}.${m}.${y}`;
    }
});

// Obsługa zmiany ilości biletów
const quantityInput = document.querySelector('.quantity-input');
quantityInput.addEventListener('input', function() {
    const quantity = parseInt(this.value) || 1;
    const total = (ticketPrice * quantity).toFixed(2);
    document.getElementById('totalPrice').textContent = total + ' PLN';
});

// Timer odliczający
let timeLeft = 38;
const timerElement = document.querySelector('.timer');

const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft + ' s';
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerElement.textContent = '0 s';
    }
}, 1000);

// Obsługa przycisku "Skasuj bilet"
document.getElementById('buyButton').addEventListener('click', function() {
    const quantity = parseInt(quantityInput.value) || 1;
    const validFrom = document.getElementById('validFrom').value;
    
    // Pobierz dodatkowe dane w zależności od typu
    let finalTicketName = ticketName;
    let lineNumber = '';
    let unitName = '';
    
    if (ticketCategory === 'jednorazowe') {
        lineNumber = document.getElementById('lineNumber').value;
        if (lineNumber) {
            finalTicketName = `${ticketName} - linia ${lineNumber}`;
        }
    } else if (ticketCategory === 'miesieczne' && ticketType !== 'wszystkie') {
        // Zbierz wszystkie jednostki
        const unitNames = [];
        let unitsCount = 1;
        
        if (ticketType === '2jednostki') {
            unitsCount = 2;
        } else if (ticketType === '3jednostki') {
            unitsCount = 3;
        }
        
        for (let i = 1; i <= unitsCount; i++) {
            const unitInput = document.getElementById(`unitName${i}`);
            if (unitInput && unitInput.value) {
                unitNames.push(unitInput.value);
            }
        }
        
        unitName = unitNames.join(', ');
        
        // Nie dodawaj nazw jednostek do nazwy biletu - tylko bazowa nazwa
        finalTicketName = ticketName;
    } else if (ticketCategory === 'miesieczne' && ticketType === 'wszystkie') {
        finalTicketName = ticketName;
    }
    
    // Generuj numer biletu i numer kontrolny
    const ticketNumber = Math.floor(100000000 + Math.random() * 900000000);
    const controlNumber = Math.floor(10000 + Math.random() * 90000);
    
    // Parsuj wprowadzoną datę przez użytkownika
    const validFromParts = validFrom.split('.');
    const inputDate = new Date(validFromParts[2], validFromParts[1] - 1, validFromParts[0]);
    
    // Data zakupu: dzień przed wprowadzoną datą
    const purchaseDateTime = new Date(inputDate);
    purchaseDateTime.setDate(purchaseDateTime.getDate() - 1);
    
    // Data "ważny od": zawsze 1. dzień miesiąca z wprowadzonej daty
    const validFromDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
    const validFromFormatted = `${String(validFromDate.getDate()).padStart(2, '0')}.${String(validFromDate.getMonth() + 1).padStart(2, '0')}.${validFromDate.getFullYear()}`;
    
    // Losowa godzina między 10:00 a 20:00
    const randomHour = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);
    
    purchaseDateTime.setHours(randomHour, randomMinute, randomSecond);
    
    // Formatuj datę z zerami wiodącymi DD.MM.RRRR HH:MM:SS
    const day = String(purchaseDateTime.getDate()).padStart(2, '0');
    const month = String(purchaseDateTime.getMonth() + 1).padStart(2, '0');
    const year = purchaseDateTime.getFullYear();
    const hours = String(purchaseDateTime.getHours()).padStart(2, '0');
    const minutes = String(purchaseDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(purchaseDateTime.getSeconds()).padStart(2, '0');
    
    const purchaseDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    
    // Zapisz dane bieżącego biletu
    localStorage.setItem('ticketQuantity', quantity);
    localStorage.setItem('ticketValidFrom', validFromFormatted);
    localStorage.setItem('ticketPurchaseDate', purchaseDate);
    localStorage.setItem('ticketNumber', ticketNumber);
    localStorage.setItem('controlNumber', controlNumber);
    localStorage.setItem('selectedTicketName', finalTicketName);
    localStorage.setItem('ticketLineNumber', lineNumber);
    localStorage.setItem('ticketUnitName', unitName);
    
    // Zapisz bilet do historii
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push({
        id: ticketNumber,
        name: finalTicketName,
        price: parseFloat((ticketPrice * quantity).toFixed(2)),
        quantity: quantity,
        validFrom: validFromFormatted,
        purchaseDate: purchaseDate,
        controlNumber: controlNumber,
        buyerName: fullName,
        lineNumber: lineNumber,
        unitName: unitName
    });
    localStorage.setItem('tickets', JSON.stringify(tickets));
    
    // Przejdź do widoku biletu
    window.location.href = 'ticket.html';
});

