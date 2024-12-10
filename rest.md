# Portfolio Management REST Client

### Create User
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}


### Create Portfolio Links
POST http://localhost:3000/api/portfolio/links
Content-Type: application/json

{
  "portfolioId": "portfolio_id_from_previous_response",
  "links": [
    {
      "url": "https://github.com/johndoe",
      "text": "GitHub Profile"
    },
    {
      "url": "https://linkedin.com/in/johndoe",
      "text": "LinkedIn Profile"
    }
  ]
}

### Create Portfolio Social Profiles
POST http://localhost:3000/api/portfolio/socials
Content-Type: application/json

{
  "portfolioId": "portfolio_id_from_previous_response",
  "socials": [
    {
      "name": "Twitter",
      "link": "https://twitter.com/johndoe",
      "isVisible": true
    },
    {
      "name": "LinkedIn",
      "link": "https://linkedin.com/in/johndoe",
      "isVisible": true
    }
  ]
}

### Create Complete Portfolio Resume
POST http://localhost:3000/api/portfolio/resume
Content-Type: application/json

{
  "portfolioId": "portfolio_id_from_previous_response",
  "resume": {
    "skills": [
      "JavaScript",
      "React",
      "Node.js",
      "Prisma",
      "TypeScript"
    ],
    "experiences": [
      {
        "company": "Tech Innovations Inc.",
        "position": "Senior Software Engineer",
        "startDate": "2021-01-15",
        "endDate": "2023-12-31",
        "description": "Led development of scalable web applications using modern tech stack"
      },
      {
        "company": "Startup Solutions",
        "position": "Full Stack Developer",
        "startDate": "2019-06-01",
        "endDate": "2020-12-31",
        "description": "Developed and maintained multiple client projects"
      }
    ],
    "education": [
      {
        "institution": "Tech University",
        "degree": "BS in Computer Science",
        "startDate": "2015-09-01",
        "endDate": "2019-05-31"
      }
    ]
  }
}

### Create Comprehensive Portfolio in One Request
POST http://localhost:3000/api/portfolio/complete
Content-Type: application/json

{
  "userId": "user_id_from_previous_response",
  "links": [
    {
      "url": "https://github.com/johndoe",
      "text": "GitHub Profile"
    }
  ],
  "socials": [
    {
      "name": "Twitter",
      "link": "https://twitter.com/johndoe",
      "isVisible": true
    }
  ],
  "resume": {
    "skills": [
      "JavaScript",
      "React",
      "Node.js"
    ],
    "experiences": [
      {
        "company": "Tech Innovations Inc.",
        "position": "Senior Software Engineer",
        "startDate": "2021-01-15",
        "endDate": "2023-12-31",
        "description": "Led development of scalable web applications"
      }
    ],
    "education": [
      {
        "institution": "Tech University",
        "degree": "BS in Computer Science",
        "startDate": "2015-09-01",
        "endDate": "2019-05-31"
      }
    ]
  }
}

### Update Resume
PUT http://localhost:3000/api/resume/update
Content-Type: application/json

{
  "resumeId": "resume_id_to_update",
  "updateData": {
    "skills": [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "GraphQL"
    ],
    "experiences": [
      {
        "id": "experience_id_to_update",
        "company": "Tech Innovations Inc.",
        "position": "Lead Software Engineer",
        "startDate": "2021-01-15",
        "endDate": "2023-12-31",
        "description": "Led development of scalable web applications and architectural improvements"
      }
    ]
  }
}
