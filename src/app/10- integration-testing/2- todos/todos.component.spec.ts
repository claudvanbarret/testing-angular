/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should load todos from the server', async(() => {
    let service = TestBed.get(TodoService); 
    // let service = fixture.debugElement.injector.get(TodoService);

    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1, 2, 3]));
    
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      expect(component.todos.length).toEqual(3);
      expect(component.todos).toEqual([1, 2, 3]);
    })
  }));

  it('should load todos from the server using fakeAsync', fakeAsync(() => {
    let service = TestBed.get(TodoService); 
    // let service = fixture.debugElement.injector.get(TodoService);

    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1, 2, 3]));
    
    fixture.detectChanges();
    
    tick();
    expect(component.todos.length).toEqual(3);
    expect(component.todos).toEqual([1, 2, 3]);
  }));
});
