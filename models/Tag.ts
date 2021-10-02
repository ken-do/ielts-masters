import sequelize, { DataTypes, Model, Optional } from '../utils/sequelize'

export interface TagAttributes {
    id: string
    name: string
}

export type TagCreationAttributes = Optional<TagAttributes, 'id'>

export interface TagInstance
    extends Model<TagAttributes, TagCreationAttributes>,
        TagAttributes {}

export const Tag = sequelize.define<TagInstance>(
    'tag',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    },
    { underscored: true, tableName: 'tag', timestamps: false }
)

export default Tag
