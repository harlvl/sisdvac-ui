import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sisdvac-ui';
  currentUser: any = null;

  constructor(private spinner : NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
}
