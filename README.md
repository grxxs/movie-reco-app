# movie-reco-app

Aplikacja webowa do tworzenia osobistej biblioteki obejrzanych filmów i seriali oraz do rekomendacji kolejnych tytułów algorytmem content-based filtering. Projekt realizowany w ramach pracy inżynierskiej (Politechnika Lubelska).

> Status: wczesna faza implementacji. Roboczą nazwą projektu jest `movie-reco-app`.

## Cel projektu

Większość serwisów z filmami i serialami nie oferuje przejrzystych, spersonalizowanych rekomendacji albo chowa je za płatnym planem. Celem projektu jest darmowa aplikacja, która:

- łączy filmy i seriale w jednej bibliotece,
- pozwala oceniać tytuły i oznaczać status oglądania (w planach / w trakcie / obejrzane),
- poleca tytuły na podstawie cech wysoko ocenionych przez użytkownika produkcji.

## Stan realizacji

Zrobione:

- wyszukiwanie filmów i seriali po tytule (dane z TMDB, 10 najpopularniejszych wyników),
- stopka z wymaganą atrybucją TMDB,
- walidacja zmiennych środowiskowych przy starcie,
- baza danych (PostgreSQL na Supabase, ORM Prisma): schemat, migracje, włączone RLS,
- konta użytkowników i autoryzacja (Supabase Auth, e-mail i hasło): rejestracja, logowanie, wylogowanie, odświeżanie sesji,
- nagłówek zależny od stanu logowania,
- wdrożenie na Vercelu.

Planowane:

- strona szczegółów tytułu,
- biblioteka użytkownika: statusy, oceny w skali 1-5,
- serwis rekomendacji w Pythonie (FastAPI),
- zmiana i usuwanie konta,
- panel administratora,
- responsywny interfejs,
- wdrożenie serwisu rekomendacji (Railway) i konfiguracja produkcyjna.

## Stos technologiczny

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- Zod (walidacja formularzy)
- Supabase: PostgreSQL i Supabase Auth
- Prisma ORM 7
- TMDB API jako źródło danych o filmach i serialach

Planowo: Python + FastAPI (serwis rekomendacji).

## Uruchomienie lokalne

1. Skopiuj `.env.example` do `.env.local` i uzupełnij wartości (opis poniżej).

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

   Po instalacji automatycznie uruchamia się `prisma generate` (skrypt `postinstall`), który wymaga ustawionych zmiennych `DATABASE_URL` i `DIRECT_URL`.

3. Zastosuj migracje bazy danych:

   ```bash
   npx prisma migrate deploy
   ```

4. Uruchom serwer deweloperski:

   ```bash
   npm run dev
   ```

   Aplikacja będzie dostępna pod adresem http://localhost:3000.

Po zmianie plików `.env*` zrestartuj serwer deweloperski.

Podczas pracy nad schematem bazy używaj `npx prisma migrate dev --name <nazwa>`, a następnie ręcznie `npx prisma generate` (w Prismie 7 `migrate dev` nie generuje klienta).

## Konfiguracja Supabase

1. **Authentication → Sign In / Providers:** logowanie e-mailem i hasłem musi być włączone. Na czas developmentu wyłączone jest "Confirm email": rejestracja od razu tworzy sesję i nie wymaga konfiguracji SMTP. Po włączeniu potwierdzania e-maila rejestracja nie loguje już automatycznie i trzeba dodać obsługę linku potwierdzającego.
2. **Authentication → URL Configuration:** Site URL ustawiony na `http://localhost:3000`. Adres produkcyjny dodaje się przy wdrożeniu.
3. **Project Settings → API keys:** Project URL i klucz publishable trafiają do zmiennych środowiskowych poniżej. Klucz secret nie jest używany i nie może trafić do zmiennych z prefiksem `NEXT_PUBLIC_`.

## Zmienne środowiskowe

| Zmienna                                | Opis                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `TMDB_BEARER`                          | Token dostępu do API TMDB (API Read Access Token). Używany wyłącznie po stronie serwera.                     |
| `DATABASE_URL`                         | Connection string do bazy PostgreSQL (Supabase), używany przez aplikację. Tylko po stronie serwera.          |
| `DIRECT_URL`                           | Connection string do sesyjnego poolera (port 5432), używany wyłącznie przez Prisma CLI (migracje, generate). |
| `NEXT_PUBLIC_SUPABASE_URL`             | Adres projektu Supabase (Project URL). Zmienna publiczna, trafia do przeglądarki.                            |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Klucz publishable Supabase. Zmienna publiczna, trafia do przeglądarki.                                       |

Aplikacja sprawdza obecność wymaganych zmiennych przy starcie i kończy się błędem z nazwą brakującej zmiennej. Dotyczy to także `npm run build`, więc przy wdrożeniu zmienne muszą być ustawione przed zbudowaniem aplikacji.

Zmienne z prefiksem `NEXT_PUBLIC_` są wstawiane do kodu wysyłanego do przeglądarki podczas budowania, dlatego w kodzie odwołujemy się do nich zawsze wprost (`process.env.NEXT_PUBLIC_NAZWA`).

Plików `.env*` (poza `.env.example`) nie dodajemy do repozytorium.

## Uwierzytelnianie

- Konta, hasła i sesje obsługuje Supabase Auth. Tokeny sesji są przechowywane w ciasteczkach przez pakiet `@supabase/ssr`, więc serwer Next.js widzi, kto jest zalogowany.
- `proxy.ts` (w Next.js 16 dawniej `middleware.ts`) przy każdym żądaniu odświeża sesję. Nie decyduje o dostępie do stron.
- Tożsamość użytkownika jest weryfikowana po stronie serwera przez `getClaims()` (sprawdzenie podpisu tokena).
- Funkcja `currentUser()` zwraca wiersz użytkownika z własnej tabeli `users` (klucz: ten sam UUID co konto w Supabase) albo `null`. Wiersz jest tworzony przy pierwszym użyciu po zalogowaniu.
- Strony i akcje serwerowe, które wymagają zalogowanego użytkownika, same wywołują `currentUser()`. Layout nie służy do ochrony tras.

## Skrypty

| Komenda         | Działanie                         |
| --------------- | --------------------------------- |
| `npm run dev`   | serwer deweloperski               |
| `npm run build` | budowanie wersji produkcyjnej     |
| `npm start`     | uruchomienie zbudowanej aplikacji |
| `npm run lint`  | analiza kodu (ESLint)             |

## Struktura katalogów

```
app/
  components/   komponenty współdzielone (nagłówek, stopka, przyciski, formularze, wyniki wyszukiwania)
  lib/          logika pomocnicza: klient TMDB, klient Prisma, klienci Supabase (supabase/),
                akcje serwerowe (actions/), schematy walidacji, zmienne środowiskowe
  login/        strona logowania
  register/     strona rejestracji
  search/       strona wyszukiwania
  layout.tsx    wspólny układ strony
  page.tsx      strona główna
prisma/         schemat bazy i migracje
prisma7.config.ts   konfiguracja Prisma CLI
proxy.ts        odświeżanie sesji Supabase
```

## Atrybucja i warunki użycia TMDB

This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.

Aplikacja jest projektem niekomercyjnym i działa zgodnie z [warunkami użycia API TMDB](https://www.themoviedb.org/documentation/api/terms-of-use), w tym z limitem przechowywania danych TMDB (maksymalnie 6 miesięcy) i obowiązkiem atrybucji.
