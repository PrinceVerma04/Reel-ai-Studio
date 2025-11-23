import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.'));

if (!process.env.GEMINI_API_KEY) {
    console.error('❌ ERROR: GEMINI_API_KEY not found in .env file');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rateLimiter = {
    text: { lastRequest: 0, minDelay: 1000 },
};

async function ensureOutputDir() {
    try {
        await fs.access('./outputs');
    } catch {
        await fs.mkdir('./outputs', { recursive: true });
    }
}

async function waitForRateLimit(type) {
    const now = Date.now();
    const limiter = rateLimiter[type];
    const timeSinceLastRequest = now - limiter.lastRequest;
    
    if (timeSinceLastRequest < limiter.minDelay) {
        const waitTime = limiter.minDelay - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    limiter.lastRequest = Date.now();
}

// Generate image using Imagen 3
async function generateImage(prompt) {
    try {
        console.log('🎨 Generating image with Imagen 3...');
        
        const model = genAI.getGenerativeModel({ 
            model: 'imagen-3.0-generate-001'
        });

        const enhancedPrompt = `Professional Instagram Reel thumbnail: ${prompt}. Style: modern, vibrant, eye-catching, 9:16 vertical format, high quality, bold colors, social media aesthetic, professional photography.`;

        const result = await model.generateContent(enhancedPrompt);
        const response = await result.response;

        // Extract image data
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const buffer = Buffer.from(part.inlineData.data, 'base64');
                    const filename = `reel-${Date.now()}.png`;
                    await fs.writeFile(`./outputs/${filename}`, buffer);

                    console.log(`✅ Image saved: ${filename}`);
                    return {
                        filename,
                        url: `/outputs/${filename}`
                    };
                }
            }
        }

        return null;

    } catch (error) {
        console.error('❌ Image generation error:', error.message);
        return null;
    }
}

const REEL_TASKS = {
    'script': {
        name: 'Reel Script',
        icon: 'fa-file-lines',
        description: 'Complete script with hook, content, and CTA',
        prompt: (topic) => `Create a 30-60 second Instagram Reel script about "${topic}". Include: HOOK (first 3 seconds), MAIN CONTENT (engaging tone), CALL TO ACTION. Keep it viral-worthy.`
    },
    'hooks': {
        name: 'Hook Ideas',
        icon: 'fa-fish',
        description: '10 attention-grabbing opening lines',
        prompt: (topic) => `Generate 10 scroll-stopping hook lines for Instagram Reels about "${topic}". Make them pattern-interrupt style, curiosity-driven, emotion-triggering, under 10 words each.`
    },
    'captions': {
        name: 'Captions',
        icon: 'fa-quote-left',
        description: 'Caption variations with emojis and hashtags',
        prompt: (topic) => `Write 5 Instagram caption variations for a Reel about "${topic}". Each should include: engaging opening, value/story, CTA, emojis, 3-5 hashtags. Length: 100-150 words.`
    },
    'hashtags': {
        name: 'Hashtag Strategy',
        icon: 'fa-hashtag',
        description: 'Strategic hashtag combinations',
        prompt: (topic) => `Create hashtag strategy for Instagram Reels about "${topic}". Provide: 10 high-traffic hashtags (500k-5M posts), 10 medium (50k-500k), 10 niche (under 50k), best combinations, timing strategy.`
    },
    'trends': {
        name: 'Trending Ideas',
        icon: 'fa-fire',
        description: 'Current viral formats for your topic',
        prompt: (topic) => `Suggest 10 trending Reel formats for "${topic}" working NOW. For each: trend name, how to adapt it, why it works, example execution, virality potential. Focus on transitions, POV, before/after.`
    },
    'visuals': {
        name: 'Visual Concepts',
        icon: 'fa-palette',
        description: 'Shot-by-shot visual planning',
        prompt: (topic) => `Design 5 visual concepts for Instagram Reels about "${topic}". For each: opening shot, key elements, transitions, text overlays, color scheme, camera angles.`
    },
    'thumbnail': {
        name: 'Thumbnail Design',
        icon: 'fa-image',
        description: 'Eye-catching thumbnail concepts',
        prompt: (topic) => `Design 3 scroll-stopping thumbnail concepts for Reels about "${topic}". For each: visual composition, text overlay, color psychology, emotion trigger, CTA element.`
    },
    'music': {
        name: 'Audio Strategy',
        icon: 'fa-music',
        description: 'Music and sound recommendations',
        prompt: (topic) => `Recommend audio strategy for Reels about "${topic}". Include: 5 trending audio types, trending vs original guidance, sound effects, voiceover tips, sync recommendations, BPM suggestions.`
    },
    'series': {
        name: 'Content Series',
        icon: 'fa-layer-group',
        description: '7-part serialized content plan',
        prompt: (topic) => `Create binge-worthy 7-part Reel series about "${topic}". For each episode: title/theme, 30-45s outline, talking points, visual hook, connection to previous, cliffhanger.`
    },
    'engagement': {
        name: 'Engagement Tactics',
        icon: 'fa-comments',
        description: 'Interactive elements to boost engagement',
        prompt: (topic) => `Design engagement tactics for Reels about "${topic}". Include: 5 interactive elements, comment-baiting strategies, save-worthy ideas, share triggers, stitch/duet opportunities.`
    },
    'posting': {
        name: 'Posting Strategy',
        icon: 'fa-calendar',
        description: 'Optimal timing and frequency plan',
        prompt: (topic) => `Create posting strategy for Reels about "${topic}". Provide: best posting times, optimal frequency, 7-day calendar, peak engagement windows, cross-posting strategy, batch tips.`
    },
    'analytics': {
        name: 'Performance Tips',
        icon: 'fa-chart-line',
        description: 'Metrics and optimization guidance',
        prompt: (topic) => `Provide analytics framework for Reels about "${topic}". Cover: key metrics (watch time, retention, shares, saves), benchmarks, iteration strategies, A/B testing, algorithm optimization.`
    },
    'competitor': {
        name: 'Competitor Analysis',
        icon: 'fa-user-secret',
        description: 'Market insights and differentiation',
        prompt: (topic) => `Analyze competitive landscape for "${topic}" on Instagram Reels. Provide: what's working, content gaps, unique angles, format analysis, 5 differentiation tactics, positioning strategy.`
    },
    'storyboard': {
        name: 'Video Storyboard',
        icon: 'fa-film',
        description: 'Complete shot-by-shot storyboard',
        prompt: (topic) => `Create detailed storyboard for 30-60s Reel about "${topic}". Include: shot-by-shot breakdown (numbered), timing, camera angles, text overlays, transitions, audio cues.`
    }
};

// ✅ THIS WAS MISSING - COMPLETE FUNCTION
async function generateTaskContent(task, topic, options = {}) {
    try {
        const taskConfig = REEL_TASKS[task];
        if (!taskConfig) throw new Error('Invalid task type');

        await waitForRateLimit('text');

        const prompt = taskConfig.prompt(topic, options);

        // ✅ GEMINI 2.5 FLASH
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            generationConfig: {
                temperature: 0.9,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        });

        console.log(`🤖 Generating ${taskConfig.name} for "${topic}"...`);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let content = response.text();

        content = content
            .replace(/\*\*\*(.+?)\*\*\*/g, '$1')
            .replace(/\*\*(.+?)\*\*/g, '$1')
            .replace(/\n{4,}/g, '\n\n')
            .trim();

        return {
            task,
            taskName: taskConfig.name,
            content,
            timestamp: new Date().toISOString()
        };

    } catch (error) {
        console.error(`❌ Error generating ${task}:`, error.message);
        throw new Error(`Generation failed: ${error.message}`);
    }
}

app.post('/generate-task', async (req, res) => {
    const { task, topic, options = {} } = req.body;

    if (!task || !topic) {
        return res.status(400).json({
            success: false,
            error: 'Task and topic are required'
        });
    }

    const taskConfig = REEL_TASKS[task];
    if (!taskConfig) {
        return res.status(400).json({
            success: false,
            error: 'Invalid task type'
        });
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📝 Request: ${taskConfig.name}`);
    console.log(`🎯 Topic: "${topic}"`);
    console.log(`${'='.repeat(60)}\n`);

    try {
        await ensureOutputDir();

        const result = await generateTaskContent(task, topic, options);
        console.log(`✅ Success: ${result.content.length} characters generated`);

        // 🖼️ Generate image for visual tasks
        if (['thumbnail', 'visuals', 'storyboard'].includes(task)) {
            console.log('🎨 Attempting image generation...');
            const image = await generateImage(topic);
            if (image) {
                result.media = {
                    type: 'image',
                    url: image.url,
                    filename: image.filename
                };
                console.log(`✅ Image attached: ${image.filename}`);
            }
        }

        return res.json({
            success: true,
            ...result
        });

    } catch (error) {
        console.error('❌ Generation failed:', error.message);
        return res.status(500).json({
            success: false,
            error: error.message || 'Generation failed. Please try again.'
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.get('/tasks', (req, res) => {
    const tasks = Object.entries(REEL_TASKS).map(([key, config]) => ({
        id: key,
        name: config.name,
        icon: config.icon,
        description: config.description,
    }));

    res.json({
        success: true,
        tasks,
        total: tasks.length
    });
});

app.get('/ping', (req, res) => {
    res.json({
        status: 'healthy',
        model: 'gemini-2.5-flash',
        tasks: Object.keys(REEL_TASKS).length,
        timestamp: new Date().toISOString()
    });
});

app.use('/outputs', express.static('./outputs'));

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

app.listen(PORT, async () => {
    await ensureOutputDir();
    
    console.log('\n' + '='.repeat(70));
    console.log('🎬 REEL CREATION AI STUDIO - PROFESSIONAL EDITION');
    console.log('='.repeat(70));
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`🤖 AI Model: Gemini 2.5 Flash`);
    console.log(`🎨 Image Model: Imagen 3.0`);
    console.log(`🎯 Tasks: ${Object.keys(REEL_TASKS).length}`);
    console.log(`🔑 API: ${process.env.GEMINI_API_KEY ? '✅' : '❌'}`);
    console.log('='.repeat(70));
    console.log('\n💡 Ready!\n');
});
