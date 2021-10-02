import sequelize, { DataTypes, Model, Optional } from '../utils/sequelize'

export interface TestModeAttributes {
    id: string
    name: string
}

export type TestModeCreationAttributes = Optional<TestModeAttributes, 'id'>

export interface TestModeInstance
    extends Model<TestModeAttributes, TestModeCreationAttributes>,
        TestModeAttributes {}

export const TestMode = sequelize.define<TestModeInstance>(
    'testMode',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    },
    { underscored: true, tableName: 'test_mode', timestamps: false }
)

export default TestMode
