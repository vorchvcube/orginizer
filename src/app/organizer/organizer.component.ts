import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/service/date.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TasksService } from '../shared/service/tasks.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup;
  tasks: Task[] = [];

  constructor(private dateService: DateService,
              private taskService: TasksService) { }

  ngOnInit() {
    this.initForm();
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.taskService.create(task)
      .subscribe(task => {
        this.tasks.push(task);
        this.form.reset();
      }, err => {
        console.error(err);
      });
  }

  remove(task: Task) {

    this.taskService.remove(task)
      .subscribe(task => {
        console.log(task);
        this.tasks = this.tasks.filter(t => t.id !== task.id );
      }, err => {
        console.error(err);
      });

    console.log(task);
  }

}
