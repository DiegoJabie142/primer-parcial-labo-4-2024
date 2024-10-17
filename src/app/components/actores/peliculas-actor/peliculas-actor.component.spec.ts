import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasActorComponent } from './peliculas-actor.component';

describe('PeliculasActorComponent', () => {
  let component: PeliculasActorComponent;
  let fixture: ComponentFixture<PeliculasActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculasActorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculasActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
