import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss', '../../user-edit.component.scss'],
})
export class UserDetailsComponent implements AfterViewInit {
  @Output() saveEvent = new EventEmitter<null>();
  @Output() cancelEvent = new EventEmitter<null>();
  @Input() userDetailsForm!: FormGroup;

  //public userDetailsForm: FormGroup;
  public experienceForm: FormGroup;
  public tasksArray: FormGroup;
  public educationForm: FormGroup;
  public certForm: FormGroup;
  public additionalArray: FormGroup;

  public rangeExp = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });

  public rangeEdu = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });

  public additionalFields = ['organizations', 'softSkills', 'hobbies']

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private ref: ChangeDetectorRef
  ) {
    this.tasksArray = this.fb.group({
      task: new FormControl(''),
    });

    this.experienceForm = this.fb.group({
      name: new FormControl(''),
      startedDate: new FormControl(''),
      finishedDate: new FormControl(''),
      tasks: this.fb.array([]),
    });

    this.educationForm = this.fb.group({
      name: new FormControl(''),
      universityName: new FormControl(''),
      title: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });

    this.certForm = this.fb.group({
      certName: new FormControl(''),
      certNumber: new FormControl(''),
      organization: new FormControl(''),
      date: new FormControl(''),
    });

    this.additionalArray = this.fb.group({
      field: new FormControl(''),
    });

    // this.userDetailsForm = this.fb.group({
    //   experiences: this.fb.array([this.experienceForm]),
    //   educations: this.fb.array([this.educationForm]),
    //   certyficates: this.fb.array([this.certForm]),
    //   organizations: this.fb.array([this.additionalArray]),
    //   softSkills: this.fb.array([this.additionalArray]),
    //   hobbies: this.fb.array([this.additionalArray]),
    // });
  }

  ngAfterViewInit(): void {
    this.addNewDetail('experiences');
    this.addNewDetail('educations');
    this.addNewDetail('certyficates');
    this.addNewDetail('organizations');
    this.addNewDetail('softSkills');
    this.addNewDetail('hobbies');
    this.addTask(0);
    this.ref.detectChanges();
  }

  public save() {
    this.saveEvent.emit();
  }

  public cancel() {
    this.cancelEvent.emit();
  }

  //#region
  public get experiences() {
    return this.userDetailsForm.get('experiences') as FormArray;
  }

  public tasks(taskIndex: number): FormArray {
    return this.experiences.at(taskIndex).get('tasks') as FormArray;
  }

  public get educations() {
    return this.userDetailsForm.get('educations') as FormArray;
  }

  public get certyficates() {
    return this.userDetailsForm.get('certyficates') as FormArray;
  }

  public get softSkills() {
    return this.userDetailsForm.get('softSkills') as FormArray;
  }

  public get hobbies() {
    return this.userDetailsForm.get('hobbies') as FormArray;
  }

  public get organizations() {
    return this.userDetailsForm.get('organizations') as FormArray;
  }
  //#endregion

  public removeAtIndex(
    form: string,
    questionIndex: number,
    answerIndex: number = 0
  ) {
    switch (form) {
      case 'task':
        return this.tasks(questionIndex).removeAt(answerIndex);
      case 'experiences':
        return this.experiences.removeAt(questionIndex);
      case 'educations':
        return this.educations.removeAt(questionIndex);
      case 'certyficates':
        return this.certyficates.removeAt(questionIndex);
      case 'softSkills':
        return this.softSkills.removeAt(questionIndex);
      case 'hobbies':
        return this.hobbies.removeAt(questionIndex);
      case 'organizations':
        return this.organizations.removeAt(questionIndex);
      default:
        return;
    }
  }

  public addTask(questionIndex: number) {
    this.tasks(questionIndex).push(
      this.fb.group({
        task: new FormControl(''),
      })
    );
  }

  public addNewDetail(detail: string) {
    switch (detail) {
      case 'educations':
        return this.educations.push(
          this.fb.group({
            name: new FormControl(''),
            universityName: new FormControl(''),
            title: new FormControl(''),
            startDate: new FormControl(''),
            endDate: new FormControl(''),
          })
        );
      case 'experiences':
        return this.experiences.push(
          this.fb.group({
            name: new FormControl(''),
            startedDate: new FormControl(''),
            finishedDate: new FormControl(''),
            tasks: this.fb.array([]),
          })
        );
      case 'certyficates':
        return this.certyficates.push(
          this.fb.group({
            certName: new FormControl(''),
            certNumber: new FormControl(''),
            organization: new FormControl(''),
            date: new FormControl(''),
          })
        );
      case 'softSkills':
        return this.softSkills.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'hobbies':
        return this.hobbies.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      case 'organizations':
        return this.organizations.push(
          this.fb.group({
            field: new FormControl(''),
          })
        );
      default:
        return;
    };
  }

  public getName(name: string) {
    switch (name) {
      case 'softSkills':
        return 'Umiejętności miękkie';
      case 'hobbies':
        return 'Hobby';
      case 'organizations':
        return 'Organizację i stowarzyszenia';
      default:
        return '';
    };
  }

  public getIcon(name: string) {
    switch (name) {
      case 'organizations':
        return 'hourglass_empty';
      case 'softSkills':
        return 'tag_faces';
      case 'hobbies':
        return 'fitness_center';
      default:
        return '';
    };
  }

  public getControls(control: string) {
    switch (control) {
      case 'softSkills':
        return this.softSkills.controls;
      case 'hobbies':
        return this.hobbies.controls;
      case 'organizations':
        return this.organizations.controls;
      default:
        return;
    }
  }
}
