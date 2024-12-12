Wymagania:
- NodeJS wersja 18
- MongoDB

Instalacja server:
1. Przejdz do folderu: server
2. npm install
3. npm run dev
4. Jesli wszystko poszlo ok w konsoli powinien pojawic sie komunikat:
Server running on port 5000

Instalacja client:
1. Przejdz do folderu: client
2. npm install
3. npm start
4. Jesli wszystko poszlo ok w konsoli powinien pojawic sie komunikat:
Local: http://localhost:3000

Polaczenie z baza danych:
1. Wyedytuj plik server/.env i skonstruuj poprawny URL dostepu do bazy MongoDB
MONGO_URI = mongodb+srv://<user>:<password>@<cluster-address>/<database>
