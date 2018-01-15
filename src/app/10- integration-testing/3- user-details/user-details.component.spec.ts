/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserDetailsComponent } from './user-details.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

class RouterFake {
  navigate = jasmine.createSpy('navigate');
}

class ActivatedRouteFake {
  private subject = new Subject();

  push(value){
    this.subject.next(value);
  }
  
  get params(){
    return this.subject.asObservable();
  }
  // params: Observable<any> = Observable.empty(); 
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: Router, useClass: RouterFake },
        { provide: ActivatedRoute, useClass: ActivatedRouteFake }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to the users page after saving', () => {
    let router = TestBed.get(Router);
    
    component.save();

    expect(router.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should navigate the user to the not found page when an invalid user id is pass', () => {
    let router = TestBed.get(Router);
    let route: ActivatedRouteFake = TestBed.get(ActivatedRoute);

    route.push({id: 0});

    expect(router.navigate).toHaveBeenCalledWith(['not-found']);
  });
});
