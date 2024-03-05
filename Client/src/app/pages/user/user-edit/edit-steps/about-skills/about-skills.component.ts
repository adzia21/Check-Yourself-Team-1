import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { icons } from 'src/app/shared/constants/constants';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-about-skills',
  templateUrl: './about-skills.component.html',
  styleUrls: [
    './about-skills.component.scss',
    '../../user-edit.component.scss',
  ],
})
export class UserAboutSkillsComponent implements AfterViewInit, OnChanges {
  @Output() saveEvent = new EventEmitter<null>();
  @Output() cancelEvent = new EventEmitter<null>();
  @Output() userAboutSkillsFormChange = new EventEmitter<any>();
  @Input() userAboutSkillsForm!: FormGroup;
  @Input() data!: User;

  public skillArray: FormGroup;
  public skillTypes = ['skillsFE', 'skillsBE', 'skillsLanguage', 'skillsOther']

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private ref: ChangeDetectorRef) {
    this.skillArray = this.fb.group({
      skill: new FormControl(''),
      level: new FormControl(0),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.addNewSkill('skillsFE', this.data?.skills.fe.skill);
      this.addNewSkill('skillsBE', this.data?.skills.be.skill);
      this.addNewSkill('skillsLanguage', this.data?.skills.lng.skill);
      this.addNewSkill('skillsOther', this.data?.skills.other.skill);
      this.userAboutSkillsFormChange.emit(this.userAboutSkillsForm)
    }
  }

  ngAfterViewInit(): void {
    
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

  public getControls(control: string) {
    switch (control) {
      case 'skillsFE':
        return this.skillsFE.controls;
      case 'skillsBE':
        return this.skillsBE.controls;
      case 'skillsLanguage':
        return this.skillsLanguage.controls;
      case 'skillsOther':
        return this.skillsOther.controls;
      default:
        return;
    }
  }

  public getName(skill: string, isLabel: boolean) {
    if (isLabel) {
      switch (skill) {
        case 'skillsFE':
          return 'Technologie Frontend';
        case 'skillsBE':
          return 'Technologie Backend';
        case 'skillsLanguage':
          return 'Języki obce';
        case 'skillsOther':
          return 'Inne Umiejętności';
        default:
          return;
      }
    } else {
      switch (skill) {
        case 'skillsFE':
        case 'skillsBE':
          return 'Technologia';
        case 'skillsLanguage':
          return 'Język';
        case 'skillsOther':
          return 'Umiejętność';
        default:
          return;
      }
    }
    
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

  public addNewSkill(skillType: string, data?: any) {
    let mapped: any;
    if (data) {
      mapped = Object.keys(data).map(key => ({type: key, value: data[key]}));
    }
    switch (skillType) {
      case 'skillsFE':
        if(!data) {
          return this.skillsFE.push(
            this.fb.group({
              skill: new FormControl(''),
              level: new FormControl(0),
            })
          );
        };
        if (mapped?.length != 0) {
          mapped?.forEach((element: any) => {
            this.skillsFE.push(
              this.fb.group({
                skill: new FormControl(element.type),
                level: new FormControl(element.value),
              })
            );
          });
          return;
        }
        return;
      case 'skillsBE':
        if(!data) {
          return this.skillsBE.push(
            this.fb.group({
              skill: new FormControl(''),
              level: new FormControl(0),
            })
          );
        };
        if (mapped?.length != 0) {
          mapped?.forEach((element: any) => {
            this.skillsBE.push(
              this.fb.group({
                skill: new FormControl(element.type),
                level: new FormControl(element.value),
              })
            );
          });
          return;
        };
        return;
      case 'skillsLanguage':
        if(!data) {
          return this.skillsLanguage.push(
            this.fb.group({
              skill: new FormControl(''),
              level: new FormControl(0),
            })
          );
        }
        if (mapped?.length != 0) {
          mapped?.forEach((element: any) => {
            this.skillsLanguage.push(
              this.fb.group({
                skill: new FormControl(element.type),
                level: new FormControl(element.value),
              })
            );
          });
          return;
        };
        return;
      case 'skillsOther':
        if(!data) {
          return this.skillsOther.push(
            this.fb.group({
              skill: new FormControl(''),
              level: new FormControl(0),
            })
          );
        };
        if (mapped?.length != 0) {
          mapped?.forEach((element: any) => {
            this.skillsOther.push(
              this.fb.group({
                skill: new FormControl(element.type),
                level: new FormControl(element.value),
              })
            );
          });
          return;
        };
        return;
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

  public save() {
    this.saveEvent.emit();
  }

  public cancel() {
    this.cancelEvent.emit();
  }
}


