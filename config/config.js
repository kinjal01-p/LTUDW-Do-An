exports.mysqlConfig = {
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'store',
      port: '3306'
}

exports.mysqlSessionConfig = {
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'store',
      port: '3306',
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