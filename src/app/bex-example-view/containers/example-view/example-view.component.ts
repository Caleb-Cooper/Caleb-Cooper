import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/reducers';
import * as RouterActions from '../../../+state/actions/router.actions';

@Component({
  selector: 'app-example-view',
  templateUrl: './example-view.component.html',
  styleUrls: ['./example-view.component.scss']
})
export class ExampleViewComponent implements OnInit {
  viewForm: FormGroup;
  optionsSelect: any;
  people$: Observable<any[]>;
  backToListLink = '';
  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.optionsSelect = [
      { value: 1, label: 'Branch' },
      { value: 2, label: 'Customer' },
      { value: 3, label: 'Manifesting' },
    ];
    this.viewForm = this.fb.group({
      userName: new FormControl({
        value: '',
        disabled: true
        },
      ),
      checked: new FormControl({
        value: true,
        disabled: true
      }),
      switchExample: new FormControl({
        value: true,
        disabled: true
      }),
      options: new FormControl({
        value: '',
        disabled: true
      }
      ),
      ngSelect: new FormControl({
        value: [],
      }
      ),
      message: new FormControl({
        value: '',
        disabled: true
        }
      ),
    });
    this.viewForm.patchValue({userName: 'Test name'});
    this.viewForm.patchValue({options: 2});
    this.viewForm.patchValue({message: 'This is a test message'});
    this.viewForm.patchValue({ngSelect: ['Franklin James', 'Pearson Thompson']});
  }

  /**
   * Back to list
   */
  backToList(event) {
    if (!event.ctrlKey) {
      event.preventDefault();
      this.store$.dispatch(RouterActions.Go({path: [this.backToListLink]}));
    }
  }

}
