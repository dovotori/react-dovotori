import Vec3 from './Vec3';

class Mat4 {
  constructor() {
    this.d = new Float32Array(16);
    this.sauvegardePrecedente;
    this.empilement;

    this.init();
  }

  init() {
    this.reset();
    this.sauvegardePrecedente = [];
    this.empilement = 0;
  }

  reset() {
    for (let i = 0; i < 16; i += 1) {
      this.d[i] = 0.0;
    }
  }

  get() {
    return this.d.slice();
  }

  set(a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4) {
    this.d[0] = a1;
    this.d[1] = a2;
    this.d[2] = a3;
    this.d[3] = a4;

    this.d[4] = b1;
    this.d[5] = b2;
    this.d[6] = b3;
    this.d[7] = b4;

    this.d[8] = c1;
    this.d[9] = c2;
    this.d[10] = c3;
    this.d[11] = c4;

    this.d[12] = d1;
    this.d[13] = d2;
    this.d[14] = d3;
    this.d[15] = d4;
  }

  getMatrice3x3() {
    const resultat = new Float32Array(9);
    resultat[0] = this.d[0];
    resultat[1] = this.d[1];
    resultat[2] = this.d[2];
    resultat[3] = this.d[4];
    resultat[4] = this.d[5];
    resultat[5] = this.d[6];
    resultat[6] = this.d[8];
    resultat[7] = this.d[9];
    resultat[8] = this.d[10];
    return resultat;
  }

  //////////////////////OPERATIONS//////////////////////

  multiplier(matrice2) {
    const resultat = new Mat4();
    for (let k = 0; k < 4; k += 1) {
      for (let j = 0; j < 4; j += 1) {
        for (let i = 0; i < 4; i += 1) {
          resultat.d[4 * j + k] += this.d[4 * j + i] * matrice2.d[4 * i + k];
        }
      }
    }

    for (let i = 0; i < 16; i += 1) {
      this.d[i] = resultat.d[i];
    }
  }

  egale(matrice2) {
    for (let i = 0; i < 16; i += 1) {
      this.d[i] = matrice2.d[i];
      this.sauvegardePrecedente[i] = matrice2.sauvegardePrecedente[i];
    }
  }

  ////////////////////// IMBRICATION //////////////////////

  push() {
    this.empilement += 1;
    let cpt = 0;
    for (let i = (this.empilement - 1) * 16; i < this.empilement * 16; i += 1) {
      this.sauvegardePrecedente[i] = this.d[cpt];
      cpt += 1;
    }
  }

  pop() {
    if (this.empilement > 0) {
      let cpt = 0;
      for (let i = (this.empilement - 1) * 16; i < this.empilement * 16; i += 1) {
        this.d[cpt] = this.sauvegardePrecedente[i];
        this.sauvegardePrecedente[i] = null;
        cpt += 1;
      }
      this.empilement--;
    } else {
      console.log('pop de trop');
    }
  }

  //////////////////////TRANSFORMATIONS//////////////////////

  translate(x, y, z) {
    const translation = new Mat4();
    translation.identity();
    translation.d[12] = x;
    translation.d[13] = y;
    translation.d[14] = z;
    this.multiplier(translation);
    return this;
  }

  scale(x, y, z) {
    const scale = new Mat4();
    scale.d[0] = x;
    scale.d[5] = y;
    scale.d[10] = z;
    scale.d[15] = 1.0;
    this.multiplier(scale);
    return this;
  }

  rotate(angle, x, y, z) {
    const rotation = new Mat4();
    angle *= Math.PI / 180;

    const axe = new Vec3(x, y, z);
    axe.normaliser();

    rotation.d[0] = axe.x * axe.x * (1 - Math.cos(angle)) + Math.cos(angle);
    rotation.d[1] = axe.x * axe.y * (1 - Math.cos(angle)) - axe.z * Math.sin(angle);
    rotation.d[2] = axe.x * axe.z * (1 - Math.cos(angle)) + axe.y * Math.sin(angle);

    rotation.d[4] = axe.x * axe.y * (1 - Math.cos(angle)) + axe.z * Math.sin(angle);
    rotation.d[5] = axe.y * axe.y * (1 - Math.cos(angle)) + Math.cos(angle);
    rotation.d[6] = axe.y * axe.z * (1 - Math.cos(angle)) - axe.x * Math.sin(angle);

    rotation.d[8] = axe.x * axe.z * (1 - Math.cos(angle)) - axe.y * Math.sin(angle);
    rotation.d[9] = axe.y * axe.z * (1 - Math.cos(angle)) + axe.x * Math.sin(angle);
    rotation.d[10] = axe.z * axe.z * (1 - Math.cos(angle)) + Math.cos(angle);

    rotation.d[15] = 1.0;

    this.multiplier(rotation);
  }

  //////////////////////MODIFICATIONS//////////////////////

  identity() {
    this.init();
    this.d[0] = 1.0;
    this.d[5] = 1.0;
    this.d[10] = 1.0;
    this.d[15] = 1.0;
  }

  perspective(angle, ratio, near, far) {
    const fieldOfViewYInRadians = angle * (Math.PI / 180);
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
    const rangeInv = 1.0 / (near - far);

    this.d[0] = f / ratio;
    this.d[1] = 0;
    this.d[2] = 0;
    this.d[3] = 0;

    this.d[4] = 0;
    this.d[5] = f;
    this.d[6] = 0;
    this.d[7] = 0;

    this.d[8] = 0;
    this.d[9] = 0;
    this.d[10] = (near + far) * rangeInv;
    this.d[11] = -1;

    this.d[12] = 0;
    this.d[13] = 0;
    this.d[14] = near * far * rangeInv * 2;
    this.d[15] = 0;
  }

  lookAt(e0, e1, e2, c0, c1, c2, a0, a1, a2) {
    const eye = new Vec3(e0, e1, e2);
    const cible = new Vec3(c0, c1, c2);
    const axe = new Vec3(a0, a1, a2);

    const vz = eye.moins(cible);
    vz.normaliser();
    const vx = axe.produitVectoriel(vz);
    vx.normaliser();
    const vy = vz.produitVectoriel(vx);
    this.set(vx.x, vx.y, vx.z, 0, vy.x, vy.y, vy.z, 0, vz.x, vz.y, vz.z, 0, eye.x, eye.y, eye.z, 1);
    this.inverser();
  }

  transpose() {
    const ordre = new Float32Array(16);
    let cpt = 0;
    for (let j = 0; j < 4; j += 1) {
      for (let i = 0; i < 4; i += 1) {
        ordre[cpt] = this.d[i * 4 + j];
        cpt += 1;
      }
    }
    return ordre;
  }

  inverser() {
    // get cofactors of minor matrices
    const cofactor0 = this.getCofacteur(
      this.d[5],
      this.d[6],
      this.d[7],
      this.d[9],
      this.d[10],
      this.d[11],
      this.d[13],
      this.d[14],
      this.d[15],
    );
    const cofactor1 = this.getCofacteur(
      this.d[4],
      this.d[6],
      this.d[7],
      this.d[8],
      this.d[10],
      this.d[11],
      this.d[12],
      this.d[14],
      this.d[15],
    );
    const cofactor2 = this.getCofacteur(
      this.d[4],
      this.d[5],
      this.d[7],
      this.d[8],
      this.d[9],
      this.d[11],
      this.d[12],
      this.d[13],
      this.d[15],
    );
    const cofactor3 = this.getCofacteur(
      this.d[4],
      this.d[5],
      this.d[6],
      this.d[8],
      this.d[9],
      this.d[10],
      this.d[12],
      this.d[13],
      this.d[14],
    );

    // get determinant
    const determinant =
      this.d[0] * cofactor0 - this.d[1] * cofactor1 + this.d[2] * cofactor2 - this.d[3] * cofactor3;

    const cofactor4 = this.getCofacteur(
      this.d[1],
      this.d[2],
      this.d[3],
      this.d[9],
      this.d[10],
      this.d[11],
      this.d[13],
      this.d[14],
      this.d[15],
    );
    const cofactor5 = this.getCofacteur(
      this.d[0],
      this.d[2],
      this.d[3],
      this.d[8],
      this.d[10],
      this.d[11],
      this.d[12],
      this.d[14],
      this.d[15],
    );
    const cofactor6 = this.getCofacteur(
      this.d[0],
      this.d[1],
      this.d[3],
      this.d[8],
      this.d[9],
      this.d[11],
      this.d[12],
      this.d[13],
      this.d[15],
    );
    const cofactor7 = this.getCofacteur(
      this.d[0],
      this.d[1],
      this.d[2],
      this.d[8],
      this.d[9],
      this.d[10],
      this.d[12],
      this.d[13],
      this.d[14],
    );

    const cofactor8 = this.getCofacteur(
      this.d[1],
      this.d[2],
      this.d[3],
      this.d[5],
      this.d[6],
      this.d[7],
      this.d[13],
      this.d[14],
      this.d[15],
    );
    const cofactor9 = this.getCofacteur(
      this.d[0],
      this.d[2],
      this.d[3],
      this.d[4],
      this.d[6],
      this.d[7],
      this.d[12],
      this.d[14],
      this.d[15],
    );
    const cofactor10 = this.getCofacteur(
      this.d[0],
      this.d[1],
      this.d[3],
      this.d[4],
      this.d[5],
      this.d[7],
      this.d[12],
      this.d[13],
      this.d[15],
    );
    const cofactor11 = this.getCofacteur(
      this.d[0],
      this.d[1],
      this.d[2],
      this.d[4],
      this.d[5],
      this.d[6],
      this.d[12],
      this.d[13],
      this.d[14],
    );

    const cofactor12 = this.getCofacteur(
      this.d[1],
      this.d[2],
      this.d[3],
      this.d[5],
      this.d[6],
      this.d[7],
      this.d[9],
      this.d[10],
      this.d[11],
    );
    const cofactor13 = this.getCofacteur(
      this.d[0],
      this.d[2],
      this.d[3],
      this.d[4],
      this.d[6],
      this.d[7],
      this.d[8],
      this.d[10],
      this.d[11],
    );
    const cofactor14 = this.getCofacteur(
      this.d[0],
      this.d[1],
      this.d[3],
      this.d[4],
      this.d[5],
      this.d[7],
      this.d[8],
      this.d[9],
      this.d[11],
    );
    const cofactor15 = this.getCofacteur(
      this.d[0],
      this.d[1],
      this.d[2],
      this.d[4],
      this.d[5],
      this.d[6],
      this.d[8],
      this.d[9],
      this.d[10],
    );

    const invDeterminant = 1.0 / determinant;

    this.d[0] = invDeterminant * cofactor0;
    this.d[1] = -invDeterminant * cofactor4;
    this.d[2] = invDeterminant * cofactor8;
    this.d[3] = -invDeterminant * cofactor12;

    this.d[4] = -invDeterminant * cofactor1;
    this.d[5] = invDeterminant * cofactor5;
    this.d[6] = -invDeterminant * cofactor9;
    this.d[7] = invDeterminant * cofactor13;

    this.d[8] = invDeterminant * cofactor2;
    this.d[9] = -invDeterminant * cofactor6;
    this.d[10] = invDeterminant * cofactor10;
    this.d[11] = -invDeterminant * cofactor14;

    this.d[12] = -invDeterminant * cofactor3;
    this.d[13] = invDeterminant * cofactor7;
    this.d[14] = -invDeterminant * cofactor11;
    this.d[15] = invDeterminant * cofactor15;
  }

  getDeterminant() {
    return (
      this.d[0] *
        this.getCofacteur(
          this.d[5],
          this.d[6],
          this.d[7],
          this.d[9],
          this.d[10],
          this.d[11],
          this.d[13],
          this.d[14],
          this.d[15],
        ) -
      this.d[1] *
        this.getCofacteur(
          this.d[4],
          this.d[6],
          this.d[7],
          this.d[8],
          this.d[10],
          this.d[11],
          this.d[12],
          this.d[14],
          this.d[15],
        ) +
      this.d[2] *
        this.getCofacteur(
          this.d[4],
          this.d[5],
          this.d[7],
          this.d[8],
          this.d[9],
          this.d[11],
          this.d[12],
          this.d[13],
          this.d[15],
        ) -
      this.d[3] *
        this.getCofacteur(
          this.d[4],
          this.d[5],
          this.d[6],
          this.d[8],
          this.d[9],
          this.d[10],
          this.d[12],
          this.d[13],
          this.d[14],
        )
    );
  }

  getCofacteur(m0, m1, m2, m3, m4, m5, m6, m7, m8) {
    return m0 * (m4 * m8 - m5 * m7) - m1 * (m3 * m8 - m5 * m6) + m2 * (m3 * m7 - m4 * m6);
  }
}

export default Mat4;
