import { Component } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private analytics: AnalyticsService) {}
  showWelcome = false;

  ngOnInit() {
    const saved = localStorage.getItem('userProfile');
    if (!saved) {
      this.showWelcome = true;
    }
  }

  closeModal() {
    this.showWelcome = false;
  }

views = 0;

ngAfterViewInit() {
  const vid = document.getElementById('bg-video') as HTMLVideoElement;
  if (vid) {
    setTimeout(() => {
      vid.muted = true;
      vid.play().catch(() => {});
    }, 300);
  }
}

}