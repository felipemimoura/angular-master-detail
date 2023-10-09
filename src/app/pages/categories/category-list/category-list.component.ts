import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => alert('Error ao carregar a lista'),
    });
  }

  deleteCategory(category: any) {
    const mustDele = confirm('Deseja Realmente excluir esse item?');

    if (mustDele) {
      this.categoryService.delete(category.id).subscribe({
        next: () =>
          (this.categories = this.categories.filter(
            (element) => element != category
          )),
        error: () => alert('Error ao tentar excluir'),
      });
    }
  }
}
