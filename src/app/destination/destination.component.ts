import { Component, input } from '@angular/core';

@Component({
  selector: 'app-destination',
  imports: [],
  template: `<h1>DestinationComponent</h1>
    <div data-testid="param">{{ param() }}</div>`,
})
export class DestinationComponent {
  param = input.required<string>();
}
