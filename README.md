# SimpleThreeDScene

Ein interaktives 3D-Scene-Projekt auf Basis von [Next.js](https://nextjs.org), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [three.js](https://threejs.org/), [next-intl](https://next-intl.dev/), [styled-components](https://styled-components.com/) und [Zustand](https://zustand-demo.pmnd.rs/).

---
## Anmerkungen

- Die „Fall“- und „Sprung“-Animationen werden bereits unterstützt, allerdings enthält das importierte Modell aktuell nur die Animationen „Run“, „Walk“, "TPose" und „Idle“.

- Falls sich das Routing zu langsam anfühlt, liegt das vermutlich am Runtime-Compiling von Next.js. Dann bitte den Build nutzen.

---

## Features

- **3D-Rendering:** Mit React Three Fiber und three.js für performante, deklarative 3D-Szenen.
- **Physik:** Integration von [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) für Physik-basierte Interaktionen.
- **Animierte Charaktere:** GLTF-Modelle mit Animationen, steuerbar per Tastatur und Maus.
- **State Management:** Globales State-Handling (z.B. Character-Store) mit Zustand.
- **Internationalisierung:** Mehrsprachigkeit via next-intl, Locale-Switch im UI.
- **Dark Mode:** Umschaltbar per Button.
- **Responsive UI:** Eigener Hook für Mobile-Detection (`useIsMobile`) (wip).
- **Styled Components:** Für modulare, dynamische Styles mit SSR-Unterstützung.
- **Modulare Architektur:** Klare Trennung von Komponenten, Hooks und Providern.

---

## Technologien & Zweck

| Technologie           | Zweck                                               |
|-----------------------|----------------------------------------------------|
| Next.js               | App-Router, SSR, Routing, Deployment               |
| React Three Fiber     | 3D-Rendering, Integration von three.js             |
| three.js              | Low-Level 3D-Engine                                |
| @react-three/rapier   | Physik-Engine für 3D-Objekte                       |
| Zustand               | Globales State-Management (z.B. Keyboard-Store)    |
| next-intl             | Internationalisierung, Locale-Handling             |
| styled-components     | CSS-in-JS, dynamische Styles, SSR                  |
| Leva                  | UI-Controls für Debugging und Parameter            |
| Prisma & ZenStack     | Datenbank, Migrations, Backend-Logik               |
| Faker                 | Generierung von Beispiel- und Seed-Daten           |

---

## Initialisierung & Entwicklung

### 1. **Node_Modules installieren**

```bash
pnpm install
# oder
npm install
# oder
yarn install
```

### 2. **Entwicklungsserver starten**

```bash
pnpm dev
# oder
npm run dev
# oder
yarn dev
```

### 3. **(Bei Bedarf) Docker starten und .env anpassen**
```bash
docker compose up -d
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

---

### 4. **Prisma & ZenStack**

Es wird **Prisma** und **ZenStack** für das Datenbank- und Backend-Management genutzt.

- **Prisma Migrate:**  
Bearbeite **niemals direkt das Prisma-Modell** (`prisma/schema.prisma`) – dieses wird automatisch von ZenStack generiert.  
Wenn du das ZenStack-Modell geändert hast, führe zuerst das Script aus, um das Prisma-Schema zu generieren:

```bash
pnpm schema
```

Danach kannst du eine Migration anlegen:

```bash
pnpm prisma migrate dev
```
oder
```bash
npx prisma migrate dev
```

- **ZenStack:**  
  ZenStack erweitert Prisma um Policies und deklarative Backend-Logik.  
  Nach Änderungen am Modell ggf. auch ZenStack generieren:
  ```bash
  pnpm zenstack generate
  ```

- **Seed-Datenbank:**  
  Um Beispieldaten einzuspielen, nutze:
  ```bash
  pnpm prisma db seed
  ```

---

### 5. **Code-Qualität: ESLint & Prettier**

Es wird **ESLint** und **Prettier** für einheitliches Linting und automatisches Code-Formatting genutzt.  
Bitte stelle sicher, dass dein Editor ESLint und Prettier aktiviert hat, damit alle denselben Style und Intellisense nutzen.
 ```bash
  pnpm lint 
  ```
---
### 6. **Builden**

Mit Next.js kannst du das Projekt für die Produktion bauen und testen:

```bash
pnpm build
pnpm start
```

**Hinweis:** 
Im Entwicklungsmodus (`pnpm dev`) kompiliert Next.js standardmäßig nur die Dateien, die gerade benötigt werden.  
Dadurch kann sich die App manchmal etwas "laggy" oder langsam anfühlen, besonders bei größeren Projekten.  
Ein echter Produktions-Build (`pnpm build` + `pnpm start`) ist deutlich performanter und zeigt die tatsächliche Geschwindigkeit der Anwendung.
---

## Warum Next.js und nicht Vite?

Ich habe mich für **Next.js** entschieden, weil es im Gegensatz zu Vite folgende Vorteile für dieses Projekt bietet:

- **Server Side Rendering (SSR) & Static Site Generation (SSG):**  
  Next.js ermöglicht echtes SSR und SSG out-of-the-box, was für SEO, Performance und Internationalisierung (next-intl) entscheidend ist.
- **App Router & File-based Routing:**  
  Die neue App-Router-Architektur von Next.js erlaubt eine klare Trennung von Server- und Client-Komponenten und ein sehr flexibles Routing.
- **Einfache Integration von SSR-fähigen Libraries:**  
  Features wie styled-components (SSR), next-intl (SSR), und dynamisches Laden von Übersetzungen funktionieren in Next.js nahtlos.
- **Deployment & Hosting:**  
  Next.js ist optimal für Deployment auf Vercel und anderen Plattformen vorbereitet.
- **Ökosystem & Community:**  
  Viele moderne React-Libraries (z.B. next-intl, next-auth) sind speziell für Next.js optimiert.

Vite ist ein großartiges Tool für reine Client-Apps, aber für ein SSR-/SSG-/i18n-/SEO-orientiertes 3D-Projekt ist Next.js die robustere Wahl.

---

## Projektstruktur (Auszug)

```
src/
  app/
    layout.tsx                # Root-Layout (SSR, Provider)
    AppProviders.tsx          # Bündelt globale Context-Provider (Client)
    3dScene/
      Character/
        PhysicBasedCharacter/
          PhysicBasedCharacter.tsx
          CharacterRenderer.tsx
        AnimationBasedCharacter/
          PhysicBasedCharacter.tsx
      Animations/
        hooks/
          useCharacterAnimation.tsx
      Controls/
        Hooks/
          useKeyBoardStore.ts
      Environment/
      Levels/
    hooks/
      use-mobile.ts             # Hook für Mobile-Detection
  components/
    layout/
      Header.tsx
      Footer.tsx
    ui/
      DarkModeSwitch.tsx
      app-sidebar.tsx
prisma/
  schema.prisma                 # Prisma Datenbankmodell

```

---

## Wichtige Hinweise

- **3D-Modelle:**  
  - GLTF-Modelle liegen im Verzeichnis `/public/models/`.
  - Beispiel-Modelle: [three.js GLTF Examples](https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf)
  - Überprüfe dein Modell: [GLTF Viewer](https://gltf-viewer.donmccurdy.com/)

---

## Weiterführende Links

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [three.js GLTF Examples](https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf)
- [next-intl Doku](https://next-intl.dev/docs/getting-started/app-router)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [styled-components](https://styled-components.com/docs/advanced#nextjs)
- [Prisma](https://www.prisma.io/docs/)
- [ZenStack](https://zenstack.dev/)

---
TODOs:

- Localication hinzufügen.
- Mobile-Optimierung und Touch-Steuerung verbessern.
- Weitere Beispiel-Charaktere und Animationen integrieren.
- Kamera- und Lichtsteuerung erweitern.
- Performance-Optimierungen (z.B. Suspense, Lazy Loading).
- Unit- und Integrationstests ergänzen.
- Dokumentation für Komponenten und Hooks erweitern.
- Deployment- , Hosting- Pipelines hinzufügen.
- Husky für git commands ausbauen
- Prisma für Character Erfolg Speicherung
- Auth  
- NextConfig ausbauen

---
## Lizenz

MIT