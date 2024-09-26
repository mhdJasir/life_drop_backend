import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Json } from 'sequelize/types/utils';


interface TestAttributes {
    api: string;
    request: Json;
    response: Json;
    createdAt: string;
}

class TestModel extends Model<TestAttributes> implements TestAttributes {
    api!: string;
    request!: Json;
    response!: Json;
    createdAt!: string;

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
        createdAt: {
            type: DataTypes.STRING,
            get() {
              const utcDate = this.getDataValue('createdAt');
              return utcDate ? new Date(utcDate).toLocaleString() : null;
            }
        }
    },
    {
        sequelize,
        modelName: 'test_api',
    }
);

export { TestModel, TestAttributes };