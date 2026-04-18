import { Award, Briefcase, Code2, GraduationCap, Lightbulb, Rocket } from "lucide-react";

export const timelineData = [
  {
    id: "1",
    period: "2023",
    title: "The Beginning — Curiosity & First Inspiration",
    description:
      "My journey into the world of technology began in 2023, during my final year of high school. I started exploring programming and reading about the technology industry and the influential figures who shaped it. That curiosity quickly turned into a real passion for computer science.",
    highlights: [
      "First exposure to programming in high school",
      "Inspired by the stories of technology leaders",
      "Began pursuing computer science as a career path",
    ],
    icon: Lightbulb,
  },
  {
    id: "2",
    period: "2023 – Present (Expected Graduation: 2027)",
    title: "Starting My Computer Science Degree",
    description:
      "In 2023, I began studying Computer Science at Misr Academy for Engineering and Technology. During this stage, I focused on building strong fundamentals and applying them through problem solving and continuous practice.",
    highlights: [
      "Data Structures and Object-Oriented Programming",
      "C++ and algorithmic thinking",
      "Mathematics for computer science and introductory Data Science",
      "Competitive programming, ICPC Mansoura Game of Coders, and Codeforces achievements",
    ],
    icon: GraduationCap,
  },
  {
    id: "3",
    period: "2025 – Present",
    title: "Transition to Modern Technologies — MERN Stack",
    description:
      "In 2025, I shifted my focus toward modern web technologies and began specializing in the MERN Stack. Through this transition, I started building real-world projects across web and desktop applications.",
    highlights: [
      "Specialized in MongoDB, Express, React, and Node.js",
      "Built practical projects beyond academic work",
      "Combined self-learning with real implementation",
    ],
    icon: Code2,
  },
  {
    id: "4",
    period: "June 2025 – December 2025",
    title: "DEPI — React Track & Achievement",
    description:
      "In June 2025, I joined the Digital Egypt Pioneers Initiative (DEPI) as a trainee in the React Track. During the program, I worked on practical projects with modern technologies and expanded my MERN Stack experience in a collaborative environment.",
    highlights: [
      "Completed the DEPI React Track",
      "Graduated as a Top Achiever",
      "Graduation project selected among the Top 5 Best Projects",
    ],
    icon: Award,
  },
  {
    id: "5",
    period: "2026 – Present",
    title: "Professional Experience — NOVA MIND",
    description:
      "After completing the program, I started working with Nova Mind through DEPI as a Coordinator in Round 4 of the training program. In this role, I contribute to organizing the training process and supporting participants while continuing to grow technically and professionally.",
    highlights: [
      "Working with Nova Mind through DEPI",
      "Supporting participants as a Coordinator",
      "Developing both technical and professional skills",
    ],
    icon: Briefcase,
  },
  {
    id: "6",
    period: "Today",
    title: "The Journey Continues",
    description:
      "Today, I continue learning, building projects, and improving my skills every day. For me, technology is not just a career, it is a continuous journey of learning, building, and creating impactful solutions.",
    highlights: [
      "Learning continuously",
      "Building projects consistently",
      "Focused on creating meaningful solutions",
    ],
    icon: Rocket,
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "Call Stack in JavaScript - Simple Explanation",
    date: "LinkedIn Post",
    summary:
      "Imagine the JavaScript engine as a small desk with a stack of papers. Each function call is pushed to the top of the stack, and once it finishes, JavaScript removes it and returns to the previous one. This post explains why the Call Stack matters, how execution stays organized, and what causes the 'Maximum call stack size exceeded' error.",
    readTime: "1 min read",
    tag: "JavaScript",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/abdullah-ahmed-mohamed_%D8%A7%D9%84%D9%80-call-stack-%D9%81%D9%8A-javascript-%D8%A8%D8%A8%D8%B3%D8%A7%D8%B7%D9%87-%D8%AA%D8%AE%D9%8A%D9%84-activity-7363665807710535680-ClZn?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFihEsABqM6ORgX_NkaZZRXEFQ3IG7s5Aeg",
  },
  {
    id: "2",
    title: "Quick Behind-the-Scenes Facts About JavaScript",
    date: "LinkedIn Post",
    summary:
      "A concise breakdown of what happens behind the scenes in JavaScript: the runtime, engine, call stack, heap, Web APIs, callback queue, event loop, Node.js differences, and how JIT compilation helps execute and optimize code.",
    readTime: "2 min read",
    tag: "JavaScript",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/abdullah-ahmed-mohamed_quick-behind-the-scenes-facts-about-javascript-activity-7363337483033407488-Po2H?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFihEsABqM6ORgX_NkaZZRXEFQ3IG7s5Aeg",
  },
  {
    id: "3",
    title: "Mini Guide: JavaScript in 9 Points",
    date: "LinkedIn Post",
    summary:
      "A short practical guide that highlights nine essential JavaScript concepts, including high-level behavior, garbage collection, JIT compilation, multi-paradigm programming, prototype-based OOP, first-class functions, dynamic typing, single-threaded execution, and the non-blocking event loop.",
    readTime: "2 min read",
    tag: "JavaScript",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/abdullah-ahmed-mohamed_mini-guide-javascript-in-9-points-activity-7362961540087439360-4C-T?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFihEsABqM6ORgX_NkaZZRXEFQ3IG7s5Aeg",
  },
  {
    id: "4",
    title: "What Is the DOM? Is It Part of JavaScript?",
    date: "LinkedIn Post",
    summary:
      "A clear explanation of what the DOM really is, how the browser turns HTML into a tree of objects, why the DOM is a browser API rather than part of JavaScript itself, and why understanding this difference matters for web developers.",
    readTime: "2 min read",
    tag: "Web APIs",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/abdullah-ahmed-mohamed_dom-activity-7357141665448427524-H70J?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFihEsABqM6ORgX_NkaZZRXEFQ3IG7s5Aeg",
  },
];
