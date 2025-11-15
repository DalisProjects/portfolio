import { Component } from '@angular/core';

interface Tech {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: Tech[];
  role: string;
  type: string;       // University / Internship / Personal
  link?: string;
  github?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  selectedProject: Project | null = null;

  projects: Project[] = [

    {
      title: 'Portfolio Website',
      shortDescription: 'Personal website showcasing all my work.',
      fullDescription:
        'A fully responsive personal portfolio built with Angular. It includes sections for my projects, contact form using EmailJS, smooth animations, and a clean UI. Designed to be fast, modern, and mobile-friendly.',
      techStack: [
        { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
        { name: 'CSS', icon: 'devicon-css3-plain colored' },
        { name: 'HTML', icon: 'devicon-html5-plain colored' }
      ],
      role: 'Full Stack Developer: UI/UX design + logic + integrations.',
      type: 'Personal Project',
      link: 'https://dalisprojects.github.io/portfolio/',
      github: 'https://github.com/dalisprojects/portfolio'
    },

    {
      title: 'AXA NEGOCE Reservation Platform',
      shortDescription: 'Full-stack booking system with admin, partner, and visitor features.',
      fullDescription:
        'A complete reservation platform built using Angular, Node.js, and MySQL. Features include visitor bookings, partner dashboards for managing listings, and a full admin panel overseeing users, properties, and statistics. This was developed as a graduation project with full real-world requirements.',
      techStack: [
        { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'CSS', icon: 'devicon-css3-plain colored' }
      ],
      role: 'Full Stack Developer: backend logic, security, API, dashboards.',
      type: 'Graduation Project / Internship',
      link: 'https://dalisprojects.github.io/Senior-Stay-Reservations-System',
      github: 'https://github.com/dalisprojects/Senior-Stay-Reservations-System'
    },

    {
      title: 'Guest House Website',
      shortDescription: 'Website for a local guest house with booking features.',
      fullDescription:
        'Custom website built for a local guest house. Includes booking forms, gallery, responsive UI, and simple admin tools. Designed to be lightweight and easy for the owners to manage.',
      techStack: [
        { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'CSS', icon: 'devicon-css3-plain colored' }
      ],
      role: 'Full Stack Developer: booking logic, UI, and client requirements.',
      type: 'Freelance Project'
    },

    {
      title: 'Two-Factor Authentication Web App',
      shortDescription: 'Secure 2FA authentication system built for university coursework.',
      fullDescription:
        'A security-focused web app implementing registration, login, email verification, password recovery, and QR-based authentication via authenticator apps. Built using Angular and Node.js. The frontend is deployed, backend runs locally due to hosting limitations.',
      techStack: [
        { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
        { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
        { name: 'CSS', icon: 'devicon-css3-plain colored' }
      ],
      role: 'Full Stack Developer: implemented entire authentication flow.',
      type: 'University Project',
      link: 'https://dalisprojects.github.io/Two-Factor-Authentication-Web-App',
      github: 'https://github.com/dalisprojects/Two-Factor-Authentication-Web-App'
    }

  ];

  openModal(project: Project) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = null;
  }
}
