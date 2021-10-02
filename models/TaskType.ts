import sequelize, {
    DataTypes,
    Deferrable,
    Model,
    Optional,
} from '../utils/sequelize'

export interface TaskTypeAttributes {
    id: string
    name: string
    format: string
    focus: string
    testTypeId: string
}

export type TaskTypeCreationAttributes = Optional<TaskTypeAttributes, 'id'>

export interface TaskTypeInstance
    extends Model<TaskTypeAttributes, TaskTypeCreationAttributes>,
        TaskTypeAttributes {}

export const TaskType = sequelize.define<TaskTypeInstance>(
    'taskType',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        format: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        focus: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        testTypeId: {
            type: DataTypes.INTEGER.UNSIGNED,

            allowNull: false,
            references: {
                model: 'TestType',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE(),
            },
        },
    },
    { underscored: true, tableName: 'task_type', timestamps: false }
)

export default TaskType
