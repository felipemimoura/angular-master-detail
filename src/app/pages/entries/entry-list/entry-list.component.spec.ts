import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryListComponent } from './entry-list.component';


describe('CategoryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryListComponent]
    });
    fixture = TestBed.createComponent(EntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
