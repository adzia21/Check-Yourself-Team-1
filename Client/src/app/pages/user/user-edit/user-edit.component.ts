import { Component } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { icons } from "src/app/shared/constants/constants";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {

  public userForm: FormGroup;
  public userBasicInfoForm: FormGroup;
  public userAboutSkillsForm: FormGroup;
  public userDetailsForm: FormGroup;

  public image: string = `${icons}/no-pfp.svg`;
  public dummyBool: boolean = true;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private router: Router) {

    this.userBasicInfoForm = this.fb.group({
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

    this.userAboutSkillsForm = this.fb.group({
      aboutMe: new FormControl('', []),
      skillsFE: this.fb.array([]),
      skillsBE: this.fb.array([]),
      skillsLanguage: this.fb.array([]),
      skillsOther: this.fb.array([]),
    });

    this.userDetailsForm = this.fb.group({
      experiences: this.fb.array([]),
      educations: this.fb.array([]),
      certyficates: this.fb.array([]),
      organizations: this.fb.array([]),
      softSkills: this.fb.array([]),
      hobbies: this.fb.array([]),
    });

    this.userForm = this.fb.group({
      userBasicInfoForm: new FormControl(this.userBasicInfoForm),
      userAboutSkillsForm: new FormControl(this.userAboutSkillsForm),
      userDetailsForm: new FormControl(this.userDetailsForm)
    });
  }

  public save() {
    console.log(this.userBasicInfoForm.value)
    console.log(this.userAboutSkillsForm.value)
    console.log(this.userDetailsForm.value)
  }

  public cancel() {
    console.log("XD")
    this.router.navigate(['/user/1'])
  }

  selectAvatar(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.toastrService.warning('Zdjęcie załadowane');
        this.image = event.target.result;
        this.dummyBool = false;
      }
    }
  }
}