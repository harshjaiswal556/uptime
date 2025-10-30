import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftPanel } from './left-panel';
import { GithubService } from '../../services/github';
import { of } from 'rxjs';

fdescribe('LeftPanel', () => {
  let component: LeftPanel;
  let fixture: ComponentFixture<LeftPanel>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {
    githubServiceSpy = jasmine.createSpyObj('GithubService', ['fetchUser']);
    githubServiceSpy.fetchUser.and.returnValue(of(null));
    await TestBed.configureTestingModule({
      imports: [LeftPanel],
      providers: [
        { provide: GithubService, useValue: githubServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeftPanel);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch user on ngOnInit', () => {
    const mockUser = { 
      login: 'testuser',
      avatar_url: 'http://avatar.url',
      name: 'Test User',
      bio: 'Test bio',
      company: 'TestCo', 
      html_url: 'http://github.com/test', 
      location: 'Earth', 
      blog: 'http://blog', 
      twitter_username: 'testuser',
      followers: 0,
      following: 0
    };
    githubServiceSpy.fetchUser.and.returnValue(of(mockUser));
    fixture.detectChanges(); // triggers ngOnInit
    expect(githubServiceSpy.fetchUser).toHaveBeenCalledWith('shreeramk');
    expect(component.user).toEqual(mockUser);
  });

  it('getInfoList should return correct info', () => {
    const user = {
      company: 'TestCo',
      html_url: 'http://github.com/test',
      location: 'Earth',
      blog: 'http://blog',
      twitter_username: 'testuser'
    };
    const infoList = component.getInfoList(user);
    expect(infoList.length).toBe(4);
    expect(infoList[0]).toEqual(jasmine.objectContaining({ icon: 'work', text: 'TestCo', link: 'http://github.com/test' }));
    expect(infoList[1]).toEqual(jasmine.objectContaining({ icon: 'location_on', text: 'Earth', link: '#' }));
    expect(infoList[2]).toEqual(jasmine.objectContaining({ icon: 'link', text: 'http://blog', link: 'http://blog' }));
    expect(infoList[3]).toEqual(jasmine.objectContaining({ icon: 'alternate_email', text: '@testuser', link: 'https://twitter.com/testuser' }));
  });

  it('getInfoList should handle missing fields', () => {
    const user = {};
    const infoList = component.getInfoList(user);
    expect(infoList[0].text).toBe('N/A');
    expect(infoList[1].text).toBe('Not available');
    expect(infoList[2].text).toBe('No website');
    expect(infoList[3].text).toBe('@No Twitter');
    expect(infoList[3].link).toBe('#');
  });
});
