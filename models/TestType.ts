import sequelize, { DataTypes, Model, Optional } from '../utils/sequelize'

export interface TestTypeAttributes {
    id: string
    name: string
    description: string
    source: string
    marks: string
    answering: string
    timingMinutes: number
    totalQuestions: number
}

export type TestTypeCreationAttributes = Optional<
    TestTypeAttributes,
    'id' | 'source' | 'answering' | 'marks' | 'timingMinutes' | 'totalQuestions'
>

export interface TestTypeInstance
    extends Model<TestTypeAttributes, TestTypeCreationAttributes>,
        TestTypeAttributes {}

export const TestType = sequelize.define<TestTypeInstance>(
    'testType',
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        source: {
            type: DataTypes.TEXT,
        },
        answering: {
            type: DataTypes.TEXT,
        },
        marks: {
            type: DataTypes.STRING(100),
        },
        timingMinutes: {
            type: DataTypes.TINYINT.UNSIGNED,
        },
        totalQuestions: {
            type: DataTypes.TINYINT.UNSIGNED,
        },
    },
    { underscored: true, tableName: 'test_type', timestamps: false }
)

export default TestType
