import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Address } from '../../models/Address.model';
import { AddressService } from '../../services/address.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-address',
  templateUrl: './single-address.component.html',
  styleUrls: ['./single-address.component.scss']
})
export class SingleAddressComponent implements OnInit, OnDestroy {

  public address: Address;
  public loading: boolean;
  public userId: string;
  public part: number;

  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private stuffService: AddressService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-address');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.stuffService.getAddressById(params.id).then(
          (address: Address) => {
            this.loading = false;
            this.address = address;
          }
        );
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
        if (part >= 3) {
          this.userId = this.auth.userId;
        }
      }
    );
  }

  onGoBack() {
    if (this.part === 1) {
      this.router.navigate(['/part-one/all-stuff']);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/all-stuff']);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/all-stuff']);
    }
  }

  onModify() {
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-address/' + this.address._id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-address/' + this.address._id]);
        break;
      case 4:
        this.router.navigate(['/part-four/modify-address/' + this.address._id]);
        break;
    }
  }

  onDelete() {
    this.loading = true;
    this.stuffService.deleteAddress(this.address._id).then(
      () => {
        this.loading = false;
        this.router.navigate(['/part-three/all-stuff']);
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
