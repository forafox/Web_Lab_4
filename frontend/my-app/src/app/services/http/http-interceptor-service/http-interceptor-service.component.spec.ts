import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpInterceptorServiceComponent } from './http-interceptor-service.component';

describe('HttpInterceptorServiceComponent', () => {
  let component: HttpInterceptorServiceComponent;
  let fixture: ComponentFixture<HttpInterceptorServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpInterceptorServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HttpInterceptorServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
