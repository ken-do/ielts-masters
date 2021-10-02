import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface PostAttributes {
    id: string
    title: string
    heroUrl: string
    excerpt: string
    content: string
    categoryId: string
    authorId: string
}

export type PostCreationAttributes = Optional<PostAttributes, 'id'>

export interface PostInstance
    extends Model<PostAttributes, PostCreationAttributes>,
        PostAttributes {
    updatedAt: string
    createdAt: string
}

export const Post = sequelize.define<PostInstance>(
    'post',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        heroUrl: {
            type: DataTypes.STRING,
        },
        excerpt: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id', //
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    {
        underscored: true,
        tableName: 'post',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

export default Post
