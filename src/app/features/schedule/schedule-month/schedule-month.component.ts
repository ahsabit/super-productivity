import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ScheduleEvent } from '../schedule.model';
import { ScheduleEventComponent } from '../schedule-event/schedule-event.component';
import { DatePipe } from '@angular/common';
import { T } from '../../../t.const';
import { DateService } from '../../../core/date/date.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'schedule-month',
  imports: [ScheduleEventComponent, DatePipe],
  templateUrl: './schedule-month.component.html',
  styleUrl: './schedule-month.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ScheduleMonthComponent {
  private _dateService = inject(DateService);
  private _scheduleService = inject(ScheduleService);

  @Input() events: ScheduleEvent[] | null = [];
  @Input() daysToShow: string[] = [];
  @Input() weeksToShow: number = 6;

  T: typeof T = T;

  getDayClass(day: string): string {
    return this._scheduleService.getDayClass(day);
  }

  getWeekIndex(dayIndex: number): number {
    return Math.floor(dayIndex / 7);
  }

  getDayIndex(dayIndex: number): number {
    return dayIndex % 7;
  }

  hasEventsForDay(day: string): boolean {
    return this._scheduleService.hasEventsForDay(day, this.events || []);
  }

  getEventsForDay(day: string): ScheduleEvent[] {
    return this._scheduleService.getEventsForDay(day, this.events || []);
  }

  getEventDayStr(ev: ScheduleEvent): string | null {
    return this._scheduleService.getEventDayStr(ev);
  }
}
