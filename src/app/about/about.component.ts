import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  workExperience = [
    {
      title: 'English Teacher - PNRR FUTURA',
      company: 'PNRR Schools Project (Corato, Monopoli, Molfetta)',
      location: 'Bari, Italy',
      period: 'Nov 2024 – May 2025',
      description: 'Delivered engaging English lessons to teachers and students following the Cambridge curriculum, improving communication skills through immersive learning.'
    },
    {
      title: 'Full Stack Developer',
      company: 'AXA NEGOCE',
      location: 'Tunis, Tunisia',
      period: 'Jan 2024 – Jun 2024',
      description: 'Developed a booking and user management system using Angular, Node.js, and MySQL. Enhanced database stability and optimized loading speed by 30%.'
    },
    {
      title: 'Web Developer',
      company: 'Les Andalous Ceniat',
      location: 'Ariana, Tunisia',
      period: 'Nov 2022 – Jun 2023',
      description: 'Created a responsive website for a guesthouse using HTML, CSS, and JavaScript to simplify online booking management.'
    }
  ];

  education = [
    {
      degree: 'Online Full Stack Development Program',
      institution: 'Develhope S.R.L',
      period: 'Oct 2025 – Ongoing',
      details: 'Hands-on training in React, Node.js, MySQL, REST APIs, and version control.'
    },
    {
      degree: 'Master’s in Computer Engineering – Cybersecurity & Cloud',
      institution: 'Politecnico di Bari',
      period: 'Aug 2024 – Present',
      details: 'Specializing in software engineering and secure cloud solutions.'
    },
    
    {
      degree: 'Bachelor’s in Business Computing',
      institution: 'El Manar University of Tunis',
      period: 'Aug 2021 – Apr 2024',
      details: 'Thesis: Full Stack Web Developer – Angular & Node.js'
    }
  ];

  languages = [
    { name: 'English', level: 'C2', color: 'linear-gradient(135deg, #e94a00ff, #e52e71)' },
    { name: 'French', level: 'C1', color: 'linear-gradient(135deg, #ff8a00, #e52e71)' },
    { name: 'Italian', level: 'B2', color: 'linear-gradient(135deg, #e9a75cff, #ed5a90ff)' },
    { name: 'Arabic', level: 'C2', color: 'linear-gradient(135deg, #e94a00ff, #e52e71)' },
  ];

  volunteering = [
    {
      name: 'Rotaract Hammamet',
      role: 'Head of International Relations',
      period: 'Apr 2022 – Aug 2024',
      logo: 'assets/rotaract.jpg'
    },
    {
      name: 'La Lega del Filo d’Oro',
      role: 'Volunteer',
      period: 'Sep 2025 – Present',
      logo: 'assets/lega-del-filo-doro.png'
    }
  ];

  skills = [
    'Angular', 'React', 'Node.js', 'Express.js', 'HTML5', 'CSS3',
    'TypeScript', 'MySQL', 'REST APIs', 'Git', 'JWT', 'Problem Solving',
    'Communication', 'Agile Development'
  ];
}
