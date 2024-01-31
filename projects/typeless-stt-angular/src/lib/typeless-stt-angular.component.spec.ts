import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypelessSttAngularComponent } from './typeless-stt-angular.component';

describe('TypelessSttAngularComponent', () => {
  let component: TypelessSttAngularComponent;
  let fixture: ComponentFixture<TypelessSttAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypelessSttAngularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypelessSttAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
