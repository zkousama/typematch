import React from 'react';
import { useStore } from '@/store/fontStore';
import FontForm from '@/components/FontForm';
import FontRecommendations from '@/components/FontRecommendations';

const Home: React.FC = () => {
  const { fonts, loading, error, submitForm, setFormData, formData } = useStore();

  const handleSubmit = async () => {
    await submitForm(); // Ensure the form submission is awaited
  };

  console.log('Home component fonts state:', fonts); // Debug log

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Font Recommender</h1>
      <FontForm onSubmit={handleSubmit} setFormData={setFormData} formData={formData} />
      {loading && <p>Loading recommendations...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {fonts.length > 0 ? <FontRecommendations fonts={fonts} /> : <p>No recommendations available.</p>}
    </div>
  );
};

export default Home;
