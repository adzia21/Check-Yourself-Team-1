import { Component } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { icons } from "src/app/shared/constants/constants";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss', '../../user-edit.component.scss']
})
export class UserDetailsComponent {

    public userForm = new FormGroup({
        contractType: new FormControl('', []),
      });
    
    
      constructor(private fb: FormBuilder, private toastrService: ToastrService) { }
    
    
     

}