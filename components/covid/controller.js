const soda = require('soda-js');
const consumer = new soda.Consumer('datos.gov.co');
const dataset = "gt2j-8ykr"

async function query(soql) {
  return new Promise((resolve, reject) => {
    consumer.query().withDataset(dataset)
      .soql(soql)
      .getRows()
      .on('success', rows => resolve(rows))
      .on('error', err => reject(err))
  })
};

function totaldecasos() {
  return query(`SELECT count(*) AS total`)
}

function clasificacion() {
  return query(`SELECT atenci_n, count(*) AS total GROUP BY atenci_n`)
}

function departamentos() {
  return query(`SELECT departamento, count(*) AS total GROUP BY departamento ORDER BY departamento`)
}

function ciudad() {
  return query(`SELECT ciudad_de_ubicaci_n, count(*) AS total GROUP BY ciudad_de_ubicaci_n ORDER BY ciudad_de_ubicaci_n`)
}

function genero() {
  return query(`SELECT sexo, count(*) AS total GROUP BY sexo`)
}

module.exports = {
  totaldecasos,
  clasificacion,
  departamentos,
  ciudad,
  genero
}