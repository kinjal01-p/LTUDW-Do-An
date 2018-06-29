exports.mysqlConfig = {
      host: process.env.mysqlUrl,
      port: 3306,
      user: process.env.mysqlUser,
      password: process.env.mysqlPass,
      database: process.env.mysqlDatabase
}

exports.mysqlSessionConfig = {
      host: process.env.mysqlUrl,
      port: 3306,
      user: process.env.mysqlUser,
      password: process.env.mysqlPass,
      database: process.env.mysqlDatabase,
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

exports.captchaConfig = {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
}

exports.appConfig = {
      PRODUCTS_PER_PAGE: 20,
      PRODUCTS_PER_TOP: 10,
      PRODUCTS_SAMPLE: 48,
      PRODUCTS_SAME_TYPE: 5,
      PRODUCTS_SAME_CATEGORIES: 5,
      PRODUCTS_PER_TABLE: 20,
      TYPES_PER_TABLE: 20,
      MANUFACTURERS_PER_TABLE: 20,
      ORDERS_PER_TABLE: 20
}

exports.imageConfig = {
      url: 'https://res.cloudinary.com/tqbdev/image/upload/v1530232903/resources'
}