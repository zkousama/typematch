import { useState, useCallback } from 'react';

interface Font {
  name: string;
  style: string;
  explanation: string;
  link: string;
}

interface FontStore {
  formData: any;
  fonts: Font[];
  loading: boolean;
  error: string | null;
  setFormData: (data: any) => void;
  submitForm: () => Promise<void>;
}

export const useStore = (): FontStore => {
  const [formData, setFormData] = useState({});
  const [fonts, setFonts] = useState<Font[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSetFormData = useCallback((data: any) => {
    setFormData((state) => ({ ...state, ...data }));
  }, []);

  const onSubmitForm = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/recommend-fonts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      setFonts(data); // Update the state with fetched data
      console.log('Updated fonts state:', data); // Log updated state
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return {
    formData,
    fonts,
    loading,
    error,
    setFormData: onSetFormData,
    submitForm: onSubmitForm,
  };
};
