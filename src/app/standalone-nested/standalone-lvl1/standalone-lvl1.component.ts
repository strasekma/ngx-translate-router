import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocalizeRouterPipe } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-standalone-lvl1',
  templateUrl: './standalone-lvl1.component.html',
  imports: [RouterOutlet, RouterLink, LocalizeRouterPipe],
})
export class StandaloneLvl1Component {}
