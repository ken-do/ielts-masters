import sequelize, {
    DataTypes,
    Deferrable,
    HasManyGetAssociationsMixin,
    Model,
    Optional,
} from '../utils/sequelize'
import { AnswerInstance } from './Answer'

export interface QuestionAttributes {
    id: string
    number: number
    text: string
    description: string
    relatedQuestionId: string
    paragraphId: string
    taskTypeId: string
}

export type QuestionCreationAttributes = Optional<
    QuestionAttributes,
    'id' | 'text' | 'description' | 'relatedQuestionId'
>

export interface QuestionInstance
    extends Model<QuestionAttributes, QuestionCreationAttributes>,
        QuestionAttributes {
    getAnswers: HasManyGetAssociationsMixin<AnswerInstance>
}

export const Question = sequelize.define<QuestionInstance>(
    'question',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        number: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        relatedQuestionId: {
            type: DataTypes.INTEGER.UNSIGNED,

            references: {
                model: 'Question',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
        paragraphId: {
            type: DataTypes.UUID,

            allowNull: false,
            references: {
                model: 'Paragraph',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
        taskTypeId: {
            type: DataTypes.UUID,

            allowNull: false,
            references: {
                model: 'TaskType',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    { underscored: true, tableName: 'question', timestamps: false }
)

export default Question
