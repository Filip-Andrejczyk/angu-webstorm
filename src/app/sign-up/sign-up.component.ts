import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthServiceService
  ) { }

  ngOnInit(): void {
  }

}
