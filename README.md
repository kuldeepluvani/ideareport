# Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
# Gemini API Keys (for rotation)
# Get your API keys from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY_1=your_gemini_api_key_1_here
GEMINI_API_KEY_2=your_gemini_api_key_2_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Key Setup

1. **Get Gemini API Keys**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to create your API keys
2. **Create `.env.local`**: Create a `.env.local` file and add your actual API keys
3. **Key Rotation**: The app uses multiple API keys that rotate automatically for better reliability

This rotation helps with:
- Rate limiting management
- Better reliability
- Load distribution

## Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel dashboard:
   - `GEMINI_API_KEY_1`
   - `GEMINI_API_KEY_2`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy!

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- ✅ Automated idea generation every 10 minutes
- ✅ Gemini Pro 2.5 API integration
- ✅ CSV storage for latest 100 ideas
- ✅ Modern chat-like interface
- ✅ Animated countdown timer
- ✅ Three-tier domain selection
- ✅ Responsive design
- ✅ Real-time updates

## File Structure

```
saas-idea-generator/
├── app/
│   ├── api/
│   │   ├── generate-idea/route.ts
│   │   ├── ideas/route.ts
│   │   └── domains/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Timer.tsx
│   ├── IdeaBubble.tsx
│   └── DomainSelector.tsx
├── lib/
│   └── gemini.ts
├── data/
│   └── ideas.csv (auto-generated)
├── package.json
├── tailwind.config.js
├── vercel.json
└── README.md
```

## How It Works

1. **Domain Selection**: Choose a SaaS domain (CRM, Marketing, etc.)
2. **Subdomain Selection**: Pick a specific area within that domain
3. **Missing Piece**: Select what makes your idea unique (AI-powered, Mobile-first, etc.)
4. **Auto-Generation**: Every 10 minutes, a new idea is generated using Gemini Pro 2.5
5. **Storage**: Ideas are stored in CSV format and displayed in a chat-like interface
6. **Uniqueness**: The system checks against existing ideas to ensure uniqueness

## Customization

You can easily customize:
- Timer duration (change `600` seconds in Timer.tsx)
- Domain categories (modify `domains` object in gemini.ts)
- Missing pieces (modify `missingPieces` object in gemini.ts)
- UI colors (update CSS variables in globals.css)
- Idea format (modify the prompt in gemini.ts)

## Troubleshooting

- **API Key Issues**: Make sure both Gemini API keys are valid and have sufficient quota
- **CSV Errors**: Check file permissions in the `data/` directory
- **Timer Issues**: Ensure the browser tab is active for accurate timing
- **Deployment Issues**: Verify environment variables are set in Vercel

## Support

For issues or questions, please check the console logs and ensure all environment variables are properly set.
