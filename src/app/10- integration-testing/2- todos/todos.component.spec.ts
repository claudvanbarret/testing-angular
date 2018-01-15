/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server', () => {
    let service = TestBed.get(TodoService); 
    // let service = fixture.debugElement.injector.get(TodoService);

    spyOn(service, 'getTodos').and.returnValue(Observable.from([ [1, 2, 3] ]));
    
    fixture.detectChanges();
    
    expect(component.todos.length).toEqual(3);
    expect(component.todos).toEqual([1, 2, 3]);
  });
});
