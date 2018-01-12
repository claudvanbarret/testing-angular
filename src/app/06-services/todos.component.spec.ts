import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with items returned from the server', () => {
    const todos = [
      { id: '1', title: 'a'},
      { id: '2', title: 'b'},
      { id: '3', title: 'c'},
    ];
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([ todos ]);
    });

    component.ngOnInit();

    expect(component.todos).toEqual(todos);

  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty();
    })

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 };
    spyOn(service, 'add').and.returnValue(Observable.from([ todo ]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns an error when adding a new todo', () => {
    let error = 'error from the server';
    spyOn(service, 'add').and.returnValue(Observable.throw(error));

    component.add();

    expect(component.message).toEqual(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(service.delete).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(service.delete).not.toHaveBeenCalled();
  });
});
