import { Sequelize } from 'sequelize'

export type Dialect = 'mysql' | 'sqlite'

export const DEFAULT_DIALECT = 'mysql'

let sequelize: Sequelize

async function getSequelize(dialect: Dialect = DEFAULT_DIALECT) {
    if (sequelize) {
        await sequelize.sync()
        return sequelize
    }

    switch (dialect) {
        case 'mysql': {
            sequelize = new Sequelize(
                process.env.DB_SCHEMA,
                process.env.DB_USER,
                process.env.DB_PASS,
                {
                    host: process.env.DB_HOST,
                    dialect: 'mysql',
                }
            )
            console.log('sequelize', sequelize)
            break
        }
        default: {
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: 'path/to/database.sqlite',
            })
            break
        }
    }

    return sequelize
}

getSequelize()

export default sequelize

export * from 'sequelize'
