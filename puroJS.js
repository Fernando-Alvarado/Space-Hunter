class Animal {
    constructor(nombre) {
      this.nombre = nombre;
    }
  
    hablar() {
      console.log(this.nombre + ' hace un ruido.');
    }
  }

  const fer = new Animal(lobo);
  fer.hablar();