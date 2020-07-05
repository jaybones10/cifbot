import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionFormComponent } from './provision-form.component';

describe('ProvisionFormComponent', () => {
  let component: ProvisionFormComponent;
  let fixture: ComponentFixture<ProvisionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
