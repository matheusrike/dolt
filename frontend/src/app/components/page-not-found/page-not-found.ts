import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound implements AfterViewInit {

  ngAfterViewInit(): void {
    const el = document.querySelector('.cont_principal');

    if (el) {
      el.classList.add('cont_error_active');
    }
  }
}
