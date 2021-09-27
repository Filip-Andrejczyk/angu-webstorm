import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-tologin-dashboard',
  templateUrl: './tologin-dashboard.component.html',
  styleUrls: ['./tologin-dashboard.component.scss']
})
export class TologinDashboardComponent implements OnInit {

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
  }

}
