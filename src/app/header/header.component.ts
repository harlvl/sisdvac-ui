import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable({providedIn: 'root'})
export class HeaderComponent implements OnInit{
  isLogged: boolean = false;
  headerContentTrial: String = 'Estudios';
  headerContentNewTrial: String = 'Nuevo estudio';

  constructor(private authService :AuthService) {
    if (authService.getAccessToken()) {
      this.isLogged = true;
    }
  }
  ngOnInit(): void {
  }

}
