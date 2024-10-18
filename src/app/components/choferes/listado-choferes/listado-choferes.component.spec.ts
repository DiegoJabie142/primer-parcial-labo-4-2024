import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoChoferesComponent } from './listado-choferes.component';

describe('ListadoChoferesComponent', () => {
  let component: ListadoChoferesComponent;
  let fixture: ComponentFixture<ListadoChoferesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoChoferesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
