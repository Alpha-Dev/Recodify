class Rule{
  //File extensions to crawl for
  const fileList;

  getFileList(){
    return fileList;
  }

  //Abstract : Passes the file's body
  parseFile(fileBody, fileExtension){}
}
