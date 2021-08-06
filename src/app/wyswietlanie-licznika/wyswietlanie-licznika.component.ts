import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LiczenieService} from "../liczenie.service";
import {Observable, Subscription} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-wyswietlanie-licznika',
  templateUrl: './wyswietlanie-licznika.component.html',
  styleUrls: ['./wyswietlanie-licznika.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyswietlanieLicznikaComponent implements OnInit {

  wyswietlany$: Observable<number>;

  //private sub: Subscription = new Subscription();

  constructor(private liczenieService: LiczenieService, private cdRef: ChangeDetectorRef) {
    this.wyswietlany$ = this.liczenieService.counter.asObservable();
  }

  ngOnInit(): void {
  }


  /*ngOnDestroy() {
    this.sub.unsubscribe()
  }
  */
}
