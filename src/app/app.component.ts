import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
ngAfterViewInit() {
  const vid = document.getElementById('bg-video') as HTMLVideoElement;
  setTimeout(() => vid?.play().catch(() => {}), 300);
}

}
