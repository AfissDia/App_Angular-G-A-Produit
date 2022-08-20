import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeProduit} from "../models/type-produit";

@Injectable({
  providedIn: 'root'
})
export class TypeProduitService {

  addTypeProduitURL!: string;
  getTypeProduitURL!: string;
  updateTypeProduitURL!: string;
  //deleteTypeProduitURL !: string;

  constructor(private http : HttpClient) {
    this.getTypeProduitURL ='http://localhost:8080/typeProduits';
    this.addTypeProduitURL = 'http://localhost:8080/typeProduits/add';
    this.updateTypeProduitURL = 'http://localhost:8080/typeProduits/';
    //this.deleteTypeProduitURL = 'http://localhost:8080/typeProduits/';
  }

  getAllTypeProduit(): Observable<TypeProduit[]>{// @ts-ignore
    return this.http.get<TypeProduit>(this.getTypeProduitURL);
  }
  addTypeProduit(type : TypeProduit): Observable<TypeProduit>{// @ts-ignore
    return this.http.post<TypeProduit>(this.addTypeProduitURL,type);
  }
  updateTypeProduit(type: TypeProduit): Observable<TypeProduit>{// @ts-ignore
    return this.http.put<TypeProduit>(this.updateTypeProduitURL+ type.id + '/update',type);
  }
/*  deleteTypeProduit(type: TypeProduit): Observable<TypeProduit>{// @ts-ignore
    return this.http.delete<TypeProduit>(this.deleteTypeProduitURL+ type.id+'/delete',type);
  }*/
}
