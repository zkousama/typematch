import React from 'react';

interface Font {
  name: string;
  style: string;
  explanation: string;
  link: string;
}

interface FontRecommendationsProps {
  fonts: Font[];
}

const FontRecommendations: React.FC<FontRecommendationsProps> = ({ fonts }) => {
  console.log('Rendering FontRecommendations with fonts:', fonts); // Debug log

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recommended Fonts</h2>
      <ul className="space-y-4">
        {fonts.map((font, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{font.name}</h3>
            <p className="text-sm text-gray-600">{font.style}</p>
            <p className="mt-2">{font.explanation}</p>
            <a href={font.link} target="_blank" rel="noopener noreferrer" > Click here to view the font </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FontRecommendations;
