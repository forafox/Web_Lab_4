import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsTableComponent } from './dots.table.component';

describe('DotsTableComponent', () => {
  let component: DotsTableComponent;
  let fixture: ComponentFixture<DotsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
