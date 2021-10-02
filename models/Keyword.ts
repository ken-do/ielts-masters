import sequelize, { DataTypes, Model, Optional } from '../utils/sequelize'

export interface KeywordAttributes {
    id: string
    text: string
    textVn: string
}

export type KeywordCreationAttributes = Optional<
    KeywordAttributes,
    'id' | 'textVn'
>

export interface KeywordInstance
    extends Model<KeywordAttributes, KeywordCreationAttributes>,
        KeywordAttributes {
    updatedAt: string
    createdAt: string
}

export const Keyword = sequelize.define<KeywordInstance>(
    'keyword',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        textVn: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        underscored: true,
        tableName: 'keyword',
        timestamps: false,
    }
)

export default Keyword
