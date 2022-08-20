import { TypeProduit } from "./type-produit";

export class Produit {
    id!: number;
    nom!: string;
    prix!: string;
    typeProduit!: TypeProduit;
}
