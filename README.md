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
- walidacja zmiennych środowiskowych przy starcie.

Planowane:

- baza danych (PostgreSQL na Supabase, ORM Prisma),
- konta użytkowników i autoryzacja,
- strona szczegółów tytułu,
- biblioteka użytkownika: statusy, oceny w skali 1-5,
- serwis rekomendacji w Pythonie (FastAPI),
- panel administratora,
- wdrożenie (Vercel, Railway, Supabase).

## Stos technologiczny

- Next.js (App Router), React, TypeScript
- Tailwind CSS
- TMDB API jako źródło danych o filmach i serialach

Planowo: PostgreSQL + Prisma (Supabase), Python + FastAPI.

## Uruchomienie lokalne

1. Zainstaluj zależności:

   ```bash
   npm install
   ```

2. Skopiuj `.env.example` do `.env.local` i uzupełnij wartości (opis poniżej).

3. Uruchom serwer deweloperski:

   ```bash
   npm run dev
   ```

   Aplikacja będzie dostępna pod adresem http://localhost:3000.

Po zmianie plików `.env*` zrestartuj serwer deweloperski.

## Zmienne środowiskowe

| Zmienna       | Opis                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| `TMDB_BEARER` | Token dostępu do API TMDB (API Read Access Token). Używany wyłącznie po stronie serwera. |

Aplikacja sprawdza obecność wymaganych zmiennych przy starcie i kończy się błędem z nazwą brakującej zmiennej. Dotyczy to także `npm run build`, więc przy wdrożeniu zmienne muszą być ustawione przed zbudowaniem aplikacji.

Plików `.env*` (poza `.env.example`) nie dodajemy do repozytorium.

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
  components/   komponenty współdzielone (stopka, wyniki wyszukiwania)
  lib/          logika pomocnicza (klient TMDB, typy, zmienne środowiskowe)
  search/       strona wyszukiwania
  layout.tsx    wspólny układ strony
  page.tsx      strona główna
```

## Atrybucja i warunki użycia TMDB

This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.

Aplikacja jest projektem niekomercyjnym i działa zgodnie z [warunkami użycia API TMDB](https://www.themoviedb.org/documentation/api/terms-of-use), w tym z limitem przechowywania danych TMDB i obowiązkiem atrybucji.
