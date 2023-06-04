import {Component, Injectable, OnInit} from '@angular/core';
import {ResearchService} from "../../services/research.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-researches',
  templateUrl: './researches.component.html',
  styleUrls: ['./researches.component.scss']
})
@Injectable({providedIn: 'root'})
export class ResearchesComponent implements OnInit {

  // for displaying cards
  // researches cards
  documentNumber: any;
  cardList: any = [];

  constructor(private researchService: ResearchService,
              private router: Router,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.documentNumber = this.authService.getDocumentNumber();
    this.researchService.findResearchesByUserDocumentNumber(this.documentNumber).subscribe(
      {
        next: (response: HttpResponse<any>) => {
          console.log("Response status: ", response.status);
          this.cardList = response.body.payload;
          this.spinner.hide()
        },
        error: (err) => {
          console.log("Error encountered at researchService.findResearchesByUserDocumentNumber service call: ", err);
          if (err.status == 403) {
            console.log("Invalid token.");
            this.authService.clearLocalStorage();
            alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
            this.authService.updateResult(false);
            this.router.navigate(['login']);
          }

          this.spinner.hide();

        }
      }
    );
  }

}
