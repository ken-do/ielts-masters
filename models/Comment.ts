import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface CommentAttributes {
    id: string
    text: string
    testId: string
    userId: string
}

export type CommentCreationAttributes = Optional<CommentAttributes, 'id'>

export interface CommentInstance
    extends Model<CommentAttributes, CommentCreationAttributes>,
        CommentAttributes {
    updatedAt: string
    createdAt: string
}

export const Comment = sequelize.define<CommentInstance>(
    'comment',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    {
        underscored: true,
        tableName: 'comment',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)
