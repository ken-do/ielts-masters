import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface AnswerAttributes {
    id: string
    shortText: string
    longText: string
    isCorrect: string
    questionId: string
}

export type AnswerCreationAttributes = Optional<
    AnswerAttributes,
    'id' | 'longText'
>

export interface AnswerInstance
    extends Model<AnswerAttributes, AnswerCreationAttributes>,
        AnswerAttributes {}

export const Answer = sequelize.define<AnswerInstance>(
    'answer',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        shortText: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        longText: {
            type: DataTypes.TEXT,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        questionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Question',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    {
        underscored: true,
        tableName: 'answer',
        timestamps: false,
    }
)
