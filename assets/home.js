// Menu boczne
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');

menuToggle.addEventListener('click', function() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('open');
});

menuClose.addEventListener('click', function() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
});

menuOverlay.addEventListener('click', function() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
});

// Obsługa swipe gesture
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    // Swipe w prawo (otwórz menu)
    if (touchEndX > touchStartX + 50 && touchStartX < 50) {
        sideMenu.classList.add('open');
        menuOverlay.classList.add('open');
    }
    // Swipe w lewo (zamknij menu)
    if (touchStartX > touchEndX + 50 && sideMenu.classList.contains('open')) {
        sideMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
    }
}

// Stan konta
function loadBalance() {
    const balance = localStorage.getItem('accountBalance') || '0.00';
    document.getElementById('balanceAmount').textContent = parseFloat(balance).toFixed(2) + ' PLN';
}
loadBalance();

document.getElementById('balanceRefresh').addEventListener('click', function() {
    const icon = this;
    icon.classList.add('spin');
    setTimeout(() => icon.classList.remove('spin'), 400);
    loadBalance();
});

// Nawigacja między kafelkami
document.getElementById('transport').addEventListener('click', function() {
    window.location.href = 'transport.html';
});

document.getElementById('parking').addEventListener('click', function() {
    alert('Parkowanie - funkcja w przygotowaniu 🚗');
});

document.getElementById('longdistance').addEventListener('click', function() {
    alert('Komunikacja dalekobieżna - funkcja w przygotowaniu 🚆');
});

document.getElementById('topup').addEventListener('click', function() {
    alert('Doładowanie konta - funkcja w przygotowaniu 💰');
});
