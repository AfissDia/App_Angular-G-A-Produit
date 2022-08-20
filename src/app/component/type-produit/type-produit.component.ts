import { Component, OnInit } from '@angular/core';
import {TypeProduit} from "../../models/type-produit";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TypeProduitService} from "../../services/type-produit.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-type-produit',
  templateUrl: './type-produit.component.html',
  styleUrls: ['./type-produit.component.css']
})
export class TypeProduitComponent implements OnInit {

  typeProduits: TypeProduit[] = [];
  typeProduitDetails!: FormGroup;
  typeProduitObj: TypeProduit = new TypeProduit();
  closeResult!: string;
  private deleteId! :number;


  constructor(
    private formBuilder: FormBuilder,
    private typeProduitService: TypeProduitService,
    private modalService: NgbModal,
    private httpClient: HttpClient) {
  }

  ngOnInit(): void {
          this.getAllTypeProduit();
          this.typeProduitDetails = this.formBuilder.group({
            id : [''],
            nom : ['']
          });
  }

  getAllTypeProduit() {
    this.typeProduitService.getAllTypeProduit()
      .subscribe(res => {
      this.typeProduits = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }
  addTypeProduit(){
    console.log(this.typeProduitDetails);
    this.typeProduitObj.id = this.typeProduitDetails.value.id;
    this.typeProduitObj.nom = this.typeProduitDetails.value.nom;
    this.typeProduitService.addTypeProduit(this.typeProduitObj).subscribe(res=> {
      console.log(res);
      this.getAllTypeProduit();

    },err=>{
      console.log(err);
    });
    this.modalService.dismissAll();
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

  openDetails(targetModal: any, type: TypeProduit) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignorethis.typeProduitDetails.controls['id'].setValue(type)
    document.getElementById('fnom').setAttribute('value', type.nom);
  }

  openEdit(targetModal: any, type : TypeProduit) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.typeProduitDetails.patchValue( {
      id: type.id,
      nom: type.nom
    });
  }
  updateTypeProduit(){
    this.typeProduitObj.id = this.typeProduitDetails.value.id;
    this.typeProduitObj.nom = this.typeProduitDetails.value.nom;
    this.typeProduitService.updateTypeProduit(this.typeProduitObj).subscribe(res=>{
      console.log(res);
      this.getAllTypeProduit();
    },err=>{
      console.log(err);
    });
    this.modalService.dismissAll();
  }

  openDelete(targetModal: any, typeP: TypeProduit) {
    this.deleteId = typeP.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

/*  onDelete(type: TypeProduit) {
    this.typeProduitService.deleteTypeProduit(type).subscribe(res=>{
      console.log(res);
      alert('Type deleted successfully');
      this.getAllTypeProduit();
    },err=>{
      console.log(err);
    });
    this.modalService.dismissAll();
  }*/
  onDelete() {
    const deleteURL = 'http://localhost:8080/typeProduits/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        alert('Type deleted successfully');
        this.modalService.dismissAll();
      });
  }
}
