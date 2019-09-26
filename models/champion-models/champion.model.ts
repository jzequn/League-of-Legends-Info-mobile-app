import Stats from "./stats.model";
import Info from "./info.model";
import Image from "./image.model";

export default class Champion {
  constructor(
    public image: Image,
    public info: Info,
    public key: string,
    public name: string,
    public partype: string,
    public stats: Stats,
    public tags: string[],
    public title: string,
    public version: string,
    public id: string,
    public blurb: string
  ) {}
}
