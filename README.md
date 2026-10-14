# 🌾 Farm Friend AI | రైతు మిత్ర AI
### Smart, Free & Beginner-Friendly Agricultural Decision Assistant for Indian Farmers

Farm Friend AI (**రైతు మిత్ర AI**) is a complete web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is designed with a clean, high-contrast **green-and-white** aesthetic optimized for mobile screens, tablets, and desktops in rural and semi-urban agricultural belts across India.

---

## 🌟 Key Features

### 1. 🇮🇳 English & Telugu Bilingual Switching
- Instant one-click language toggle across every tab, form, tooltip, and advisory.
- Culturally tailored, respectful Telugu terminology (అన్నదాత, సస్య రక్షణ, జీవామృతం, భూసార పరీక్ష).
- Remembers user's language preference across sessions via `localStorage`.

### 2. ☀️ Live Weather & Agricultural Advisory (Open-Meteo API)
- **100% Free & No API Key Needed**: Connects directly to the Open-Meteo open-source meteorological API.
- **Geolocation & District Presets**: One-click GPS detection or selector for key agricultural hubs (Guntur, Warangal, Kurnool, East Godavari, Vijayawada, Khammam, Nizamabad, Anantapur, Belagavi, Pune, Ludhiana, Varanasi).
- **Farming Advisories**:
  - **Spraying Suitability**: Alerts farmers whether wind speed (< 15 km/h) and precipitation permit chemical spraying today.
  - **Rain Alerts**: 48-hour rainfall warnings to prevent washing off costly pesticides and fertilizers.
- **7-Day Forecast**: Daily max/min temperatures, weather codes, and precipitation probabilities.

### 3. 🔬 Plant Doctor (Honest Preliminary Crop Disease Guidance)
- **Zero Pretence Policy**: Transparently states that it does **not** simulate a high-dimensional proprietary vision model if none is configured.
- **Client-Side HTML5 Canvas Color Scanner**: Analyzes uploaded leaf photos directly in the browser to quantify:
  - Green healthy tissue percentage
  - Chlorosis (yellowing/mosaic) percentage
  - Necrotic (brown/dark fungal lesion) percentage
- **Guided Symptom Questionnaire**: Select plant part (Leaf, Stem, Fruit, Root) and observed physical symptoms (e.g. spindle blast spots, upward leaf curl, concentric rings, rosetted flowers).
- **Actionable Remedies**:
  - Eco-friendly natural solutions (Jeevamrutha, sour buttermilk, Neem oil 10,000 ppm, Agniastram, Trichoderma).
  - Recommended CIBRC-aligned chemical molecules with precise dosage per liter.
  - Preventive cultural hygiene practices.

### 4. 🧭 Crop Advisor (పంట సలహాదారు)
- Matches soil type (Black cotton, Red loamy, Alluvial, Sandy, Clayey), season (Kharif, Rabi, Zaid), and irrigation method (Borewell, Canal, Drip, Rainfed).
- Recommends optimal crops with:
  - Duration in days
  - Expected yield per acre
  - Water requirement intensity
  - Govt. Minimum Support Price (MSP) benchmark
  - Sowing & intercropping companion recommendations (e.g. Cotton + Red Gram 6:1).

### 5. 💧 Smart Watering Assistant (నీటి పారుదల సహాయకుడు)
- Intersects crop growth stage (Germination, Vegetative, Flowering, Fruiting, Maturity) with soil moisture retention and live Open-Meteo rainfall predictions.
- Verdicts:
  - **No Watering Needed**: Rain forecasted within 48 hours; saves electricity and prevents root rot.
  - **Water Today**: Soil depleted of readily available moisture at critical bloom/fruiting stage.
  - **Delay by 1-2 Days**: Soil still retains moisture reserve.
- Recommends optimal watering window (early morning / evening) to avoid midday evaporation losses.

### 6. 🤖 Rythu Mitra AI Chatbot (రైతు మిత్ర చాట్)
- Built-in farming knowledge base with instant responses in English and Telugu.
- Covers:
  - Step-by-step preparation of **Jeevamrutha**, **Neemastra**, and bio-concoctions.
  - Sucking pest management in Chilli (Black thrips, yellow mites).
  - Cotton Pink Bollworm management.
  - Paddy yellow stem borer control.
  - PM-Kisan Samman Nidhi e-KYC and installment assistance.
  - Soil Health Card sampling procedure.
- **Audio Voice Synthesis (Web Speech API)**: Farmers can click the "Listen / వినండి" button to hear answers read aloud.

### 7. 🧪 Fertilizer Guidance & Crucial Safety Warnings
- Calculates balanced **N-P-K** nutrient quantities and commercial fertilizer bags needed (Urea, DAP, MOP) based on crop and cultivated acreage.
- Displays basal dose vs split top-dressing schedule.
- Prominent **Critical Chemical Safety Instructions**:
  - Mandatory PPE (mask, gloves, boots, eye protection).
  - Wind direction & heat rules (no spraying between 12 PM - 3 PM or against wind).
  - Container puncture and safe disposal (never reuse for domestic water).
  - Pre-Harvest Interval (PHI) withholding periods.
  - Immediate emergency first-aid for chemical exposure.

### 8. 📅 Farming Calendar & Reminders (వ్యవసాయ క్యాలెండర్)
- **Auto-Schedule Generation**: Enter sowing date and crop -> generates key milestones (basal fertilizer, 1st weeding, 1st top dressing, pest scouting, harvest).
- Add custom reminders with categories (sowing, irrigation, fertilizer, pesticide, harvest).
- Persistent browser storage via `localStorage`.

### 9. 💰 Crop-Cost & Profit/Loss Calculator (ఖర్చులు - లాభనష్టాలు)
- Itemized input costs: Land tilling, seeds, fertilizers, pesticides, irrigation electricity, labor wages, machinery rent, transport.
- Revenue projection: Expected yield (quintals) × Selling price.
- Live MSP benchmark presets (Paddy ₹2,300, Cotton ₹7,121, Chilli ₹14,000, Groundnut ₹6,783, Maize ₹2,225, Red Gram ₹7,550).
- Calculates:
  - Total Cultivation Cost
  - Estimated Gross Revenue
  - Net Profit or Loss (₹)
  - Break-Even Selling Price per quintal
  - Return on Investment (ROI %)
- One-click Print/Save report formatted for clean paper output.

---

## 🛠️ Tech Stack

- **React 18** (Modern hooks, functional components)
- **TypeScript** (Strict types, clean interfaces)
- **Vite 5** (Fast development and optimized production bundling)
- **Tailwind CSS 3** (Custom green-and-white agricultural palette)
- **Lucide React** (Clean, mobile-friendly icons)
- **Open-Meteo API** (Free, no API key required)

---

## 🚀 Quick Setup & Run Instructions

### Prerequisites
Node.js (v18 or v20+) is required. (A portable copy has been installed in your user directory: `%LOCALAPPDATA%\Programs\node-v20.18.0-win-x64`).

### 1. Open Terminal in the Project Folder
```bash
cd "c:\Users\madha\Downloads\Farm Friend AI"
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will start at:
👉 **`http://localhost:5173`** (Accessible on your local machine and your mobile phone on the same Wi-Fi network).

### 4. Build for Production
```bash
npm run build
```

---

## 📞 Indian Farmer Support Helplines

- **Kisan Call Center (Toll-Free)**: **`1800-180-1551`** (6:00 AM to 10:00 PM, All 7 Days)
- **PM-Kisan Helpline**: `155261` / `011-24300606`
- **Emergency Ambulance**: `108`

---

## 📜 Disclaimer
Farm Friend AI provides preliminary guidance, decision support, and weather forecasts based on public scientific literature (ICAR, ANGRAU, PJTSAU) and Open-Meteo APIs. It does not replace on-field diagnostic verification by local Mandal Agricultural Officers (MAO/AEO) or Krishi Vigyan Kendra (KVK) scientists.
