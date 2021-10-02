import sequelize, { DataTypes, Model, Optional } from '../utils/sequelize'

export interface UserAttributes {
    id: string
    email: string
    userName: string
    passwordHash: string
    description: string
}

export type UserCreationAttributes = Optional<
    UserAttributes,
    'id' | 'description'
>

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
    updatedAt: string
    createdAt: string
}

export const User = sequelize.define<UserInstance>(
    'user',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        userName: {
            type: DataTypes.STRING(32),

            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING(64),

            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
        },
    },
    {
        underscored: true,
        tableName: 'user',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

export default User
