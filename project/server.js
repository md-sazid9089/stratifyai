import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
	console.warn('GEMINI API key not set. Set GEMINI_API_KEY in .env');
}

app.post('/api/gemini', async (req, res) => {
	const { prompt, model = 'gemini-pro', maxOutputTokens = 1000 } = req.body;

	if (!prompt) {
		return res.status(400).json({ error: 'Prompt is required' });
	}

	const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: [{
					parts: [{
						text: prompt
					}]
				}],
				generationConfig: {
					maxOutputTokens: maxOutputTokens,
					temperature: 0.7,
				}
			})
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Gemini API Error:', response.status, errorText);
			return res.status(response.status).json({ 
				error: `Gemini API error: ${response.status}`,
				details: errorText
			});
		}

		const data = await response.json();
		console.log('Gemini API Success:', data);
		res.json(data);
	} catch (err) {
		console.error('Server Error:', err);
		res.status(500).json({ error: err.message });
	}
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
	console.log(`Gemini proxy server running on http://localhost:${port}`);
	console.log(`API Key configured: ${API_KEY ? 'Yes' : 'No'}`);
});
