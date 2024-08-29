### Jennifer Jakobsson


# Backend-baserad webbutveckling
### Projektarbete del 1, DT207G

<br>
<br>

# Webbtjänst

>### Beskrivning av projektarbete del 1:
>I denna del av projektarbetet har en webbtjänst skapats. Denna webbtjänst är baserad på en NoSQL-databas hos MongoDB. Databasen består av tre collections - users, bookings och dishes. Detta används för att lagra användare, bokningar och maträtter.
>
>Webbtjänsten används genom att köra kommando npm install för installation av nödvändiga npm-paket och npm run server för att starta webbtjänsten. En liveversion av webbtjänsten finns tillgänglig här: [Länk till API](https://pastaplace.onrender.com/)
>
>Denna webbtjänst är skapad med funktionalitet för autentisering med registrering av användarkonton samt inloggning och använder även JSON Web Token för sessionshantering samt förhindra obehörig åtkomst. Den är också skapad med syftet att skydda känslig data. För att hantera detta, samt bokningar och maträtter, använden den sig av CRUD (create, read, update and delete) för att addera, uppdatera och radera data.

<br>

### Användning av databas:

<br>

| Metod | Ändpunkt | Beskrivning |
|-----------------|-----------------|-----------------|
| GET | / | Hämtar webbtjänsten |
| GET | /admin | Skapar route som kräver autentisering |
| POST | /login | Route för inloggning (skapar token) |
| POST | /register | Route för registrering |
|
| GET | /dishes | Hämtar lagrade maträtter |
| POST | /dishes | Lagrar maträtt (kräver autentisering) |
| PUT | /dishes | Uppdaterar maträtt (kräver autentisering) |
| DELETE | /dishes | Raderar maträtt (kräver autentisering) |
|
| GET | /bookings | Hämtar lagrade bokningar (kräver autentisering) |
| POST | /bookings | Lagrar bokning |
| PUT | /bookings | Uppdaterar bokning (kräver autentisering) |
| DELETE | /bookings | Raderar bokning (kräver autentisering) |



<br>

### Ett objekt returneras/skickas som JSON med följande struktur:
#### /dishes:

```json
{
  "_id": ObjectId("66298100c0cfa4410c5346d1"),
  "name": "Lemon Pasta",
  "description": "Väldigt god och syrlig pasta!",
  "price": 129,
  "category": "Varmrätt",
  "contains": "Laktos, citrus",
  "created": 2024-06-07T20:06:51.798+00:00,
  "__v": 0
}
```
#### /bookings:

```json
{
  "_id": ObjectId("66298100c0cfa4410c5346d1"),
  "customer": {
    "name": "Jennifer Jakobsson",
    "phoneNumber": "0706312234",
    "email": "jeja2306@student.miun.se"
  },
  "bookingDate": 2024-09-06T23:29:00.000+00:00,
  "guests": 1,
  "requests": "Uteservering",
  "status": "Pending",
  "createdAt": 2024-08-27T19:29:50.438+00:00,
  "updatedAt": 2024-08-27T19:29:50.438+00:00,
  "__v": 0
}
```
#### /register:

```json
{
    "_id": ObjectId("66298100c0cfa4410c5346d1"),
    "username": "JEJA",
    "password": "$2b$10$cvUtx4KAbojrZIPUMFM56Oc52RCCdptxWn9z6haggxdKqhh7BDoaV",
    "firstname": "Jennifer",
    "lastname": "Jakobsson",
    "email": "jeja2306@student.miun.se",
    "created": 2024-06-07T20:06:51.798+00:00,
    "__v": 0
}
```