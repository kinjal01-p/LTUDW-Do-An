exports.mysqlConfig = {
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'store'
}

exports.mysqlSessionConfig = {
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'store',
      createDatabaseTable: true,
      schema: {
            tableName: 'sessions',
            columnNames: {
                  session_id: 'session_id',
                  expires: 'expires',
                  data: 'data'
            }
      }
}

exports.appConfig = {
      PRODUCTS_PER_PAGE: 20
}