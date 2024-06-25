import { Component } from '@angular/core';

import { FooterComponent } from "../../componenti/footer/footer.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [ FooterComponent]
})
export class HomePageComponent {

}
