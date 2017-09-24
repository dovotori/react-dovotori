class ParseObj {
  constructor() {
    // this.vertices = {};
    this.verticesList = new Array();
    this.objets = new Array();
  }


  setup(source) {
    const lines = source.split(/\n/g);

    let cptObj = -1;
    let idVertice = 1;

    lines.forEach(line => {
      const firstLetter = line.charAt(0);
      switch (firstLetter) {
        case 'o':
          cptObj++;
          const words = line.split(' ');
          this.objets[cptObj] = {
            vID: [],
            key: words[1],
          };
          break;
        case 'v':
          this.setVertice(line, idVertice);
          idVertice++;
          break;
        case 'f':
          this.setFace(line, cptObj);
          break;
        default: break;
      }
    });

  }

  setVertice(line, id) {
    const words = line.split(' ');
    // this.vertices[id] = {
    //   x: parseFloat(words[1], 10),
    //   y: parseFloat(words[2], 10),
    //   z: parseFloat(words[3], 10)
    // }
    this.verticesList.push(parseFloat(words[1], 10));
    this.verticesList.push(parseFloat(words[2], 10));
    this.verticesList.push(parseFloat(words[3], 10));
  }

  setFace(line, cpt) {
    const words = line.split(' ');
    this.objets[cpt].vID.push(parseInt(words[1], 10) - 1);
    this.objets[cpt].vID.push(parseInt(words[2], 10) - 1);
    this.objets[cpt].vID.push(parseInt(words[3], 10) - 1);
  }

  getVerticesList() { return this.verticesList; }
  getObjets() { return this.objets; }
}

export default ParseObj;
