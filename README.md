# PharmQuest

An interactive educational web game that teaches pharmacology and the history of germ theory to secondary school students (ages 11–16). Built by **teachers, for classrooms**.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Zustand** for state management
- **FastAPI** (Python) microservice for dose-response curve calculations
- **SVG** for all visuals (no raster images or external game engine)

## Local Development

### Prerequisites

- Node.js 18+
- Python 3.12+
- `pip` (Python package manager)

### Setup

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server (in a separate terminal)
uvicorn api.index:app --reload --port 8000

# Start the Next.js dev server (in another terminal)
npm run dev
```

The Next.js dev server runs on `http://localhost:3000` and proxies `/api/py/*` requests to the FastAPI server at `http://localhost:8000`.

### Build

```bash
npm run build
```

## Vercel Deploy

```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Deploy
vercel --prod
```

The `vercel.json` and `api/index.py` are configured so that:
- The Next.js app uses the `@vercel/python@4.1.0` runtime for the FastAPI server
- Rewrites route `/api/py/*` requests to the Python serverless function

## Game Walkthrough

### Home Screen (`/`)

- Title page with a pill icon and glowing "Start Adventure" button
- Brief intro: you're a junior pharmacologist in 1870s London
- Lists all 3 levels with icons and descriptions

### Level 1 — The Great Debate (Germ Theory Timeline)

- **Goal:** Place 6 historical germ theory discoveries in chronological order
- **Mechanic:** Drag and drop cards using HTML5 drag-and-drop
- **Cards:** Semmelweis (1847), John Snow (1854), Pasteur (1859), Lister (1867), Koch (1884), Fleming (1928)
- **Scoring:** 10 pts per correct position, 5 pts for ±1 position off
- **Visual:** Parchment-textured cards, sepia tones, ink-style timeline

### Level 2 — Find the Safe Dose (Concentration-Effect Curve)

- **Goal:** Adjust the dose to hit the therapeutic window for 3 patients
- **Mechanic:** Interactive slider + real-time SVG dose-response curve
- **Drugs:** Aspirin, Morphine, Penicillin (each with different EC50 and Hill coefficients)
- **Curve:** Computed via FastAPI Python endpoint (`POST /api/py/curve`) with client-side fallback
- **Zones:** Sub-therapeutic (red), Therapeutic (green), Toxic (orange)
- **Scoring:** 20 pts per successfully treated patient

### Level 3 — Microscopy Mystery (Identify the Pathogen)

- **Goal:** Identify a pathogen from a blurred microscope view
- **Mechanic:** Spend "focus tokens" to progressively unblur an SVG pathogen
- **Pathogens:** Cholera, Influenza, Malaria (Plasmodium), Tuberculosis
- **Scoring:** 40 pts at maximum blur, scaling down to 10 pts
- **Features:** Historical context clues, fun fact cards upon identification

### Results Screen

- Animated score counter out of 200
- Grade: Apprentice Pharmacologist → Chief Pharmacologist
- Breakdown by level
- Key Facts Learned (auto-generated based on completed levels)
- Share Score button (copies to clipboard)
- Pure CSS confetti animation for scores ≥ 140
- Play Again button

## File Structure

```
pharmquest/
├── app/
│   ├── layout.tsx
│   ├── page.tsx           # Home screen
│   ├── globals.css
│   ├── level1/page.tsx    # Germ Theory Timeline
│   ├── level2/page.tsx    # Concentration-Effect Curve
│   ├── level3/page.tsx    # Microscopy Mystery
│   └── results/page.tsx   # Results screen
├── components/
│   ├── NavBar.tsx
│   ├── DragCard.tsx
│   ├── DoseSlider.tsx
│   ├── CurveChart.tsx
│   ├── MicroscopeView.tsx
│   └── Confetti.tsx
├── lib/
│   ├── gameState.ts       # Zustand store
│   └── drugData.ts        # Drug presets, pathogens, timeline events
├── api/
│   └── index.py           # FastAPI service
├── requirements.txt
├── vercel.json
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Accessibility

- `aria-label` on all interactive elements
- `role="button"` on clickable divs
- Colour contrast ≥ 4.5:1 for text
- Semantic HTML structure with `role="banner"`, `role="alert"`, `role="progressbar"`
