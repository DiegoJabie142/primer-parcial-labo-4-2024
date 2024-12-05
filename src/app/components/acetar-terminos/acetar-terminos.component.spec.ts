import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcetarTerminosComponent } from './acetar-terminos.component';

describe('AcetarTerminosComponent', () => {
  let component: AcetarTerminosComponent;
  let fixture: ComponentFixture<AcetarTerminosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcetarTerminosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcetarTerminosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
