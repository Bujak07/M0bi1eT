// Pokazywanie widoków
function showSection(sectionId) {
    // Ukryj główne menu
    document.getElementById('mainMenu').style.display = 'none';
    
    // Ukryj wszystkie sekcje
    hideAllSections();
    
    // Pokaż wybraną sekcję
    document.getElementById(sectionId).style.display = 'block';
    
    // Zmień przycisk Wróć żeby wracał do menu
    const backBtn = document.querySelector('.back-btn');
    backBtn.onclick = function() {
        document.getElementById('mainMenu').style.display = 'block';
        hideAllSections();
        backBtn.onclick = function() {
            window.location.href = 'transport.html';
        };
    };
}

// Pokazywanie podwidoków (np. miasto N/U)
function showSubSection(subSectionId) {
    hideAllSections();
    document.getElementById(subSectionId).style.display = 'block';
    
    // Zmień przycisk Wróć żeby wracał do poprzedniego widoku
    const backBtn = document.querySelector('.back-btn');
    const parentSection = subSectionId.split('-')[0]; // 'jednorazowe' lub 'miesieczne'
    
    backBtn.onclick = function() {
        hideAllSections();
        document.getElementById(parentSection).style.display = 'block';
        
        backBtn.onclick = function() {
            document.getElementById('mainMenu').style.display = 'block';
            hideAllSections();
            backBtn.onclick = function() {
                window.location.href = 'transport.html';
            };
        };
    };
}

// Ukryj wszystkie sekcje i podsekcje
function hideAllSections() {
    const sections = ['jednorazowe', 'miesieczne', 
        'jednorazowe-miasto', 'jednorazowe-1jednostka', 'jednorazowe-2lub3jednostki', 'jednorazowe-inne',
        'miesieczne-miasto', 'miesieczne-1jednostka', 'miesieczne-2jednostki', 'miesieczne-3jednostki', 'miesieczne-wszystkie'];
    
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
    });
}

// Wybór biletu
function selectTicket(category, type, price, name) {
    if (category === 'jednorazowe') {
        // Dla biletów jednorazowych - przejdź do formularza z numerem linii
        localStorage.setItem('selectedTicketType', type);
        localStorage.setItem('selectedTicketPrice', price);
        localStorage.setItem('selectedTicketName', name);
        localStorage.setItem('selectedTicketCategory', 'jednorazowe');
        window.location.href = 'buy.html';
    } else if (category === 'miesieczne') {
        // Dla biletów miesięcznych - zapisz i przejdź
        if (type === 'wszystkie') {
            // Wszystkie linie - bez wyboru jednostek
            localStorage.setItem('selectedTicketType', type);
            localStorage.setItem('selectedTicketPrice', price);
            localStorage.setItem('selectedTicketName', 'Miesięczny ' + name);
            localStorage.setItem('selectedTicketCategory', 'miesieczne');
            window.location.href = 'buy.html';
        } else {
            // Inne - wymagane wprowadzenie jednostki
            localStorage.setItem('selectedTicketType', type);
            localStorage.setItem('selectedTicketPrice', price);
            localStorage.setItem('selectedTicketName', name);
            localStorage.setItem('selectedTicketCategory', 'miesieczne');
            window.location.href = 'buy.html';
        }
    }
}
