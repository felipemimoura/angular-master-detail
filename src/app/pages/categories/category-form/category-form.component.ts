import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs';
// import toastr from 'toastr'
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  currenctAction: string = '';
  categoryForm: FormGroup = {} as FormGroup;
  pageTitle: string = '';
  serverErrorMessage: string[] | null = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngAfterContentChecked(): void {
    // throw new Error('Method not implemented.');
    this.setPageTitle();
  }
  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currenctAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory()
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currenctAction = 'new';
    } else {
      this.currenctAction = 'edit';
    }
  }
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  private loadCategory() {
    if (this.currenctAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.categoryService.getById(+params.get('id')!)
          )
        )
        .subscribe(
          (category) => {
            this.category = category;
            this.categoryForm.patchValue(category);
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
        );
    }
  }

  private setPageTitle() {
    if (this.currenctAction === 'new') {
      this.pageTitle = 'Cadastro de nova Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editando Categoria: ${categoryName}`;
    }
  }

  private createCategory() {
    const category: Category = Object.assign(
      new Category(),
      this.categoryForm.value
    );

    this.categoryService.create(category).subscribe(
      (category) => this.actionsForSuccess(category),
      (error) => this.actionForError(error)
    );
  }

  private updateCategory() {
    const category: Category = Object.assign(
      new Category(),
      this.categoryForm.value
    );

    this.categoryService.update(category).subscribe(
      (category) => this.actionsForSuccess(category),
      (error) => this.actionForError(error)
    );

  }

  private actionsForSuccess(category: Category) {
    // toastr.success('Solicitação Procesada com sucesso');

    this.router
      .navigateByUrl('categories', { skipLocationChange: true })
      .then(() => this.router.navigate(['categories', category.id, 'edit']));
  }

  private actionForError(error: any) {
    // toastr.error('Ocorreu um erro ao processas sua solicitação');

    this.submittingForm = false;

    if(error.status === 422){
      this.serverErrorMessage = JSON.parse(error._body).errors
    }else {
      this.serverErrorMessage = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
    }
  }
}
