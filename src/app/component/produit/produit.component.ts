import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Produit} from "../../models/produit";
import {ProduitService} from "../../services/produit.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TypeProduit} from "../../models/type-produit";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {


  produitDetails !: FormGroup;
  produitObj : Produit = new Produit();
  produitList : Produit[]=[];
  typeProduit: TypeProduit[] = [];

  closeResult!: string;

  constructor(
    private formButder: FormBuilder,
    private produitService : ProduitService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.getAllProduit();
    this.getAllTypeProduit();
  }

  //afficher produit
  getAllProduit() {
    this.produitService.getAllProduit().subscribe(res=>{
      this.produitList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }
  getAllTypeProduit() {
    this.produitService.getAllTypeProduit()
      .subscribe(res => {
        this.typeProduit = res;
      }, err => {
        console.log("error while fetching data.")
      });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
