import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface TestQuestionAttributes {
    id: string
    testId: string
    questionId: string
}

export type TestQuestionCreationAttributes = Optional<
    TestQuestionAttributes,
    'id'
>

export interface TestQuestionInstance
    extends Model<TestQuestionAttributes, TestQuestionCreationAttributes>,
        TestQuestionAttributes {}

export const TestQuestion = sequelize.define<TestQuestionInstance>(
    'testQuestion',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        testId: {
            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false,
            references: {
                model: 'Test',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
        questionId: {
            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false,
            references: {
                model: 'Question',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    { underscored: true, tableName: 'test_question', timestamps: false }
)

export default TestQuestion
