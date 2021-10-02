import sequelize, {
    BelongsToManyGetAssociationsMixin,
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'
import { ArticleInstance } from './Article'
import { QuestionInstance } from './Question'

export interface TestAttributes {
    id: string
    title: string
    testTypeId: string
    testModeId: string
}

export type TestCreationAttributes = Optional<TestAttributes, 'id'>

export interface TestInstance
    extends Model<TestAttributes, TestCreationAttributes>,
        TestAttributes {
    getQuestions: BelongsToManyGetAssociationsMixin<QuestionInstance>
    getArticles: BelongsToManyGetAssociationsMixin<ArticleInstance>
    updatedAt: string
    createdAt: string
}

export const Test = sequelize.define<TestInstance>(
    'test',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        testTypeId: {
            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false,
        },
        testModeId: {
            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false,
            references: {
                model: 'TestMode',
                key: 'id', //
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    {
        underscored: true,
        tableName: 'test',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

export default Test
