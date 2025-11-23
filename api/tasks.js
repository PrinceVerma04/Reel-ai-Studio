const TASKS = [
    { id: 'script', name: 'Reel Script', icon: 'fa-file-lines', description: 'Complete script with hook, content, and CTA' },
    { id: 'hooks', name: 'Hook Ideas', icon: 'fa-fish', description: '10 attention-grabbing opening lines' },
    { id: 'captions', name: 'Captions', icon: 'fa-quote-left', description: 'Caption variations with emojis and hashtags' },
    { id: 'hashtags', name: 'Hashtag Strategy', icon: 'fa-hashtag', description: 'Strategic hashtag combinations' },
    { id: 'trends', name: 'Trending Ideas', icon: 'fa-fire', description: 'Current viral formats for your topic' },
    { id: 'visuals', name: 'Visual Concepts', icon: 'fa-palette', description: 'Shot-by-shot visual planning' },
    { id: 'thumbnail', name: 'Thumbnail Design', icon: 'fa-image', description: 'Eye-catching thumbnail concepts' },
    { id: 'music', name: 'Audio Strategy', icon: 'fa-music', description: 'Music and sound recommendations' },
    { id: 'series', name: 'Content Series', icon: 'fa-layer-group', description: '7-part serialized content plan' },
    { id: 'engagement', name: 'Engagement Tactics', icon: 'fa-comments', description: 'Interactive elements to boost engagement' },
    { id: 'posting', name: 'Posting Strategy', icon: 'fa-calendar', description: 'Optimal timing and frequency plan' },
    { id: 'analytics', name: 'Performance Tips', icon: 'fa-chart-line', description: 'Metrics and optimization guidance' },
    { id: 'competitor', name: 'Competitor Analysis', icon: 'fa-user-secret', description: 'Market insights and differentiation' },
    { id: 'storyboard', name: 'Video Storyboard', icon: 'fa-film', description: 'Complete shot-by-shot storyboard' }
];

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ success: true, tasks: TASKS, total: TASKS.length });
}
