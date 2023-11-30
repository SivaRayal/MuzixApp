import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendComponent } from './recommend.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RecommendComponent', () => {
  let component: RecommendComponent;
  let fixture: ComponentFixture<RecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,MatSnackBarModule],
      providers: [
        { provide: DashboardService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
