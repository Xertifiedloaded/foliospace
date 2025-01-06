export const submitEmail = async (email) => {
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to join the waitlist');
      }
  
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  