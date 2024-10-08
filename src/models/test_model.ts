import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Json } from 'sequelize/types/utils';
import getNow from '../config/timezone';


interface TestAttributes {
    api: string;
    request: Json;
    dateTime?: string;
}

class TestModel extends Model<TestAttributes> implements TestAttributes {
    api!: string;
    request!: Json;
    dateTime!: string;

    static associate(models: any) {

    }
}

TestModel.init(
    {
        api: {
            type: DataTypes.STRING,
        },
        request: {
            type: DataTypes.JSON,
        },
        dateTime: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'test_api',
    }
);

TestModel.beforeCreate((instance: TestAttributes) => {
    instance.dateTime = getNow(); 
});

export { TestModel, TestAttributes };