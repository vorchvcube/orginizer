import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {

  transform(m: moment.Moment, format: string = 'DD MM YYYY'): string {
    return m.format(format);
  }

}
