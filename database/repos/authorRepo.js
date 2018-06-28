var db = require('../db.js');

exports.isExist = name =>{
    var sql = `select count(author.id_author) as result,
    author.id_author as id
    from author
    where  lower(author.name) = lower(N'${name}');`;
    return db.load(sql);
}
exports.getMaxId = () => {
    var sql = `select max(author.id_author) as maxId
    from author;`;
    return db.load(sql);
}

exports.add = (id,name) =>{
    var sql = `insert into author (id_author, name) values (${id},'${name}');`;
    return db.load(sql);
}