import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthServiceService
  ) { }

  ngOnInit(): void {
  }

}
