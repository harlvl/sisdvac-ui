import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Utils} from "../../../helpers/utils";
import {ResearchService} from "../../../services/research.service";
import {AuthService} from "../../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
@Injectable({providedIn: 'root'})
export class MembersComponent implements OnInit {
  // routing variables
  previousPath: string = '/researches'

  researchId: any;
  cardList: any = [];

  constructor(private route: ActivatedRoute,
              private researchService: ResearchService,
              private router: Router,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.researchId = this.route.snapshot.paramMap.get('id');
    console.log("Retrieving members of research %d", this.researchId);
    this.researchService.findResearchUsers(this.researchId).subscribe(
      {
        next: (response : HttpResponse<any>) => {
          this.cardList = response.body.payload;
          this.spinner.hide()
        },
        error: (err) => {
          console.log("Error encountered at researchService.findUsersByRole service call: ", err);
          if (err.status == 403) {
            console.log("Invalid token.");
            this.authService.clearLocalStorage();
            alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
            this.authService.updateResult(false);
            this.router.navigate(['login']);
          }

          this.spinner.hide();
        },
      }
    )
  }

  getRoleName(code: string) {
    return Utils.getRoleName(code);
  }

}
