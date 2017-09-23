class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = this.y = this.z = 0;
    this.set(x, y, z);
  }

  normaliser() {
    const longueur = this.longueur();

    if(longueur != 0.0)
    {
      this.x /= longueur;
      this.y /= longueur;
      this.z /= longueur;
    }
  }

  limiter(max) {
    const longueurCarre = (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
      
    if( ( longueurCarre > max * max ) && ( longueurCarre > 0 ) ) 
    {
        const ratio = max / Math.sqrt( longueurCarre );
        this.x *= ratio;
        this.y *= ratio;
        this.z *= ratio;
    }
  }

  // cross 
  produitVectoriel(vecteur2) {
    let resultat = new Vec3();
    resultat.x = this.y * vecteur2.z - this.z * vecteur2.y;
    resultat.y = this.z * vecteur2.x - this.x * vecteur2.z;
    resultat.z = this.x * vecteur2.y - this.y * vecteur2.x;
    return resultat;
  }

  // dot
  produitScalaire(vecteur2) { 
    return (this.x * vecteur2.x) + (this.y * vecteur2.y) + (this.z * vecteur2.z);
  }

  get() {
    const valeurs = new Array(3);
    valeurs[0] = this.x;
    valeurs[1] = this.y;
    valeurs[2] = this.z;
    return valeurs;
  }

  longueur() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
  }

  directionVers(v) {
    const resultat = new Vec3();
    resultat.x = v.x - this.x;
    resultat.y = v.y - this.y;
    resultat.z = v.z - this.z;
    return resultat;
  }

  //////////////////// OPERATOR ///////////////////////
  set(x, y, z) {
    if(x != null){ this.x = x; }
    if(y != null){ this.y = y; } else if(x != null){ this.y = x; }
    if(z != null){ this.z = z; } else if(x != null){ this.z = x; }
  }

  egale(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
  }

  plus(v) {
    const resultat = new Vec3();
    resultat.x = this.x + v.x;
    resultat.y = this.y + v.y;
    resultat.z = this.z + v.z;
    return resultat;
  }

  plusValeur(valeur) {
    const resultat = new Vec3();
    resultat.x = this.x + valeur;
    resultat.y = this.y + valeur;
    resultat.z = this.z + valeur;
    return resultat;
  }

  moins(v) {
    const resultat = new Vec3();
    resultat.x = this.x - v.x;
    resultat.y = this.y - v.y;
    resultat.z = this.z - v.z;
    return resultat;
  }

  moinsValeur(valeur) {
    const resultat = new Vec3();
    resultat.x = this.x - valeur;
    resultat.y = this.y - valeur;
    resultat.z = this.z - valeur;
    return resultat;
  }

  multiplierValeur(valeur) {
    const resultat = new Vec3();
    resultat.x = this.x * valeur;
    resultat.y = this.y * valeur;
    resultat.z = this.z * valeur;
    return resultat;
  }

  multiplierMatrice(matrice) {
    const resultat = new Vec3();
    resultat.x = matrice.d[0]*this.x + matrice.d[1]*this.y + matrice.d[2]*this.z;
    resultat.y = matrice.d[3]*this.x + matrice.d[4]*this.y + matrice.d[5]*this.z;
    resultat.z = matrice.d[6]*this.x + matrice.d[7]*this.y + matrice.d[8]*this.z;
    return resultat;
  }

  multiplier(v) {
    const resultat = new Vec3();
    resultat.x = this.x * v.x;
    resultat.y = this.y * v.y;
    resultat.z = this.z * v.z;
    return resultat;
  }

  diviserValeur(valeur) {
    const resultat = new Vec3();
    resultat.x = this.x / valeur;
    resultat.y = this.y / valeur;
    resultat.z = this.z / valeur;
    return resultat;
  }

  diviser(v) {
    const resultat = new Vec3();
    resultat.x = this.x / v.x;
    resultat.y = this.y / v.y;
    resultat.z = this.z / v.z;
    return resultat;
  }

  distance(vec32) {
      return Math.sqrt(((vec32.x - this.x)*(vec32.x - this.x)) + ((vec32.y - this.y)*(vec32.y - this.y)) + ((vec32.z - this.z)*(vec32.z - this.z)));
  }

  angleDegree(v) {
    const dot = this.produitScalaire(v);
    const cosAngle = dot / (this.longueur() * v.longueur());
    const angleRadian = Math.acos(cosAngle);
    const angle = (angleRadian * 180) / Math.PI;

    const sens = signe( (this.x * v.y) + (this.y * v.x) ); // sens de l'angle

    return angle * (-sens);
  }

  calculerNormale(v2,v3, sens) {
    const resultat = new Vec3();
    const U = new Vec3();
    const V = new Vec3();
    U.egale(v2.moins(this));
    V.egale(v3.moins(this));
    if(sens){ // inverser le produit vectoriel pour inverser la normale  
      resultat.egale(V.produitVectoriel(U)); 
    } else {
      resultat.egale(U.produitVectoriel(V));
    }
    resultat.normaliser();
    return resultat;
  }

  getBarycentre(v1, v2, v3, pos) {
    const det = (v2.z - v3.z) * (v1.x - v3.x) + (v3.x - v2.x) * (v1.z - v3.z);
    const l1 = ((v2.z - v3.z) * (pos[0] - v3.x) + (v3.x - v2.x) * (pos[1] - v3.z)) / det;
    const l2 = ((v3.z - v1.z) * (pos[0] - v3.x) + (v1.x - v3.x) * (pos[1] - v3.z)) / det;
    const l3 = 1.0 - l1 - l2;
    return l1 * v1.y + l2 * v2.y + l3 * v3.y;
  }
}

export default Vec3;
