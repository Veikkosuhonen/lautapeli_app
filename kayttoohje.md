# Käyttöohje

vanhentunut

## Uuden käyttäjän luonti

Mene osoitteeseen lautapelit.herokuapp.com, ja siirry kotinäkymästä rekisteröitymissivulle joko yläpalkin "register" napista 
(mobiililaitteella avautuu menu-napista) tai keskinäkymän linkistä.

Syötä rekisteröitymislomakkeeseen käyttäjän tiedot. "Username" on kirjautumiseen käytettävä nimi, "Name" on sovelluksessa muille näkyvä nimi. 
Nelinumeroisen rekisteröitymiskoodin ("Code") saat ylläpitäjältä. Huomaa että koodi vanhenee 48 tunnin kuluttua luonnista. 
Kun kaikki kentät on täytetty ja salasana ja käyttäjänimi ovat riittävän pitkät, rekisteröintinappi avautuu. 
Mikäli nimi tai käyttäjänimi on jo käytössä, palvelin ilmoittaa siitä, ja sinun täytyy valita toinen.

## Kirjautuminen

Kirjautumissivulle pääsee samoin kuin rekisteröitymissivulle, "login" napista. Syötä käyttäjänimi ja salasana. 

Mikäli käyttäjätunnuksesi on disabloitu ylläpitäjän toimesta, et voi kirjautua. Tätä voi kokeilla kirjautumalla tunnuksella `asd`, `asdasd`.

## Kotinäkymä

Näyttää käyttäjien, lautapelien ja pelattujen pelikertojen määrän, sekä viimeaikaisen toiminnan (tällä hetkellä kaikki tapahtumat). 
Viimeaikaisia tapahtumia (aktiviteetteja) klikkaamalla avautuu niihin liitetty linkki. Lautapelinappia klikkaamalla pääsee lautapelinäkymään.

## Lautapelit-näkymä

Varsinainen päänäkymä, näyttää viimeaikaisen toiminnan sekä kaikki sovellukseen lisätyt lautapelit. Lautapelien otsikoista pääse navigoimaan niiden omalle sivulle.
Lautapelejä voi hakea nimen perusteella, ja järjestää nimen, lisäysajankohdan, viimeisen pelikerran ja pelikertojen määrän perusteella. 
Plus-napista avautuu uuden lautapelin luonti-ikkuna.

## Uuden lautapelin luonti

Lautapelin luonti-ikkunassa on lomake, johon tulee antaa lautapelin nimi, sekä valinnainen kuvaus. 
Nimen tulee olla uniikki, ja sen pituus ei saa olla 0. Muita rajoitteita ei tällä hetkellä ole.

## Lautapelin näkymä

Lautapelin omassa näkymässä näytetään lautapelin omat tiedot.
Lautapelin kuvausta voi vapaasti muokata klikkaamalla kynä-nappia oikealla.

Näkymässä on myös kaikki pelikerrat ja niihin liittyvä informaatio. 
Pelikertoihin liittyy pelaajia, heidän pisteensä, päivämäärä ja pelin pituus.

## Pelikertojen lisääminen

Lautapelin omassa näkymässä on myös pelikertojen lisäämislomake.
Lomakkeeseen tulee valita päivämäärä, kesto minuuteissa, sekä pelaajia. Valituille pelaajille voi merkitä heidän pisteensä. 
Pelikerran keston tulee olla positiivinen luku, muita rajoitteita ei ole.

## Admin-käyttäjän näkymä

Sovelluksella on yksi admin-käyttäjä, jolla on oma näkymä osoitteessa /admin, johon kirjautunut admin-käyttäjä voi navigoida yläpalkista. 
Admin-käyttäjä näkee listan käyttäjistä ja voi disabloida ja enabloida käyttäjiä.
Admin-käyttäjä voi myös luoda näkymästä uusia rekisteröitymiskoodeja ja nähdä voimassa olevat koodit.
