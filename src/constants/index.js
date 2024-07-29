import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    profile,
    logout,
    sql,
    Rlogo,
    Tableu,
    gsheet,
    padmodaya,
    reg,
    pro,
    an,
    mit
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Frontend Developer",
      icon: web,
    },
    {
      title: "UI/UX Designer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Data Analyst",
      icon: creator,
    },
  ];
  
  const technologies = [
   
 
 
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
    {
      name: "sql",
      icon: sql,
    },
    {
      name: "Rlogo",
      icon: Rlogo,
    },
    {
      name: "Tableu",
      icon: Tableu,
    },
    {
      name: "Gsheet",
      icon: gsheet,
    },

  ];
  
  const experiences = [
    {
      title: "Junior Computer Engineering (Year 9-12)",
      company_name: "Padmodaya Public Secondary School",
      icon: padmodaya,
      iconBg: "#383E56",
      date: "Jan 2016 - Jan 2020",
      points: [
        "Intracted with basic of programming and databases",
        "Developed Blog App",
        "Specialized PHP and MySQL",
      
      ],
    },
    {
      title: "Frontend Web Developer",
      company_name: "Resimator.Oy",
      icon: reg,
      iconBg: "#E6DEDD",
      date: "Jan 2021 - Feb 2022",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews by sinior developers.",
      ],
    },
    {
      title: "Bachelor in Software Engineering",
      company_name: "Melbourne Institute of Technology",
      icon: mit,
      iconBg: "#383E56",
      date: "Jul 2022- Present",
      points: [
        "Learning Software Development Lifecycle",
        "Leared Database Management systems",
        "Learning Web Application and App Developement",
        "Learning to implement blockchain and AI in Web application",
      ],
    },
   
  ];
  
  const testimonials = [
    {
      testimonial:
        "Nirmal Dangi is a focused and analytical individual who quickly advanced from an intern to a Front End Developer, mastering React and optimizing user experience. His diligence and fast learning ensure his continued success",
      name: "Anlisha Maharjan",
      designation: "Full Stack Developer",
      company: "Resimator OY",
      image:an,
    },
    {
      testimonial:
        "Nirmal Dangi is an exceptional Front End Web Developer with expertise in React and a keen ability to improve user experience. His diligence, fast learning, and problem-solving skills make him a valuable asset to any team.",
      name: "Mitra Mani Khanal",
      designation: "Freelancer",
      company: "Upwork",
      image: "",
    },
   
  ];
  
  const projects = [
    {
      name: "Cyclist Data Analysis",
      description:
        "In this project I am providing insights to stakeholder to better understand casual and member to they could convert casul to member in their app",
      tags: [
        {
          name: "bigquery",
          color: "blue-text-gradient",
        },
        {
          name: "tableu",
          color: "green-text-gradient",
        },
        {
          name: "sql",
          color: "pink-text-gradient",
        },
      ],
      icon:Tableu,
      image: pro,
      source_code_link: "https://public.tableau.com/app/profile/nirmal.dangi/viz/Dataanalystprojectcyclist",
    },
   
  ];

  export const dashNav = [
    {
      name: 'dashboard',
      // imgUrl: dashboard,
      link: '/',
    },
    {
      name: 'Tag',
      // imgUrl: createCampaign,
      link: '/create-campaign',
    },
    {
      name: 'Experience',
      // imgUrl: payment,
      link: '/',
      disabled: true,
    },
    {
      name: 'Project',
      // imgUrl: withdraw,
      link: '/',
      disabled: true,
    },
    {
      name: 'Technology',
      // imgUrl: profile,
      link: '/profile',
    },
    {
      name: 'Testomonial',
      imgUrl: profile,
      link: '/profile',
    },
    {
      name: 'logout',
      imgUrl: logout,
      link: '/',
      disabled: true,
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects};