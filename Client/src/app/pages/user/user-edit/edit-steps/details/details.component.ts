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
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss', '../../user-edit.component.scss'],
})
export class UserDetailsComponent implements AfterViewInit, OnChanges {
  @Output() saveEvent = new EventEmitter<null>();
  @Output() cancelEvent = new EventEmitter<null>();
  @Output() userDetailsFormChange = new EventEmitter<any>();
  @Input() userDetailsForm!: FormGroup;
  @Input() data!: User;

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
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      let num = 0;
      this.data?.experience!.forEach(exp => {
        
        this.addNewDetail('experiences', exp);
        console.log(exp.tasks)
        let num2 = 0;
        exp.tasks.forEach(task => {
          this.removeAtIndex('task', num, num2)
          this.addTask(num, task);
        })
        num++;
      });
      this.data?.education!.forEach(exp => {
        this.addNewDetail('educations', exp);
      });
      this.data?.qualification!.forEach(exp => {
        this.addNewDetail('certyficates', exp);
      });
      this.data?.organizations!.forEach(exp => {
        this.addNewDetail('organizations', exp);
      });
      this.data?.softSkills!.forEach(exp => {
        this.addNewDetail('softSkills', exp);
      });
      this.data?.hobbies!.forEach(exp => {
        this.addNewDetail('hobbies', exp);
      });

      if (this.data?.experience!.length === 0) {
        this.addNewDetail('experiences');
        this.addTask(0);
      }
      if (this.data?.education!.length === 0) 
        this.addNewDetail('educations');
      if (this.data?.qualification!.length === 0) 
        this.addNewDetail('certyficates');
      if (this.data?.organizations!.length === 0) 
        this.addNewDetail('organizations');
      if (this.data?.softSkills!.length === 0) 
        this.addNewDetail('softSkills');
      if (this.data?.hobbies!.length === 0) 
        this.addNewDetail('hobbies');

      this.userDetailsFormChange.emit(this.userDetailsForm)
    }
  }

  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }

  public save() {
    this.userDetailsFormChange.emit(this.userDetailsForm)
    this.saveEvent.emit();
  }

  public cancel() {
    this.cancelEvent.emit();
  }

  public nextPrevious() {
    this.userDetailsFormChange.emit(this.userDetailsForm)
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

  public addTask(index: number, data?: string) {
    this.tasks(index).push(
      this.fb.group({
        task: new FormControl(data ? data : ''),
      })
    );
  }

  public addNewDetail(detail: string, data?: any) {
    switch (detail) {
      case 'educations':
        return this.educations.push(
          this.fb.group({
            name: new FormControl(data ? data.name : ''),
            universityName: new FormControl(data ? data.schoolName : ''),
            title: new FormControl(data ? data.title : ''),
            startDate: new FormControl(data ? data.startedDate : ''),
            endDate: new FormControl(data ? data.finishedDate : ''),
          })
        );
      case 'experiences':
        return this.experiences.push(
          this.fb.group({
            name: new FormControl(data ? data.name : ''),
            startedDate: new FormControl(data ? data.startedDate : ''),
            finishedDate: new FormControl(data ? data.finishedDate : ''),
            tasks: this.fb.array(data ? data.tasks : []),
          })
        );
      case 'certyficates':
        return this.certyficates.push(
          this.fb.group({
            certName: new FormControl(data ? data.certificateName : ''),
            certNumber: new FormControl(data ? data.certificateNumber : ''),
            organization: new FormControl(data ? data.companyName : ''),
            date: new FormControl(data ? data.date : ''),
          })
        );
      case 'softSkills':
        return this.softSkills.push(
          this.fb.group({
            field: new FormControl(data ? data : ''),
          })
        );
      case 'hobbies':
        return this.hobbies.push(
          this.fb.group({
            field: new FormControl(data ? data : ''),
          })
        );
      case 'organizations':
        return this.organizations.push(
          this.fb.group({
            field: new FormControl(data ? data : ''),
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
