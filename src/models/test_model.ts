import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Json } from 'sequelize/types/utils';
import getNow from '../config/timezone';


interface TestAttributes {
    api: string;
    request: Json;
    response: Json;
    dateTime?: string;
}

class TestModel extends Model<TestAttributes> implements TestAttributes {
    api!: string;
    request!: Json;
    response!: Json;
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
        response: {
            type: DataTypes.JSON,
        },
        dateTime: {
            type: DataTypes.STRING,
            get() {
              return getNow();
            }
        }
    },
    {
        sequelize,
        modelName: 'test_api',
    }
);

export { TestModel, TestAttributes };