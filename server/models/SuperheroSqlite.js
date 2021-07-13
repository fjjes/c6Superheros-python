const sqlite3 = require('sqlite3')

let connectionString = process.env.SQLITE_CONNECTION_STRING || 'superheros.sqlite'
let db = new sqlite3.Database(connectionString)

async function findAll(){ 
  return new Promise((resolve, reject)=> {//how to adapt callback base api to promise based api
    db.all('select id as _id, name, nickname, alterego, sidekick from superhero', (err, rows)=> {
      if(err){
        reject(err)
      }else{
        resolve(rows)
      }
    })
  })
}

async function findById(id){ 
  return new Promise((resolve, reject)=> {
    db.get('select id as _id, name, nickname, alterego, sidekick from superhero where id='+id, (err, row)=> {
      if(err){
        reject(err)
      }else{
        resolve(row)
      }
    })
  })
}

function asSqlConstant(value){
  return value ? "'"+value+"'" : "NULL"
}

//you don't need to put '' around column names unless your column names are case sensitive, have spaces or have special characters
async function create(superheroToCreate){
  let insertSql = 
  "insert into superhero(name, nickname, alterego, sidekick) " + 
  "values (" +
    asSqlConstant(superheroToCreate.name)+","+
    asSqlConstant(superheroToCreate.nickname)+","+
    asSqlConstant(superheroToCreate.alterego)+","+
    asSqlConstant(superheroToCreate.sidekick)+
  ")"

    console.log('Going to execute:' + insertSql)
    return new Promise((resolve, reject)=> {
      db.run(insertSql, (err)=> {
        if(err){
          reject(err)
        }else{
          resolve()
        }
      })
  })
}

async function update(id, superheroToUpdate){
  let updateSql = 
  "update superhero set " + 
  " name=" +asSqlConstant(superheroToUpdate.name)+","+
  " nickname=" +asSqlConstant(superheroToUpdate.nickname)+","+
  " alterego=" +asSqlConstant(superheroToUpdate.alterego)+","+
  " sidekick=" +asSqlConstant(superheroToUpdate.sidekick)+
  "where id="+id

    console.log('Going to execute:' + updateSql)
    return new Promise((resolve, reject)=> {
      db.run(updateSql, (err)=> {
        if(err){
          reject(err)
        }else{
          resolve()
        }
      })
  })
}

async function deleteSuperhero(id){
  let deleteSql = "delete from superhero where id="+id
  console.log('Going to execute: ' + deleteSql)

  return new Promise((resolve, reject)=> {
    db.run(deleteSql, (err)=> {
      if(err){
        reject(err)
      }else{
        resolve()
      }
    })
  }) 
}


module.exports ={
  findAll,
  findById,
  create,
  update,
  deleteSuperhero
}