import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: [
    './skills.component.scss',
    '../../../user-edit.component.scss',
  ],
})
export class UserSkillsComponent implements AfterViewInit {
  public userAboutSkillsForm: FormGroup;
  public skillArray: FormGroup;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private ref: ChangeDetectorRef) {
    this.skillArray = this.fb.group({
      skill: new FormControl(''),
      level: new FormControl(0),
    });

    this.userAboutSkillsForm = this.fb.group({
      aboutMe: new FormControl('', []),
      skillsFE: this.fb.array([]),
      skillsBE: this.fb.array([]),
      skillsLanguage: this.fb.array([]),
      skillsOther: this.fb.array([]),
    });
  }

  ngAfterViewInit(): void {
    this.addNewSkill('skillsFE');
    this.addNewSkill('skillsBE');
    this.addNewSkill('skillsLanguage');
    this.addNewSkill('skillsOther');
    this.ref.detectChanges();
  }

  public get skillsFE() {
    return this.userAboutSkillsForm.get('skillsFE') as FormArray;
  }

  public get skillsBE() {
    return this.userAboutSkillsForm.get('skillsBE') as FormArray;
  }

  public get skillsLanguage() {
    return this.userAboutSkillsForm.get('skillsLanguage') as FormArray;
  }

  public get skillsOther() {
    return this.userAboutSkillsForm.get('skillsOther') as FormArray;
  }

  public getLevelValue(skillType: string, index: number) {
    switch (skillType) {
      case 'skillsFE':
        return this.skillsFE.value[index].level;
      case 'skillsBE':
        return this.skillsBE.value[index].level;
      case 'skillsLanguage':
        return this.skillsLanguage.value[index].level;
      case 'skillsOther':
        return this.skillsOther.value[index].level;
      default:
        return;
    }
  }

  public addNewSkill(skillType: string) {
    switch (skillType) {
      case 'skillsFE':
        return this.skillsFE.push(
          this.fb.group({
            skill: new FormControl(''),
            level: new FormControl(0),
          })
        );
      case 'skillsBE':
        return this.skillsBE.push(
          this.fb.group({
            skill: new FormControl(''),
            level: new FormControl(0),
          })
        );
      case 'skillsLanguage':
        return this.skillsLanguage.push(
          this.fb.group({
            skill: new FormControl(''),
            level: new FormControl(0),
          })
        );
      case 'skillsOther':
        return this.skillsOther.push(
          this.fb.group({
            skill: new FormControl(''),
            level: new FormControl(0),
          })
        );
      default:
        return;
    }
  }

  public removeAtIndex(skillType: string, index: number) {
    switch (skillType) {
      case 'skillsFE':
        return this.skillsFE.removeAt(index);
      case 'skillsBE':
        return this.skillsBE.removeAt(index);
      case 'skillsLanguage':
        return this.skillsLanguage.removeAt(index);
      case 'skillsOther':
        return this.skillsOther.removeAt(index);
      default:
        return;
    }
  }
}
