import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  birthYear = 2001;
  age = new Date().getFullYear() - 2001;
  roles: string[] = [`<p>
    I’m Mohamed Ali MHADHBI, but most people just call me Dali. I’m ${this.age} years old, and i'm a Junior Software Developer. I’ve always had this strange fascination with code, the kind where you lose track of time fixing something small and suddenly the whole project makes sense. That feeling is what keeps me moving.
</p>

<p>
    I was born in Sousse, Tunisia on 16 November 2001. I graduated from high school in June 2021 as an Economics and Business student, but somewhere along the way, thanks to video games, curiosity, and a few late-night experiments, I realized I belonged in the world of programming. That’s what led me to El Manar Campus to pursue a bachelor’s degree in IT.
</p>

<p>
    In September 2024, I moved to Bari, Italy. Since then, I’ve been learning as much as I can, building things that matter to me, and pushing myself through advanced courses and hands-on projects. I’m the kind of person who can’t sit still when there’s something new to understand or create.
</p>

<p>
    I speak Arabic, English, and French, and I’ve reached a solid B2 level in Italian. I love working with people from different places, sharing ideas, and explaining complicated things in a simple way. Teaching and mentoring have helped me grow too guiding others teaches you a lot about yourself.
</p>`]
  currentRole: string = '';
  roleIndex: number = 0;
  charIndex: number = 0;
  ngOnInit(): void {
    this.typeRoles();
  }
  typeRoles() {
    const role = this.roles[this.roleIndex];
    if (this.charIndex < role.length) {
      this.currentRole += role.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.typeRoles(), 60);
    } 
  }
  workExperience = [
    {
      title: 'Junior HCM Technical Consultant',
      company: 'Talentia Software',
      location: 'Bari, Italy',
      period: 'Sett 2026 – Present',
      description: 'Configure, customize and support Talentia HCM solutions for client projects, translating HR and payroll requirements into working technical solutions. Handle data analysis, testing and troubleshooting, and work closely with functional consultants and clients.'
        },
    {
      title: 'English Teacher - PNRR FUTURA',
      company: 'PNRR Schools Project (Corato, Monopoli, Molfetta)',
      location: 'Bari, Italy',
      period: 'Nov 2024 – May 2025',
      description: 'Delivered engaging English lessons to teachers and students following the Cambridge curriculum, improving communication skills through immersive learning.'
    },
    {
      title: 'Full Stack Developer | AngularJS & NodeJS & RestAPIs',
      company: 'AXA NEGOCE',
      location: 'Tunis, Tunisia (Hybrid)',
      period: 'Dec 1 – Augost 2024',
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
      details: 'Hands-on training in React, Node.js, MySQL, REST APIs, and version control.',
      logo: "assets/develhope.jpeg"
    },
    {
      degree: 'Master’s in Computer Engineering – Cybersecurity & Cloud',
      institution: 'Politecnico di Bari',
      period: 'Aug 2024 – Present',
      details: 'Specializing in software engineering and secure cloud solutions.',
      logo: "assets/poliba.webp"
    },
    
    {
      degree: 'Bachelor’s in Business Computing',
      institution: 'El Manar University of Tunis',
      period: 'Aug 2021 – Apr 2024',
      details: 'Thesis: Full Stack Web Developer – Angular & Node.js',
      logo: "assets/manar.png"
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
