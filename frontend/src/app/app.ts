import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  ngOnInit(): void {
    const colorMode = globalThis
      .matchMedia('(prefers-color-scheme: dark)')
      .matches;

    document.documentElement.classList.toggle('dark', colorMode);
  }

 
}
