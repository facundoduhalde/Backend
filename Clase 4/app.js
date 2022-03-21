const fs = require('fs')

class Contenedor {
  constructor(name) {
    this.name = name
  }

  async save(object) {
    try {
      const data = await fs.promises.readFile(`${this.name}`, 'utf-8');
      const result = JSON.parse(data);
      const newData = [...result]
      const newItem = {
        title: object.title,
        price: object.price,
        thumbnail: object.thumbnail,
        id: result.length + 1
      }

      newData.push(newItem)
      await fs.promises.writeFile(`./${this.name}`, JSON.stringify(newData))
      return console.log(`Los datos se han guardado con exito. El nuevo registro tiene el ID: ${newItem.id}`) 
    } catch (err) {
      console.log('Error al guardar: ', err)
    }
  }
  async getById(id) {
    const data = fs.readFileSync(`${this.name}`)
    const dataJson = JSON.parse(data)
    return console.log(dataJson.find((item) => item.id === id));
  }
  async getAll() {
    try {
      const data = fs.readFileSync(`./${this.name}`, 'utf-8')
      const dataJson = JSON.parse(data)
      return console.log(dataJson);
    } catch (error) {
      return error
    }
  }
  deleteById(id) {
    const data = fs.readFileSync(`${this.name}`)
    const dataJson = JSON.parse(data)
    const newData = dataJson.filter((item) => item.id !== id)
    fs.writeFileSync(`${this.name}`, JSON.stringify(newData))
    return console.log(`Se ha eliminado el registro con el id ${id}`);
  }

  deleteAll() {
    try {
    fs.promises.writeFile(`./${this.name}`, '[]') 
      return console.log('Se han borrado todos los registros de la base de datos'); 
    } catch (error) {
      return `Ha ocurrido un error en el borrado de los datos: ${error}`
    }
  }
}

const baseDeDatos = new Contenedor('productos.txt')

const nuevoItem = {
    title: 'Carpeta Nº 3',
    price: 450.20,
    thumbnail: 'https://www.ramospapeleria.com.ar/img/p/35887/1.jpeg?quality=95&width=800&height=800&mode=max&upscale=false'
  }

  const prueba = () => {
    baseDeDatos.save(nuevoItem);
    baseDeDatos.getById(2);
    baseDeDatos.getAll();
    baseDeDatos.deleteById(2);
}

prueba();
