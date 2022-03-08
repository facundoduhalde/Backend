class Usuario {
    nombre;
    apellido;
    libros;
    mascotas;

    constructor(input_nombre, input_apellido, input_libros, input_mascotas) {
        this.nombre = input_nombre;
        this.apellido = input_apellido;
        this.libros = input_libros;
        this.mascotas = input_mascotas;
    }

    getFullName() {
        return console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas() {
        return console.log(this.mascotas.length);
    }

    addBook(nombreLibro, autorLibro) {
        this.libros.push({
            nombre: nombreLibro,
            autor: autorLibro,
        })
    }

    getBookNames() {
        this.libros.forEach(element => {
            console.log(element.nombre);
        });
    }
}

const usuario1 = new Usuario('Facundo', 'Duhalde', [
    {
        nombre: 'El Psicoanalista',
        autor: 'John Katzenbach'
    },
    {
        nombre: 'Crónica de una muerte anunciada',
        autor: 'Gabriel García Márquez'
    },], ["gato", "perro"])

usuario1.getFullName(); // Devuelve "Facundo Duhalde" por consola

usuario1.addMascota("raton");
usuario1.addMascota("canario");
usuario1.countMascotas() // Devuelve 4 por consola

usuario1.addBook("Harry Potter y la Camara Secreta", 'J.K. Rowling')
usuario1.getBookNames(); /* Devuelve por consola:
El Psicoanalista
Crónica de una muerte anunciada
Harry Potter y la Camara Secreta*/
