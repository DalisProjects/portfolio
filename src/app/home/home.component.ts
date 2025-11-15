import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = "Mohamed Ali MHADHBI";
  roles: string[] = [`Full Stack Developer skilled in Angular, Node.js, and MySQL. 
    Passionate about building efficient web apps 
    and currently enhancing my skills through online IT training and personal projects.`]
  currentRole: string = '';
  roleIndex: number = 0;
  charIndex: number = 0;

  socialLinks = [
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/dalimh/' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/yourprofile/' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/3511587478' }
  ];

  constructor() {}

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

  
}
