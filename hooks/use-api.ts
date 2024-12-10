
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


export async function fetchProfileInfo() {
  try {
    const res = await fetch(`http://localhost:3000/api/portfolio/profile-data`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`Failed to fetch portfolio. Status: ${res.status}`);
      return null;
    }

    const {
      profile,
      portfolio: {
        links = [],
        socials = [],
        resume: { experiences = [], education = [] } = {}
      } = {}
    } = await res.json();
    console.log(profile);


    return { profile, links, socials, experiences, education };
  } catch (error) {
    console.error('Error while fetching portfolio:', error);
    return null;
  }
}
