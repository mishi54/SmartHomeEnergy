⚙️ Backend (Node.js, Express, Sequelize)
1. Auth Module
Register/Login with JWT authentication

User info stored in users table

Role support (Admin/User)

🛰️ 2. Telemetry Module
Data Schema
telemetrydata table:

deviceId (UUID)

deviceName (string)

timestamp (datetime)

energyWatts (float)

userId (foreign key)

API Endpoints
POST /api/telemetry: Submit energy data

GET /api/telemetry/:deviceId: Get data for one device

GET /api/telemetry/summary: Summary for all devices per user

Services
Data filtering limited to the last 7 days

getTelemetrySummaryByUser() computes total & average per device

 3. Telemetry Simulation
After registration, simulateInitialTelemetry(userId) runs:

Adds 5 fixed devices:

Living Room AC

Kitchen Fridge

Washing Machine

Bedroom Heater

TV Console

Generates 10 records per device for the current day

💬 4. Conversational AI Service
 Logic
Route: POST /api/chat

Input: Natural language question

Uses OpenAI GPT-3.5 with telemetry context

Extracts summary for each device

Selects relevant or top energy-consuming devices

Sends a prompt to OpenAI and returns a styled HTML response

Prompting Strategy
Filter devices using keyword matching from question

Return results in structured <ul><li> with inline styling

Strictly on-topic replies only about energy usage


In your env add these all before npm run dev
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_HOST=
JWT_SECRET_KEY=
PORT=
SMTP_EMAIL=
SMTP_PASSWORD=
SESSION_SECRET=
OPENAI_API_KEY=







