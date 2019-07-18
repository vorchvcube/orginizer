import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/service/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(private dateService: DateService) { }

  ngOnInit() {
  }

  go(dir: number) {
    this.dateService.changeMonth(dir);
  }

}
