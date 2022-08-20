import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeProduit} from "../models/type-produit";
import {Produit} from "../models/produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  addProduitURL!: string;
  getProduitURL!: string;
  updateProduitURL!: string;
  //deleteTypeProduitURL !: string;
  getTypeProduitURL!: string;

  constructor(private http : HttpClient) {
    this.getProduitURL ='http://localhost:8080/produits';
    this.addProduitURL = 'http://localhost:8080/produits/add';
    this.updateProduitURL = 'http://localhost:8080/produits/';
    //this.deleteTypeProduitURL = 'http://localhost:8080/typeProduits/';
    this.getTypeProduitURL ='http://localhost:8080/typeProduits';
  }


  getAllProduit(): Observable<Produit[]>{// @ts-ignore
    return this.http.get<Produit>(this.getProduitURL);
  }
  getAllTypeProduit(): Observable<TypeProduit[]>{// @ts-ignore
    return this.http.get<TypeProduit>(this.getTypeProduitURL);
  }


  addProduit(type : Produit): Observable<Produit>{// @ts-ignore
    return this.http.post<Produit>(this.addProduitURL,type);
  }
/*  updateProduit(type: Produit): Observable<Produit>{// @ts-ignore
    return this.http.put<Produit>(this.updateProduitURL+ type.id + '/update',type);
  }*/


}
