# Reel AI Studio

Quick start:
1. Install dependencies:
   npm install express cors dotenv @google/generative-ai

2. Create local env:
   cp .env.example .env
   # edit .env and set GEMINI_API_KEY

3. Run locally:
   npm run dev   # requires nodemon (npm i -D nodemon) or
   npm start

4. Endpoints:
   - GET /tasks        -> list available reel tasks
   - POST /generate-task { task, topic, options } -> generate content
   - GET /ping         -> health check

5. Push to GitHub:
   git add .
   git commit -m "Add config & README"
   git push origin main

6. (Optional) Add GEMINI_API_KEY as a repository secret for CI/CD or deployment.

That's it — run the server and test /generate-task with a JSON body like:
{ "task": "script", "topic": "productivity tips" }
