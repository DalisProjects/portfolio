import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Portfolio Website',
      description: 'A website to showcase my work and projects.',
      image: 'assets/project1.png',
      link: '#'
    },
    {
      title: 'AXA NEGOCE Website',
      description: 'Full website development for AXA NEGOCE.',
      image: 'assets/project2.png',
      link: '#'
    },
    {
      title: 'Guest House Website',
      description: 'Custom website for a local guest house.',
      image: 'assets/project3.png',
      link: '#'
    }
  ];
}
