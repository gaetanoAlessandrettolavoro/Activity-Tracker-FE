import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
   first: number = 0;

    rows: number = 10;

    onPageChange(event: any) {
        const pageNumber = (event.page + 1)
        console.log(pageNumber)
    }
}