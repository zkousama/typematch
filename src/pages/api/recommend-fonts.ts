// File: pages/api/recommend-fonts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

const fallbackRecommendations = [
  {
    name: "Roboto",
    style: "Sans-serif",
    explanation: "Versatile and modern, suitable for various project types.",
    link: "https://fonts.google.com/specimen/Roboto"
  },
  {
    name: "Merriweather",
    style: "Serif",
    explanation: "Elegant and readable, great for long-form content.",
    link: "https://fonts.google.com/specimen/Merriweather"
  },
  {
    name: "Montserrat",
    style: "Sans-serif",
    explanation: "Bold and contemporary, excellent for headlines and branding.",
    link: "https://fonts.google.com/specimen/Montserrat"
  },
  {
    name: "Lato",
    style: "Sans-serif",
    explanation: "Clean and neutral, works well for body text and user interfaces.",
    link: "https://fonts.google.com/specimen/Lato"
  },
  {
    name: "Playfair Display",
    style: "Serif",
    explanation: "Stylish and distinctive, ideal for headings in elegant designs.",
    link: "https://fonts.google.com/specimen/Playfair+Display"
  }
];

function cleanJsonResponse(response: string): string {
    // Remove markdown code block syntax
    let cleaned = response.replace(/```json\n?|\n?```/g, '');
    
    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();
    
    // Attempt to parse the response as JSON
    try {
      const json = JSON.parse(cleaned);
      return JSON.stringify(json); // Re-stringify to ensure it's valid JSON
    } catch {
      // If parsing fails, assume it's not a JSON array and wrap it
      return `[${cleaned}]`;
    }
}  

async function getGeminiRecommendations(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();

    console.log('Raw Gemini response:', responseText);

    const cleanedResponse = cleanJsonResponse(responseText);
    console.log('Cleaned Gemini response:', cleanedResponse);

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Error getting Gemini recommendations:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userInput = req.body;

      const prompt = `Based on the following project details, suggest 5 appropriate fonts with their styles, a brief explanation of why they fit, check for the fonts from the following websites only:
      - Dafont
      - Fontshare
      - Open Foundry
      - Free Faces
      - UNCUT
      - Use & Modify
      - Velvetyne
      - Collletttivo
      - Badass Libre Fonts by Women
      - Tunera
      - Death of Typography
      - Pixel Surplus
      - The League
      - Fonts in the Wild
      
      ${JSON.stringify(userInput, null, 2)}
      
      Format the response as a JSON array with objects containing:
      {
        "name": "Font Name",
        "style": "Font Style (e.g., Sans-serif, Serif, Display, etc.)",
        "explanation": "Brief explanation of why this font fits the project",
        "link": "URL to the font"
      }
      
      Return only the JSON array, without any additional text or formatting.`;
      

      let recommendations;

      try {
        recommendations = await getGeminiRecommendations(prompt);
        console.log('Cleaned Gemini response:', recommendations);
      } catch (error) {
        console.error('Gemini API error:', error);
        recommendations = fallbackRecommendations;
        console.log('Using fallback recommendations');
      }

      res.status(200).json(recommendations);
    } catch (error: any) {
      console.error('Unexpected error in font recommendation:', error);
      res.status(500).json({ error: `Failed to generate recommendations. Please try again. Error: ${error.message}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
