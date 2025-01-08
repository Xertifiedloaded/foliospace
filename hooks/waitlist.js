export const submitEmail = async (email, setError) => {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data?.error || 'Something went wrong.');
      return false;
    }

    return data.message || true; 
  } catch (error) {
    console.error('Error:', error.message);
    setError('An unexpected error occurred.');
    return false;
  }
};
