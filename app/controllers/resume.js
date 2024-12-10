
export function createLinks(links) {
    return links.map((link) => ({
      url: link.url,
      text: link.text,
    }));
  }
  
export function createSocials(socials) {
    return socials.map((social) => ({
      name: social.name,
      link: social.link,
      isVisible: social.isVisible || false,
    }));
  }
  

export function createExperiences(experiences) {
    return experiences.map((exp) => ({
      company: exp.company,
      position: exp.position,
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : null,
      description: exp.description,
    }));
  }
  

export function createEducation(education) {
    return education.map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      startDate: new Date(edu.startDate),
      endDate: edu.endDate ? new Date(edu.endDate) : null,
    }));
  }
  
  export function createResume(resume) {
    return {
      experiences: createExperiences(resume.experiences),
      education: createEducation(resume.education),
      skills: resume.skills,
    };
  }