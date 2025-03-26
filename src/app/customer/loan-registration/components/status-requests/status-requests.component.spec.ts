import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRequestsComponent } from './status-requests.component';

describe('StatusRequestsComponent', () => {
  let component: StatusRequestsComponent;
  let fixture: ComponentFixture<StatusRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
