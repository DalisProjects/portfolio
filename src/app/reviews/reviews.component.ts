import { Component, OnInit } from '@angular/core';
import { ReviewService, Review } from '../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Review[] = [];
  rating = 0;
  email = '';
  name = '';
  message = '';
  sending = false;
  error: string | null = null;

  showForm = false;

  isAdmin = false;
  // after reviews: Review[] = [];
  votes: { [id: string]: 'helpful' | 'unhelpful' } = {};

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
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

  if (localStorage.getItem('isAdmin') === 'true') {
    this.isAdmin = true;
  }
}

private saveVotes() {
  localStorage.setItem('reviewVotes', JSON.stringify(this.votes));
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



  submit() {
    if (!this.name.trim() || !this.message.trim() || this.sending) return;

    // rate-limit logic you already had can stay here if present

    this.sending = true;
    this.error = null;

    this.reviewService.addReview({
      name: this.name.trim(),
      message: this.message.trim(),
      email: this.email.trim() || null,
      rating: this.rating,
    }).then(() => {
      this.name = '';
      this.message = '';
      this.email = '';
      this.rating = 0;
      this.showForm = false;
      this.sending = false;
      localStorage.setItem('lastReviewTime', Date.now().toString());
    }).catch(() => {
      this.error = 'Could not save review.';
      this.sending = false;
    });
  }

  // ✅ Delete review (admin only)
  deleteReview(r: Review) {
    if (!r.id) return;
    if (!confirm('Delete this review?')) return;

    this.reviewService.deleteReview(r.id).catch(() => {
      this.error = 'Failed to delete review.';
    });
  }
  
  // ✅ Toggle verified badge
  toggleVerify(r: Review) {
    if (!r.id) return;
    const newValue = !r.verified;

    this.reviewService.setVerified(r.id, newValue).catch(() => {
      this.error = 'Failed to update verification status.';
    });
  }
  

}
