import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LiczenieService} from "../liczenie.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-wyswietlanie-licznika',
  templateUrl: './wyswietlanie-licznika.component.html',
  styleUrls: ['./wyswietlanie-licznika.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyswietlanieLicznikaComponent implements OnInit {

  wyswietlany$: Observable<number>;

  constructor(private liczenieService: LiczenieService, private cdRef: ChangeDetectorRef) {
    this.wyswietlany$ = this.liczenieService.counter.asObservable();
  }

  ngOnInit(): void {
  }

}
