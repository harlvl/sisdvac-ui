import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})

@Injectable({ providedIn: 'root' })
export class AddMemberComponent implements OnInit{
  isOpen = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  addMemberShowForm() {
  }

  cancelAddMember() {

  }

  closeModal() {

  }

}
