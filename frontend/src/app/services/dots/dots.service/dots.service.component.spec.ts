import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsService } from './dots.service.component';

describe('DotsService', () => {
  let component: DotsService;
  let fixture: ComponentFixture<DotsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
