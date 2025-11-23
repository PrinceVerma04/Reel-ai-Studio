# Reel AI Studio — AI-Powered Content Creation Platform

<img width="1919" height="957" alt="Reel AI Studio Interface" src="https://github.com/user-attachments/assets/e486da7c-b7dc-4962-a12f-fdbe59ccf97f" />

## 🎥 Demo Video
Watch the full working demo: [Google Drive](https://drive.google.com/drive/folders/1nZSO8fgUNLoZFJFx-HJGSB4gG_kjNMQp?usp=sharing)

## 🚀 Live Demo
**Deployed on Railway:** [https://reel-ai-studio-production.up.railway.app](https://reel-ai-studio-production.up.railway.app)
<img width="1821" height="831" alt="Screenshot 2025-11-23 144023" src="https://github.com/user-attachments/assets/a182eb3c-4bd2-4eda-9be8-ba67e1d84bf5" />


---

## 📖 Overview

Full-stack AI content generation platform powered by Google Gemini 2.5 Flash. Create professional Instagram Reel content including scripts, hooks, captions, hashtags, visual concepts, and more — all generated instantly with AI.

### ✨ Features

- **14 AI-Powered Tasks**: Reel scripts, hooks, captions, hashtags, trends, visuals, thumbnails, music strategy, content series, engagement tactics, posting strategy, analytics, competitor analysis, and storyboards
- **Batch Mode**: Generate multiple content pieces with one prompt
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Real-time Generation**: Instant AI responses using Gemini 2.5 Flash
- **Professional UI**: Modern, responsive interface with smooth animations
- **Export Ready**: Copy generated content directly or save for later

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **AI Model**: Google Gemini 2.5 Flash
- **Deployment**: Railway
- **Package Manager**: npm

---

## 📋 Prerequisites

- Node.js v18+ (ESM support)
- npm or yarn
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

---

## 🚀 Local Development

### 1. Clone the Repository
git clone https://github.com/PrinceVerma04/Reel-ai-Studio.git
cd Reel-ai-Studio

### 2. Install Dependencies


### 3. Set Up Environment Variables

Create a `.env` file in the project root:

GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000


⚠️ **Important**: Never commit your `.env` file to version control!

### 4. Run the Development Server

npm start

### 5. Open in Browser

Navigate to: `http://localhost:3000`

---

## 🌐 Deployment to Railway

### Step-by-Step Deployment Guide

#### 1. Push to GitHub

Ensure your code is on GitHub:


#### 2. Sign Up for Railway

- Go to [Railway.app](https://railway.app)
- Sign up with your GitHub account
- Authorize Railway to access your repositories

#### 3. Create New Project

- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Choose **"Reel-ai-Studio"** from your repositories

#### 4. Configure Environment Variables

- Go to your project's **Variables** tab
- Add the following variable:
  - **Key**: `GEMINI_API_KEY`
  - **Value**: Your Gemini API key
- Click **"Add"**

#### 5. Deploy

Railway will automatically:
- Install dependencies (`npm install`)
- Start your server (`npm start`)
- Deploy your application

#### 6. Generate Domain

- Go to **Settings** → **Networking**
- Click **"Generate Domain"**
- Your app will be live at: `https://your-app-name.up.railway.app`

#### 7. Verify Deployment

Test these endpoints:
- **Homepage**: `https://your-app-name.up.railway.app/`
- **Health Check**: `https://your-app-name.up.railway.app/ping`
- **Tasks API**: `https://your-app-name.up.railway.app/tasks`

---

## 📡 API Endpoints

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serve main application |
| `GET` | `/ping` | Health check |
| `GET` | `/tasks` | List all available tasks |
| `POST` | `/generate-task` | Generate content for specific task |

### Generate Task Request


### Response Example


---

## 🎨 Available Tasks

1. **Reel Script** - Complete script with hook, content, and CTA
2. **Hook Ideas** - 10 attention-grabbing opening lines
3. **Captions** - Caption variations with emojis and hashtags
4. **Hashtag Strategy** - Strategic hashtag combinations
5. **Trending Ideas** - Current viral formats
6. **Visual Concepts** - Shot-by-shot visual planning
7. **Thumbnail Design** - Eye-catching thumbnail concepts
8. **Audio Strategy** - Music and sound recommendations
9. **Content Series** - 7-part serialized content plan
10. **Engagement Tactics** - Interactive elements to boost engagement
11. **Posting Strategy** - Optimal timing and frequency plan
12. **Performance Tips** - Metrics and optimization guidance
13. **Competitor Analysis** - Market insights and differentiation
14. **Video Storyboard** - Complete shot-by-shot storyboard

---

## 🔧 Configuration

### Gemini Model Settings

Default configuration in `server.js`:


### Customization

- **Temperature** (0.0-1.0): Controls randomness (0.9 = creative)
- **topK**: Number of highest probability tokens to consider
- **topP**: Cumulative probability threshold
- **maxOutputTokens**: Maximum response length

---

## 🛡️ Security Best Practices

- ✅ Never commit `.env` file (already in `.gitignore`)
- ✅ Rotate API keys regularly
- ✅ Use environment variables for all sensitive data
- ✅ Monitor Railway usage to avoid unexpected charges
- ✅ Implement rate limiting for production use

---

## 📊 Railway Free Tier Limits

- **$5 credit/month** (~500 execution hours)
- Service sleeps after **15 minutes** of inactivity
- Automatic wake on request
- Upgrade available for 24/7 uptime

---

## 🐛 Troubleshooting

### Common Issues

**1. "GEMINI_API_KEY not found"**
- Ensure `.env` file exists with correct API key
- Restart the server after adding environment variables

**2. Railway deployment fails**
- Check build logs in Railway dashboard
- Verify `package.json` has correct dependencies
- Ensure environment variables are set in Railway

**3. API returns 500 errors**
- Verify Gemini API key is valid
- Check if you've exceeded API quota
- Review Railway logs for detailed error messages

**4. Website shows 404**
- Ensure `index.html` is in project root
- Check if `express.static('.')` is configured correctly

**5. Generation is slow**
- Normal for first request (cold start)
- Subsequent requests are faster
- Consider upgrading Railway plan for better performance

---

## 🔄 Updating Your Deployment

After making changes:


Railway will automatically redeploy your application.

---

## 📁 Project Structure


---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Future Enhancements

- [ ] Image generation with Imagen 3
- [ ] Video generation with Veo
- [ ] User authentication
- [ ] Save/export content history
- [ ] Multi-language support
- [ ] Custom AI model fine-tuning
- [ ] Collaborative workspace

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** for providing the AI models
- **Railway** for free hosting platform
- **Font Awesome** for icons
- **Express.js** for backend framework

---

## 📞 Support

For issues, questions, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/PrinceVerma04/Reel-ai-Studio/issues)
- **Email**: [tovermaprince@gmail.com](mailto:tovermaprince@gmail.com)
- **LinkedIn**: [@Prince Verma](https://www.linkedin.com/in/princeverma0411/)

---

## ⭐ Star This Repository

If you find this project useful, please consider giving it a star on GitHub!

---

**Made with ❤️ by Prince Verma**

*Last updated: November 23, 2025*
