import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailLogService {

  private serviceId = 'service_d71bela';
  private publicKey = 'mkHHIC3IJT3dsxXmc';
  private templateId = 'template_c9qivvl'; // using your only template

  constructor() {}

  /* ----------------------------------------------------
     SEND WHEN USER ENTERS NAME
  ---------------------------------------------------- */
  async sendNamedUser(username: string) {
    const ip = await this.getIp();
    const browser = this.getBrowser();
    const device = this.getDeviceType();
    const screen = this.getScreenSize();
    const page = window.location.pathname;

    const params = {
      name: username,
      title: 'New visitor entered their name',
      message: 
        `Name: ${username}\n` +
        `IP: ${ip}\n` +
        `Browser: ${browser}\n` +
        `Device: ${device}\n` +
        `Screen: ${screen}\n` +
        `Page viewed: ${page}\n` +
        `Time: ${new Date().toISOString()}`
    };

    return emailjs.send(this.serviceId, this.templateId, params, this.publicKey);
  }

  /* ----------------------------------------------------
     SEND WHEN USER SKIPS MODAL
  ---------------------------------------------------- */
  async sendSkippedUser() {
    const ip = await this.getIp();
    const browser = this.getBrowser();
    const device = this.getDeviceType();
    const screen = this.getScreenSize();
    const page = window.location.pathname;

    const params = {
      name: 'Anonymous Visitor',
      title: 'Visitor skipped welcome modal',
      message:
        `A visitor skipped the welcome modal.\n` +
        `IP: ${ip}\n` +
        `Browser: ${browser}\n` +
        `Device: ${device}\n` +
        `Screen: ${screen}\n` +
        `Page viewed: ${page}\n` +
        `Time: ${new Date().toISOString()}`
    };

    return emailjs.send(this.serviceId, this.templateId, params, this.publicKey);
  }

  /* ----------------------------------------------------
     HELPERS
  ---------------------------------------------------- */

  private async getIp(): Promise<string> {
    try {
        const req = await fetch('https://ipwho.is/');
        const data = await req.json();

        if (!data.success) return 'Unknown location';

        return `
    IP: ${data.ip}
    Country: ${data.country} (${data.country_code})
    Region: ${data.region}
    City: ${data.city}
    Postal: ${data.postal || 'N/A'}
    Latitude: ${data.latitude}
    Longitude: ${data.longitude}
    Timezone: ${data.timezone.id}
    ISP: ${data.connection?.isp || 'Unknown ISP'}
    `.trim();

    } catch {
        return 'Unknown location';
    }
    }


  private getBrowser(): string {
    const ua = navigator.userAgent;

    if (/chrome|crios|crmo/i.test(ua)) return 'Chrome';
    if (/firefox|fxios/i.test(ua)) return 'Firefox';
    if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
    if (/edg/i.test(ua)) return 'Edge';
    if (/opr|opera/i.test(ua)) return 'Opera';

    return 'Unknown Browser';
  }

  private getDeviceType(): string {
    const ua = navigator.userAgent;

    if (/mobile/i.test(ua)) return 'Mobile';
    if (/tablet|ipad/i.test(ua)) return 'Tablet';

    return 'Desktop';
  }

  private getScreenSize(): string {
    return `${window.screen.width}x${window.screen.height}`;
  }
}
