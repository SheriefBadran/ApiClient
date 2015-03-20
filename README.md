# Api Client

## Installationsmanual

0. [Installationsmanual API](https://github.com/SheriefBadran/ActivityApi)

1. Klona repot.
2. Se till att du har npm installerat.
3. I terminalen kör du sedan följande:
npm install

4. Om du inte har bower installerat måste du köra:
npm install bower --save

5. Kör sedan:
bower install

6. Starta Rails api servern (för den folder ActivityApi är klonat till).

7. Kör sedan gulp serve i teminalen (för den folder ApiClient är klonat till).

8. Kör applikationen i webbläsaren.

Lösenord för klientanvändare (resource creators):
* Användare 1:
  Användarnamn: test@test.com
  Lösenord: lotsofsecrets
* Användare 2:
  Användarnamn: test2@test.com
  Lösenord: supersecret
  
  OBSERVERA: Glöm inte att lägga in en ny api-nyckel i anropen till REST api:et i filen scripts/services/api.js efter databasen är seedad med exempeldata.

## Anpassningar i REST API

Den största anpassningen jag gjort i mitt REST api i efterhand är konfigurationer i modellen position för att få geocoder (gem) att bete sig rätt
vid postning/uppdatering av ett create/update formulär från klienten. När man skapar en resurs/aktivitet så vill jag att man ska kunna ange en adress
på flera olika format som sedan geocoder kan ta hand om. Som det är uppsatt nu kan geocoder fylla i med exempelvis postnummer och landskod och
spara det till databasen. Geocoder lägger också in latitud och longitud för en angiven adress. Därav har jag konfat geocoder till både geocoded_by
och reversed_geocoded_by.

Ytterligare anpassningar har som en påföljd av ovanstående fått göras i min activity_controller. Actionmetoden create måste skapa en position
på den adressen kontrollen får med en adressparameter. Den nya positionen läggs sedan på Activity.postion innan en activity sparas till databasen.

Jag hade heller inte sett till att resurser kan sparas, uppdateras och raderas endast av ägaren, vilket jag också fick lägga till logik för i efterhand.

Slutligen behövde jag i actionmetoden update lägga till logik för att uppdatera en kategori tillhörande som tillhör en befintlig aktivitiet.

## Betygshöjande faktorer

* Försök till att böja angular 1.4 till att vara så likt kommande angular 2.0 som möjligt med version 1.4 + ES 6. Varje direktiv är knuten
till en ES 6 klass.

* Nästan hela applikationen är byggd med komponenter som är löst kopplade till varandra och som är relativt lätt att återanvända.

* Använt custom directives genom hela applikationen.

* Deep linking.

* Sköter inloggning med JWT.

* För första gången testat på att använda både specen och angulars css ramverk för material design, vilket höjer upplevelsen av applikationen.

* Stöd för blinda med hjälp av aria-attribut.

* Implementation av karta som har en slider med vilken man kan justera sökradien. En förfrågan görs mot REST APIet real-time och kartan anpassar
zoom och visning av markers för aktiviteter för vald sökradie.
