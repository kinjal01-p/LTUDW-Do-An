exports.mysqlConfig = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'store'
}

exports.mysqlSessionConfig = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456',
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
      PRODUCTS_PER_PAGE: 20,
      PRODUCTS_SAME_TYPE: 5,
      PRODUCTS_SAME_CATEGORIES: 5
}

