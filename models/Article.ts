import sequelize, { DataTypes, Model, Optional } from '../utils/sequelize'

export interface ArticleAttributes {
    id: string
    title: string
}

export type ArticleCreationAttributes = Optional<ArticleAttributes, 'id'>

export interface ArticleInstance
    extends Model<ArticleAttributes, ArticleCreationAttributes>,
        ArticleAttributes {
    updatedAt: string
    createdAt: string
}

export const Article = sequelize.define<ArticleInstance>(
    'article',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        underscored: true,
        tableName: 'article',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

export default Article
