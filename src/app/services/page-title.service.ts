import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private readonly baseTitle = 'Work Excellence'; // Set your website name here

  constructor(private titleService: Title) {}

  setPageTitle(pageTitle: string): void {
    const decodedTitle = this.decodeUrlTitle(pageTitle); // Decode the URL-encoded title
    const title = decodedTitle ? `${decodedTitle} - ${this.baseTitle}` : this.baseTitle;
    this.titleService.setTitle(title);
  }

  getPageTitle(): string {
    return this.titleService.getTitle();
  }

  private decodeUrlTitle(title: string): string {
    try {
      const decodedTitle = decodeURIComponent(title);
      return decodedTitle.replace(/\+/g, ' '); // Replace '+' with space
    } catch (error) {
      console.error('Error decoding URL title:', error);
      return title; // Return the original title if decoding fails
    }
  }
}
