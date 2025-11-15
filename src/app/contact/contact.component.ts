import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  showPopup = false;

  submitForm(form: NgForm) {
    if (form.invalid) return;

    const userID = 'mkHHIC3IJT3dsxXmc';

    const params = {
      name: form.value.name,
      email: form.value.email,
      title: form.value.subject,
      message: form.value.message
    };

    // Send email to YOU
    emailjs.send(
      'service_d71bela',
      'template_jzk72qa',
      params,
      userID
    );

    // Auto-reply to THEM
    emailjs.send(
      'service_d71bela',
      'template_c9qivvl',
      params,
      userID
    );

    this.showPopup = true;
    form.reset();
  }

  closePopup() {
    this.showPopup = false;
  }
}
