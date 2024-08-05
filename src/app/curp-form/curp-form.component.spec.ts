import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurpFormComponent } from './curp-form.component';

describe('CurpFormComponent', () => {
  let component: CurpFormComponent;
  let fixture: ComponentFixture<CurpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurpFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
