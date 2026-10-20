import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  menuOpen = false;

  // Visitor counter
  views: number | null = null;
  loadingViews = true;

  // Admin session
  isAdmin = false;
  private readonly adminSecret = '!DaliSecretmh123';

  // Subscriptions
  private subs: Subscription[] = [];

  constructor(
    private analytics: AnalyticsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAdminState();
    this.handleDailyVisit();
    this.listenLiveViews();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  /* -------------------------------------------------------
     1) REAL-TIME VISITOR LISTENER
  -------------------------------------------------------- */
  private listenLiveViews() {
    const sub = this.analytics.getViews$().subscribe(count => {
      this.views = count;
      this.loadingViews = false;
      this.cd.detectChanges();
    });

    this.subs.push(sub);
  }

  /* -------------------------------------------------------
     2) DAILY VISITOR INCREMENT (ONE PER DAY PER DEVICE)
  -------------------------------------------------------- */
  private async handleDailyVisit() {
    const today = new Date().toDateString();
    const last = localStorage.getItem('lastVisit');

    if (last !== today) {
      await this.analytics.incrementViews();
      localStorage.setItem('lastVisit', today);
    }
  }

  /* -------------------------------------------------------
     3) NAVBAR CLICK TRACKING
  -------------------------------------------------------- */
  trackClick(section: any) {
    this.analytics.incrementNavClick(section);
    this.analytics.incrementDailyNavClicks(section);
  }

  /* -------------------------------------------------------
     4) ADMIN ACCESS
  -------------------------------------------------------- */
  private loadAdminState() {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  enableAdmin() {
    const pwd = prompt('Enter admin password:');
    if (!pwd) return;

    if (pwd === this.adminSecret) {
      this.isAdmin = true;
      localStorage.setItem('isAdmin', 'true');
      alert('Admin mode enabled.');
    } else {
      alert('Incorrect password.');
    }
  }

  disableAdmin() {
    this.isAdmin = false;
    localStorage.removeItem('isAdmin');
  }

  /* -------------------------------------------------------
     5) MOBILE MENU
  -------------------------------------------------------- */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
