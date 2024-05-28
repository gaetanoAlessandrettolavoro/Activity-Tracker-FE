import { Component } from '@angular/core';
import { NavbarhomeComponent } from '../../componenti/navbarhome/navbarhome.component';
import { FooterComponent } from "../../componenti/footer/footer.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [NavbarhomeComponent, FooterComponent]
})
export class HomePageComponent {

}
