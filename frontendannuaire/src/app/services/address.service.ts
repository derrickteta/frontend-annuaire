import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Address } from '../models/Address.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}

  private address: Address[] = [
    {
      _id: '324sdfmoih3',
      name: 'Tcheujo TETA',
      firstname: 'Derrick',
      phone: 693998524,
      email: 'derrickteta1@gmail.com',
      address: 'yde-melen',
      description: 'Eleve Ing',
      userId: 'will'
    },
    {
      _id: '324sdfmoih4',
      name: 'TETA TCHOUAKE',
      firstname: 'Berekia Ben',
      phone: 694598524,
      email: 'derrickteta@gmail.com',
      address: 'Dla-Yassa',
      description: 'bébé neuveux',
      userId: 'will'
    },
  ];
  public address$ = new Subject<Address[]>();

  getAddress() {
    this.http.get('http://localhost:3000/api/address').subscribe(
      (address: Address[]) => {
        if (address) {
          this.address = address;
          this.emitAddress();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitAddress() {
    this.address$.next(this.address);
  }

  getAddressById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/address/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewAddress(address: Address) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/address', address).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyAddress(id: string, address: Address) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/address/' + id, address).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  deleteAddress(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/address/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
