import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface UserTestAttributes {
    id: string
    totalCorrectAnswers: number
    testId: string
    userId: string
}

export type UserTestCreationAttributes = Optional<
    UserTestAttributes,
    'id' | 'totalCorrectAnswers'
>

export interface UserTestInstance
    extends Model<UserTestAttributes, UserTestCreationAttributes>,
        UserTestAttributes {}

export const UserTest = sequelize.define<UserTestInstance>(
    'userTest',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        totalCorrectAnswers: {
            type: DataTypes.TINYINT,
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
        tableName: 'user_test',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

export default UserTest
