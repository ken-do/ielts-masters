import sequelize, { DataTypes, Model, Optional } from '../utils/sequelize'

export interface CategoryAttributes {
    id: string
    name: string
}

export type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>

export interface CategoryInstance
    extends Model<CategoryAttributes, CategoryCreationAttributes>,
        CategoryAttributes {}

export const Category = sequelize.define<CategoryInstance>(
    'category',
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
    { underscored: true, tableName: 'category', timestamps: false }
)

export default Category
