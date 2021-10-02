import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface ParagraphAttributes {
    id: string
    number: number
    text: string
    textVn: string
    articleId: string
}

export type ParagraphCreationAttributes = Optional<
    ParagraphAttributes,
    'id' | 'textVn'
>

export interface ParagraphInstance
    extends Model<ParagraphAttributes, ParagraphCreationAttributes>,
        ParagraphAttributes {}

export const Paragraph = sequelize.define<ParagraphInstance>(
    'paragraph',
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
            allowNull: false,
        },
        textVn: {
            type: DataTypes.TEXT,
        },
        articleId: {
            type: DataTypes.UUID,

            allowNull: false,
            references: {
                model: 'Article',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    { underscored: true, tableName: 'paragraph', timestamps: false }
)

export default Paragraph
