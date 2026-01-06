# PANTOhealth Frontend Assignment — Train Stations Map

A frontend application that visualizes train stations in Germany on an interactive Leaflet map.  
This project was built as part of the **PANTOhealth Frontend Assignment**, focusing on clean React architecture, data handling, and user interaction.

---

## Live Demo

🔗 **Live URL:**  
https://panto-stations.vercel.app/

---

## Local Development

```bash
npm install
npm run dev
```

http://localhost:5173

---

## Features

- Fetches train station data from a remote API
- Displays stations on an interactive **Leaflet map**
- Map centered on **Germany** by default
- Each station displayed as a map marker
- Filter stations by **city** (search input or dropdown)
- Station list synchronized with map markers
- Clicking a station:
  - Highlights it in the list
  - Zooms and centers the map on the selected station
- Proper handling of **loading** and **error** states
- Includes **unit testing**
- Fully deployed and production-ready

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Leaflet / react-leaflet
- Vitest + Testing Library
- GitHub + Vercel (Deployment)

---

## Project Structure

```txt
src/
  features/
    stations/
      components/      # Map, list, filter UI
      hooks/           # Data fetching logic
      utils/           # Filtering & helpers
      api.ts           # API access
      types.ts         # Domain types
  shared/
    layout/            # App layout
    leafletIconFix.ts # Leaflet marker fix
  test/                # Test setup
  App.tsx
  main.tsx
  index.css
```
---

## Design Decisions

```txt
Local component state for simplicity and clarity

Derived state for filtered results

Feature-based folder structure for scalability

Leaflet marker icon fix included for Vite compatibility

Minimal and accessible UI using Tailwind CSS