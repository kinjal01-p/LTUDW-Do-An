exports.mysqlConfig = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'store'
}

exports.mysqlSessionConfig = {
      host: 'localhost',
      port: 3306,
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

exports.captchaConfig = {
      RECAPTCHA_SITE_KEY: '6LcBCmEUAAAAAEg5fI_NypLK_mKBzK17e2-Tpzlv',
      RECAPTCHA_SECRET_KEY: '6LcBCmEUAAAAAHjs5-y9kTuzAEly8utepaCFdjD4'
}

exports.appConfig = {
      PRODUCTS_PER_PAGE: 20,
      PRODUCTS_PER_TOP: 10,
      PRODUCTS_SAMPLE: 48,
      PRODUCTS_SAME_TYPE: 5,
      PRODUCTS_SAME_CATEGORIES: 5
}

