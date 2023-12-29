import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsManagerComponent } from './dots-manager.component';

describe('DotsManagerComponent', () => {
  let component: DotsManagerComponent;
  let fixture: ComponentFixture<DotsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotsManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
