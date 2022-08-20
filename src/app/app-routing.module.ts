import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonComponent } from './component/livraison/livraison.component';
import { ProduitComponent } from './component/produit/produit.component';
import { TypeProduitComponent } from './component/type-produit/type-produit.component';

const routes: Routes = [
  {path: '',component: ProduitComponent},
  {path: 'types',component:TypeProduitComponent},
  {path: 'produits',component:ProduitComponent},
  {path: 'livraisons',component:LivraisonComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
