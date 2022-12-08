import {Item} from "./Item";
import {Payer} from "./Payer";

export class Preference {
    public items: Item[] = []
    public payer: Payer = new Payer()
    public back_urls: any
    public auto_return = "approved"
    public external_reference
}