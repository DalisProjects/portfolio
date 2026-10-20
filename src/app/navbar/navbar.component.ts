import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuOpen = false;

  // Admin session
  isAdmin = false;
  private readonly adminSecret = '!DaliSecretmh123';

  constructor() {}

  ngOnInit(): void {
    this.loadAdminState();
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
