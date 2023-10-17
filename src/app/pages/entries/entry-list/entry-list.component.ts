import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];
  constructor(private entryService: EntryService) {}
  ngOnInit(): void {
    this.entryService.getAll().subscribe({
      next: (entries) => (this.entries = entries),
      error: (error) => alert('Error ao carregar a lista'),
    });
  }

  deleteEntry(entry: any) {
    const mustDele = confirm('Deseja Realmente excluir esse item?');

    if (mustDele) {
      this.entryService.delete(entry.id).subscribe({
        next: () =>
          (this.entries = this.entries.filter(
            (element) => element != entry
          )),
        error: () => alert('Error ao tentar excluir'),
      });
    }
  }
}
