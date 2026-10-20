import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent {

  // Local PDF files inside src/assets
  cvLinks = {
    en: 'assets/MohamedAli_Mhadhbi_CV_EN.pdf',
    it: 'assets/MohamedAli_Mhadhbi_CV_IT.pdf'
  };

  cvUrl: string = this.cvLinks.en;    // default EN
  safeCvUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.updateSafeUrl();
  }

  switchLanguage(lang: 'en' | 'it') {
    this.cvUrl = this.cvLinks[lang];
    this.updateSafeUrl();
  }

  private updateSafeUrl() {
    // Direct PDF URL, no Google viewer
    this.safeCvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cvUrl);
  }

}
