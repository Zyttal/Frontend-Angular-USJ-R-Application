import { Component } from '@angular/core';
import { routeAnimations } from './app.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'University of San Jose-Recoletos';
  getAnimationState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
