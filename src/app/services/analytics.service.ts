
import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  collectionData,
  docData
} from '@angular/fire/firestore';

import { Observable, map } from 'rxjs';

// Types for sanity
export interface NavClicks {
  home: number;
  about: number;
  projects: number;
  reviews: number;
  contact: number;
  cv: number;
}

export interface NavDailyPoint extends NavClicks {
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private firestore: Firestore) {}

  /* ---------------------------------------------------------
     VISITOR COUNTER (analytics / visits)
  --------------------------------------------------------- */

  async incrementViews(): Promise<void> {
  const ref = doc(this.firestore, 'analytics', 'visits');
  const snap = await getDoc(ref);

  // Auto-fix missing document
  if (!snap.exists()) {
    await setDoc(ref, { count: 1 });
    return;
  }

  const current = snap.data()['count'] ?? 0;

  // Avoid rule rejection
  await updateDoc(ref, { count: current + 1 });
}


  getViews$(): Observable<number> {
    const ref = doc(this.firestore, 'analytics', 'visits');

    return docData(ref).pipe(
      map(data => (data && typeof data['count'] === 'number') ? data['count'] : 0)
    );
  }

  /* ---------------------------------------------------------
     TOTAL NAVBAR CLICK COUNTER (analytics / navClicks)
  --------------------------------------------------------- */

  async incrementNavClick(section: keyof NavClicks): Promise<void> {
    const ref = doc(this.firestore, 'analytics', 'navClicks');
    const snap = await getDoc(ref);

    const defaultStructure: NavClicks = {
      home: 0,
      about: 0,
      projects: 0,
      reviews: 0,
      contact: 0,
      cv: 0
    };

    if (!snap.exists()) {
      defaultStructure[section] = 1;
      await setDoc(ref, defaultStructure);
      return;
    }

    const data = snap.data() as NavClicks;
    const current = data[section] ?? 0;

    await updateDoc(ref, { [section]: current + 1 });
  }

  getNavClicks$(): Observable<NavClicks> {
    const ref = doc(this.firestore, 'analytics', 'navClicks');

    return docData(ref).pipe(
      map(data => ({
        home: data['home'] ?? 0,
        about: data['about'] ?? 0,
        projects: data['projects'] ?? 0,
        reviews: data['reviews'] ?? 0,
        contact: data['contact'] ?? 0,
        cv: data['cv'] ?? 0
      }))
    );
  }

  /* ---------------------------------------------------------
     DAILY NAV CLICKS (navDaily / YYYY-MM-DD)
     For time-series charts
  --------------------------------------------------------- */

  async incrementDailyNavClicks(section: keyof NavClicks): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const ref = doc(this.firestore, 'navDaily', today);
    const snap = await getDoc(ref);

    const base: NavClicks = {
      home: 0,
      about: 0,
      projects: 0,
      reviews: 0,
      contact: 0,
      cv: 0
    };

    if (!snap.exists()) {
      base[section] = 1;
      await setDoc(ref, { date: today, ...base });
      return;
    }

    const data = snap.data() as NavDailyPoint;
    const current = data[section] ?? 0;

    await updateDoc(ref, { [section]: current + 1 });
  }

  getNavDaily$(): Observable<NavDailyPoint[]> {
    const colRef = collection(this.firestore, 'navDaily');

    return collectionData(colRef, { idField: 'date' }).pipe(
      map((docs: any[]) =>
        docs
          .map(d => ({
            date: d['date'],
            home: d['home'] ?? 0,
            about: d['about'] ?? 0,
            projects: d['projects'] ?? 0,
            reviews: d['reviews'] ?? 0,
            contact: d['contact'] ?? 0,
            cv: d['cv'] ?? 0
          }))
          .sort((a, b) => a.date.localeCompare(b.date))
      )
    );
  }
}
