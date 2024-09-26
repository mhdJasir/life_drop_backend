import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';


interface TestAttributes {
    data: string;
}

class TestModel extends Model<TestAttributes> implements TestAttributes {
    data!: string;

    static associate(models: any) {

    }
}

TestModel.init(
    {
        data: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'test_api',
    }
);

export { TestModel, TestAttributes };