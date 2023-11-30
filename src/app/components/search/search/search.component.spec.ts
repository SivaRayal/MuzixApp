import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardService } from 'src/app/services/dashboard.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockDashboardService: jasmine.SpyObj<DashboardService>;

  beforeEach(() => {
    mockDashboardService = jasmine.createSpyObj('DashboardService', ['getTracks', 'saveFavourite']);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
      ],
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTrack and update dataSource on searchList when search is not empty', () => {
    component.search = 'test';
    const fakeResponse = {
      results: {
        trackmatches: {
          track: [
            { name: 'Track1', artist: 'Artist1', url: 'fakeUrl' },
            { name: 'Track2', artist: 'Artist2', url: 'fakeUrl' },
          ],
        },
      },
    };
    mockDashboardService.getTracks.and.returnValue(of(fakeResponse));
    component.searchList();
    expect(mockDashboardService.getTracks).toHaveBeenCalledOnceWith(jasmine.any(Object));
    expect(component.showView).toBe(true);
    expect(component.dataSource.data.length).toBe(2); 
  });

  it('should not call getTrack on searchList when search is empty', () => {
    component.search = '';

    component.searchList();

    expect(mockDashboardService.getTracks).not.toHaveBeenCalled();
    expect(component.showView).toBe(false);
  });
});
