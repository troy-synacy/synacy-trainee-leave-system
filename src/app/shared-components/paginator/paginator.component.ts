import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MatPaginator
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() length: number = 0;           // total items
  @Input() pageIndex: number = 0;        // current page
  @Input() pageSize: number = 5;         // default page size
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  @Output() pageChange = new EventEmitter<PageEvent>();
  onPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageChange.emit(event);
  }

}
