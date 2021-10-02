import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface TestArticleAttributes {
    id: string
    testId: string
    articleId: string
}

export type TestArticleCreationAttributes = Optional<
    TestArticleAttributes,
    'id'
>

export interface TestArticleInstance
    extends Model<TestArticleAttributes, TestArticleCreationAttributes>,
        TestArticleAttributes {}

export const TestArticle = sequelize.define<TestArticleInstance>(
    'testArticle',
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
        articleId: {
            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false,
            references: {
                model: 'Article',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    { underscored: true, tableName: 'test_article', timestamps: false }
)

export default TestArticle
