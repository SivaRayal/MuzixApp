import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let mockDashboardService = jasmine.createSpyObj('DashboardService', ['getTracks', 'saveFavourite']);
  let dashboardService: jasmine.SpyObj<DashboardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],imports: [HttpClientModule,BrowserAnimationsModule, MatSnackBarModule]
      ,
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DashboardService, useValue: mockDashboardService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    let data:any = "track";
    let flag:any = {
      "data" : "track",
      "liked": true
    }
    expect(component).toBeTruthy();
    component.ngOnInit();
    component.close();
    const genre = 'yourGenre';
    const expectedParams = new HttpParams()
      .append('method', 'tag.gettoptracks')
      .append('tag', genre)
      .append('api_key', '4cefff0e8ec8aafbdaf7916af675e294')
      .append('format', 'json');

    const mockData = { tracks: { track: [{}] } };

    dashboardService.getTracks.and.returnValue(of(mockData));

    spyOn(component.changeDetectorRef, 'detectChanges');
    spyOn(component.scroller, 'scrollToAnchor');

    component.getGenreTrack(genre);
    expect(dashboardService.getTracks).toHaveBeenCalledWith(expectedParams);

  });
  it('should navigate to "login" if there is no token', () => {
    const fakeElement = { liked: false };
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.likeClicked(fakeElement);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should send a request to getTracks and saveFavourite if there is a token and element is liked', () => {
    const fakeElement = { liked: true, artist: { name: 'Artist1' }, name: 'Track1', url: 'fakeUrl' };
    spyOn(localStorage, 'getItem').and.returnValue('fakeToken');

    const fakeResponse = { track: { album: { image: [{ '#text': 'fakeImage' },{ '#text': 'fakeImage' }] } } };
    mockDashboardService.getTracks.and.returnValue(of(fakeResponse));


  });

});
