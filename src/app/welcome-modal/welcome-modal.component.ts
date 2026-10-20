import { Component, Output, EventEmitter } from '@angular/core';
import { EmailLogService } from '../services/email-log.service';
@Component({
  selector: 'welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css']
})
export class WelcomeModalComponent {

  userName: string = "";

  @Output() closeModal = new EventEmitter<void>();
constructor(
  private emailLog: EmailLogService
) {}


  save() {
    this.emailLog.sendNamedUser(this.userName.trim());
    localStorage.setItem('userProfile', JSON.stringify({
      name: this.userName || null,
      firstVisit: false,
      
    }));
    
    this.closeModal.emit();
  }

  skip() {
    this.emailLog.sendSkippedUser();
    localStorage.setItem('userProfile', JSON.stringify({
      name: null,
      firstVisit: false
    }));
    
    this.closeModal.emit();
  }

  close() {
    this.skip();
  }
}
