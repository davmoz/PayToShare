import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/products/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products: Observable<Product[]>;
  private productBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.productBeingDeleted = null;
  }

  /*
  to be fixed {Suitable for the search by tag functionality]
   */
  getProductsByTag(tags: string[]): Observable<Product[]> {
    return this.products = this.afs.collection('products', ref =>
      ref.where('quantity', '>', 0)).snapshotChanges().pipe(
      map(products => {
        return products.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as Product;
        }).filter(
          product => (tags.length > 0) ? tags.includes(product.id) : true
        );
      })
    );
  }

  getProductDoc(productID: string) {
    return this.afs.doc(`products/${productID}`);
  }

  getTagJson(productID: string) {
    return this.afs.doc(`products/${productID}`).ref.get().then(product => {
      return {
        id: product.id,
        ...product.data()
      } as Product;
    });
  }


  addProduct(product: Product) {
    this.afs.collection('products').add(Object.assign({}, product));
  }

  available(productId: string): boolean {
    if (this.productBeingDeleted === null) {
      this.productBeingDeleted = productId;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`products/${this.productBeingDeleted}`).delete();
    this.productBeingDeleted = null;
  }

  cancel() {
    this.productBeingDeleted = null;
  }

  update(product: Product) {
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);
    console.log(product.id);

    this.afs.doc(`products/${product.id}`).update(Object.assign({}, product));
  }

}
