import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, orderBy, query, doc,deleteDoc,updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Review {
  id?: string;
  name: string;
  message: string;
  createdAt: number;
  email?: string | null;
  rating?: number;
  verified?: boolean;   // ✅ NEW
    helpful?: number;    // ✅ NEW
  unhelpful?: number;  // ✅ NEW
}



@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewsCollection = collection(this.firestore, 'reviews');

  constructor(private firestore: Firestore) {}

  // GET reviews from Firestore
  getReviews(): Observable<Review[]> {
    const q = query(this.reviewsCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Review[]>;
  }
  deleteReview(id: string) {
  const ref = doc(this.firestore, 'reviews', id);
  return deleteDoc(ref);
}

setVerified(id: string, value: boolean) {
  const ref = doc(this.firestore, 'reviews', id);
  return updateDoc(ref, { verified: value });
}

  // ADD review to Firestore
  addReview(data: { name: string; message: string; email?: string | null; rating: number }) {
  return addDoc(this.reviewsCollection, {
    ...data,
    verified: false,         // ✅ default: not verified
    helpful: 0,          // ✅ NEW
    unhelpful: 0,        // ✅ NEW
    createdAt: Date.now()
  });
}
setHelpful(id: string, newCount: number) {
  const ref = doc(this.firestore, 'reviews', id);
  return updateDoc(ref, { helpful: newCount });
}

setUnhelpful(id: string, newCount: number) {
  const ref = doc(this.firestore, 'reviews', id);
  return updateDoc(ref, { unhelpful: newCount });
}


}
