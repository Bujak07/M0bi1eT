# moBiLet - Humorystyczna Aplikacja Biletowa 🎫

## ⚠️ UWAGA
Ten projekt służy **wyłącznie jako pamiątka kolekcjonerska i ma charakter humorystyczny**. 

**NIE UŻYWAJ** tej aplikacji jako prawdziwego biletu komunikacji miejskiej!

Dawanie linku bez zgody właściciela jest zabronione.

## 📱 Opis

moBiLet to parodia aplikacji mobilnej do zakupu biletów komunikacji miejskiej. Aplikacja odwzorowuje interfejs prawdziwego moBiLet z następującymi funkcjami:

- ✅ Ekran powitalny z formularzem danych
- ✅ Główny pulpit z kafelkami usług
- ✅ Wybór operatora komunikacji (Olkusz ZKGKM)
- ✅ Lista biletów jednorazowych i miesięcznych
- ✅ Ekran "zakupu" biletu
- ✅ Widok skasowanego biletu z animowanym kodem QR
- ✅ Pełna instalacja jako PWA (Progressive Web App)

## 🎨 Kolory

- **Niebieski header**: #1976D2
- **Czerwone kafelki**: #D32F2F
- **Tło**: #f5f5f5

## 📥 Instrukcja instalacji

### Dla systemu iOS:
1. Upewnij się, że używasz przeglądarki **Safari**
2. Uzupełnij dane i kliknij "Dalej"
3. Naciśnij przycisk udostępniania
4. Wybierz "Do Ekranu głównego"

### Dla systemu Android:
1. Upewnij się, że używasz przeglądarki **Google Chrome**
2. Uzupełnij dane i kliknij "Dalej"
3. Naciśnij 3 kropki (menu)
4. Wybierz "Dodaj do ekranu głównego"

## 🗂️ Struktura projektu

```
moBilet/
├── index.html          # Ekran startowy z formularzem
├── home.html           # Główny ekran z kafelkami
├── transport.html      # Wybór operatora komunikacji
├── tickets.html        # Lista dostępnych biletów
├── buy.html            # Ekran zakupu/kasowania biletu
├── ticket.html         # Widok skasowanego biletu
├── assets/
│   ├── index.css
│   ├── home.css
│   ├── transport.css
│   ├── tickets.css
│   ├── buy.css
│   ├── ticket.css
│   ├── index.js
│   ├── home.js
│   ├── tickets.js
│   ├── buy.js
│   ├── ticket.js
│   └── manifest.js
├── images/             # Grafiki i ikony
└── README.md
```

## 🖼️ Wymagane grafiki

Umieść w folderze `images/`:
- `logo.png` - Logo moBiLet
- `logo-white.png` - Białe logo moBiLet
- `blik-logo.png` - Logo BLIK
- `zkg-logo.png` - Logo ZKG (latające)
- `menu-icon.png` - Ikona menu (3 kreski)
- `star-icon.png` - Ikona gwiazdki
- `parking-icon.png` - Ikona parkingu
- `bus-icon.png` - Ikona autobusu
- `train-icon.png` - Ikona pociągu
- `money-icon.png` - Ikona monet
- `bus-red-icon.png` - Czerwona ikona autobusu
- `parking-bus-icons.png` - Ikony w nagłówku
- `calendar-icon.png` - Ikona kalendarza

## 🚀 Uruchomienie

Wystarczy otworzyć `index.html` w przeglądarce lub uruchomić lokalny serwer:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Następnie otwórz: `http://localhost:8000`

## 💾 Dane przechowywane w localStorage

Aplikacja przechowuje dane lokalnie:
- Imię i nazwisko użytkownika
- Numer dowodu osobistego
- Wybrany typ biletu
- Cena biletu
- Data zakupu i ważności
- Numer biletu i numer kontrolny

## 🎭 Funkcje

- **Animowany kod QR** - kod QR na bilecie pulsuje
- **Latające logo ZKG** - logo przelatuje z lewej do prawej
- **Timer** - odliczanie czasu na ekranie zakupu
- **Responsywny design** - działa na telefonach i tabletach
- **PWA** - można zainstalować jak natywną aplikację

## ⚖️ Licencja i odpowiedzialność

Ta aplikacja jest stworzona **wyłącznie w celach edukacyjnych i rozrywkowych**.

**KATEGORYCZNIE ZABRANIA SIĘ** używania jej jako prawdziwego biletu komunikacji miejskiej!

Autor nie ponosi odpowiedzialności za niewłaściwe użycie aplikacji.

---

**Miłego testowania! 🎉**

(Ale pamiętaj - to tylko żart! 😄)
"# M0bi1eT" 
