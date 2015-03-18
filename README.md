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
