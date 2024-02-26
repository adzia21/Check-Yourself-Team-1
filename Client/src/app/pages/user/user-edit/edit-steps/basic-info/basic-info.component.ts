import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss', '../../user-edit.component.scss'],
})
export class UserBasicInfoComponent {
  public userBasicInfoForm = new FormGroup({
    profilePic: new FormControl(null, []),
    name: new FormControl('', []),
    surname: new FormControl('', []),
    localization: new FormControl('', []),
    phone: new FormControl('', []),
    pay: new FormControl('', []),
    email: new FormControl('', []),
    dateOfBirth: new FormControl('', []),
    workTime: new FormControl('', []),
    socialMedia: new FormControl('', []),
    page: new FormControl('', []),
    contractType: new FormControl('', []),
  });

  public image: string = `${icons}/no-pfp.svg`;
  public dummyBool: boolean = true;

  constructor(private fb: FormBuilder, private toastrService: ToastrService) {}

  public xd() {}

  selectAvatar(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.toastrService.warning('Zdjęcie załadowane');
        this.image = event.target.result;
        this.dummyBool = false;
      };
    }
  }
}
