import { Component, OnInit } from '@angular/core';
import { ReviewService, Review } from '../services/review.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reviews: Review[] = [];

  error: string | null = null;

  name: string = "Mohamed Ali MHADHBI";
  roles: string[] = [`Junior HCM Software Developer @Talentia Software, skilled in Angular, Node.js, MySQL and  RestAPIs. 
    Passionate about building efficient web apps.`]
  currentRole: string = '';
  roleIndex: number = 0;
  charIndex: number = 0;
    userName: string | null = null;

  votes: { [id: string]: 'helpful' | 'unhelpful' } = {};
  socialLinks = [
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/dalimh/' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/dalinamh/' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/+393511587478' }
  ];

  constructor(private analytics: AnalyticsService,private reviewService: ReviewService) {}

   ngOnInit(): void {
     const saved = localStorage.getItem("userProfile");

    if (saved) {
      const profile = JSON.parse(saved);
      this.userName = profile.name; // might be null if they skipped
    }
    this.typeRoles();
    this.reviewService.getReviews().subscribe({
      next: r => this.reviews = r,
      error: () => this.error = 'Failed to load reviews.'
    });
    const stored = localStorage.getItem('reviewVotes');
  if (stored) {
    try {
      this.votes = JSON.parse(stored);
    } catch {
      this.votes = {};
    }
  }
  }
private saveVotes() {
  localStorage.setItem('reviewVotes', JSON.stringify(this.votes));
}
  trackClick(section: any) {
    this.analytics.incrementNavClick(section);
    this.analytics.incrementDailyNavClicks(section);
  }
hasVoted(r: Review): boolean {
  return !!(r.id && this.votes[r.id]);
}
vote(r: Review, type: 'helpful' | 'unhelpful') {
  if (!r.id) return;
  if (this.hasVoted(r)) return; // already voted on this review

  if (type === 'helpful') {
    const current = r.helpful || 0;
    r.helpful = current + 1; // optimistic UI
    this.reviewService.setHelpful(r.id, r.helpful)
      .catch(() => this.error = 'Failed to update helpful count.');
  } else {
    const current = r.unhelpful || 0;
    r.unhelpful = current + 1;
    this.reviewService.setUnhelpful(r.id, r.unhelpful)
      .catch(() => this.error = 'Failed to update unhelpful count.');
  }

  this.votes[r.id] = type;
  this.saveVotes();
}

getVote(r: Review): 'helpful' | 'unhelpful' | null {
  if (!r.id) return null;
  return this.votes[r.id] || null;
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
