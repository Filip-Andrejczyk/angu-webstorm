import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LiczenieService} from "../liczenie.service";
import {Observable, Subscription} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-wyswietlanie-licznika',
  templateUrl: './wyswietlanie-licznika.component.html',
  styleUrls: ['./wyswietlanie-licznika.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyswietlanieLicznikaComponent implements OnInit, OnDestroy {

  wyswietlany$: Observable<number>;
  wyswietlany: number = 0;

  private sub: Subscription = new Subscription();

  constructor(private liczenieService: LiczenieService, private cdRef: ChangeDetectorRef) {
    this.wyswietlany$ = this.liczenieService.counter.asObservable();
  }

  ngOnInit(): void {
    //this.wyswietlany$ = this.liczenieService.getNumber();
    let dupa = {a: {b:10}};
    console.log(JSON.stringify(dupa))
    this.sub.add(this.wyswietlany$.pipe().subscribe((val)=>{
      this.wyswietlany = val
      dupa.a.b = 20;
      dupa = {...dupa}
      // this.cdRef.detectChanges();
      // this.cdRef.markForCheck();
    }))
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
