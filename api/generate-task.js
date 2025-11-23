import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const REEL_TASKS = {
    'script': { name: 'Reel Script', prompt: (topic) => `Create a 30-60 second Instagram Reel script about "${topic}". Include: HOOK, MAIN CONTENT, CALL TO ACTION.` },
    'hooks': { name: 'Hook Ideas', prompt: (topic) => `Generate 10 scroll-stopping hook lines for "${topic}".` },
    'captions': { name: 'Captions', prompt: (topic) => `Write 5 Instagram caption variations for "${topic}".` },
    'hashtags': { name: 'Hashtag Strategy', prompt: (topic) => `Create hashtag strategy for "${topic}".` },
    'trends': { name: 'Trending Ideas', prompt: (topic) => `Suggest 10 trending Reel formats for "${topic}".` },
    'visuals': { name: 'Visual Concepts', prompt: (topic) => `Design 5 visual concepts for "${topic}".` },
    'thumbnail': { name: 'Thumbnail Design', prompt: (topic) => `Design 3 thumbnail concepts for "${topic}".` },
    'music': { name: 'Audio Strategy', prompt: (topic) => `Recommend audio strategy for "${topic}".` },
    'series': { name: 'Content Series', prompt: (topic) => `Create 7-part series about "${topic}".` },
    'engagement': { name: 'Engagement Tactics', prompt: (topic) => `Design engagement tactics for "${topic}".` },
    'posting': { name: 'Posting Strategy', prompt: (topic) => `Create posting strategy for "${topic}".` },
    'analytics': { name: 'Performance Tips', prompt: (topic) => `Provide analytics framework for "${topic}".` },
    'competitor': { name: 'Competitor Analysis', prompt: (topic) => `Analyze competitive landscape for "${topic}".` },
    'storyboard': { name: 'Video Storyboard', prompt: (topic) => `Create detailed storyboard for "${topic}".` }
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { task, topic } = req.body;

        if (!task || !topic) {
            return res.status(400).json({ success: false, error: 'Task and topic required' });
        }

        const taskConfig = REEL_TASKS[task];
        if (!taskConfig) {
            return res.status(400).json({ success: false, error: 'Invalid task' });
        }

        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            generationConfig: { temperature: 0.9, topK: 40, topP: 0.95, maxOutputTokens: 8192 }
        });

        const result = await model.generateContent(taskConfig.prompt(topic));
        let content = result.response.text().trim();

        return res.json({
            success: true,
            task,
            taskName: taskConfig.name,
            content,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
