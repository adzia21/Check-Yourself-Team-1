import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { icons } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss', '../../user-edit.component.scss'],
})
export class UserBasicInfoComponent {
  @Output() saveEvent = new EventEmitter<null>();
  @Output() cancelEvent = new EventEmitter<null>();
  @Output() userBasicInfoFormChange = new EventEmitter<any>();
  @Input() userBasicInfoForm!: FormGroup;
  @Input() data!: User;

  public image: string = `${icons}/no-pfp.svg`;
  public dummyBool: boolean = true;

  constructor(private fb: FormBuilder, private toastrService: ToastrService) {}

  public save() {
    this.saveEvent.emit();
  }

  public cancel() {
    this.cancelEvent.emit();
  }

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
