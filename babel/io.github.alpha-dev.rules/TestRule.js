
export class TestRule{
  constructor(itemBody, itemName){
    this.itemBody = itemBody;
    this.itemName = itemName;
  }
  execute(){
    console.log(this.itemName);
  }
}
