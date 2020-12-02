import Image from "../champion-models/image.model";
import Gold from "./gold.model";
import Stats from "./stats.model";

export default class Item {
  constructor(
    public description: string,
    public gold: Gold,
    public image: Image,
    public name: string,
    public plaintext: string,
    public stats: Stats,
    public tags: string[]
  ) {}
}
