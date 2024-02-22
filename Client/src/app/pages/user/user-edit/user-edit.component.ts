import { Component } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { icons } from "src/app/shared/constants/constants";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {

  public userForm = new FormGroup({
    localization: new FormControl('', []),
    phone: new FormControl('', []),
    email: new FormControl('', []),
  });

  public image: string = `${icons}/no-pfp.svg`;

  constructor(private fb: FormBuilder) { }

}