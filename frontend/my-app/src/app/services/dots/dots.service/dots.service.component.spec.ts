import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsServiceComponent } from './dots.service.component';

describe('DotsServiceComponent', () => {
  let component: DotsServiceComponent;
  let fixture: ComponentFixture<DotsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotsServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
