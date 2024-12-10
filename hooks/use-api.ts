
export async function fetchUserPortfolio(username: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/portfolio/${username}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`Failed to fetch portfolio. Status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    console.log('Parsed Data:', data);

    return data;
  } catch (error) {
    console.error('Error while fetching portfolio:', error);
    return null;
  }
}
