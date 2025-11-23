# Gemini Content Engine — Full Stack
<img width="1919" height="957" alt="Screenshot 2025-11-23 123710" src="https://github.com/user-attachments/assets/e486da7c-b7dc-4962-a12f-fdbe59ccf97f" />

## Here you can get the working video for this project
https://drive.google.com/drive/folders/1nZSO8fgUNLoZFJFx-HJGSB4gG_kjNMQp?usp=sharing


Lightweight full-stack demo that generates content strategies, images and short videos using Google Gemini / Veo models. Includes a Node.js backend (Express) and a static frontend (index.html).

## Features
- Generate full content strategy text (12-section structure)
- Automatic parsing into structured sections
- Auto-generate images (Gemini/Imagen) and short preview videos (Veo)
- Downloadable markdown output and media assets in `./outputs`
- Task-oriented endpoints for reel scripts, hooks, thumbnails, etc.

## Prerequisites
- Node.js v18+ (ESM support)
- npm
- Valid Gemini API key with access to the used models

## Install
1. Open a terminal in the project folder:
   cd "C:\Users\saish\OneDrive\Desktop\Ed-Tech\Project\gemini-content-engine"
2. Install dependencies:
   npm install

Note: Ensure the package.json dependency name for the Google SDK matches the SDK you installed (e.g., `@google/generative-ai` or `@google/genai`).

## Environment
Create a `.env` at the project root with:
GEMINI_API_KEY=your_real_api_key_here
PORT=3000

Important: Never commit your real API key to source control.

## Run
Start the server:
npm start

Open the frontend:
http://localhost:3000/

Health check:
GET http://localhost:3000/ping

## Main API Endpoints
- POST /generate-content
  - Body: { "topic": "Your topic here" }
  - Response: { success, content, sections, downloadUrl, stats }

- POST /generate-task
  - Body: { "task": "<taskId>", "topic": "..." }
  - Use /tasks to list available tasks

- GET /tasks
  - Lists available reel/task types

- GET /outputs/<file>
  - Serves generated images/videos/markdown

- GET /download/:filename
  - Triggers file download from outputs directory

## Frontend
Static UI in `index.html` interacts with the backend POST endpoints. Adjust `API_URL` if running backend on a different host/port.

## Troubleshooting
- "GEMINI_API_KEY not found": set GEMINI_API_KEY in `.env` and restart server.
- Empty/invalid AI responses: verify API key, model names, and installed SDK version — SDK response shapes can differ between versions.
- 404 or model errors: ensure model names in server code match models available to your API key (e.g., `gemini-2.5-flash`, `gemini-2.5-pro`, `imagen-3.0-generate-001`, `veo-3.1-generate-preview`).
- If using a different SDK package name, update imports in `server.js` accordingly and re-run `npm install`.

## Notes & Security
- Keep the `.env` file out of source control. Add `.env` to `.gitignore`.
- Generated files are saved to `./outputs`. Clean up sensitive assets as needed.
- Adjust body parser limits (currently `50mb`) if you handle large media payloads.

## Contributing / Extending
- Swap models or tune generationConfig/generation parameters in `server.js`.
- Add authentication or job queue for heavy video generation tasks.
- Improve parsing or map sections to richer UI components.

License: MIT
