
export class Rule{

  getFileList(){
    return fileList;
  }

  //Abstract : Passes the file's body
  parseFile(fileBody, fileExtension){
    console.log("This an abstract function");
  }
}
