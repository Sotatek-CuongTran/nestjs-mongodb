import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { mongoDatabaseConfig } from 'src/configs/mongo.config';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {

  createMongooseOptions(): MongooseModuleOptions {
    const uri = `mongodb://${mongoDatabaseConfig.host}:${mongoDatabaseConfig.port}`;

    /* istanbul ignore next */
    if (mongoDatabaseConfig.env !== 'production') {
      mongoose.set('debug', mongoDatabaseConfig.debug);
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      // useMongoClient: true
    };

    /* istanbul ignore next */
    if (mongoDatabaseConfig.user && mongoDatabaseConfig.password) {
      mongooseOptions.auth = {
        username: mongoDatabaseConfig.user,
        password: mongoDatabaseConfig.password,
      };
    }

    if (mongoDatabaseConfig.database) {
      mongooseOptions.dbName = mongoDatabaseConfig.database;
    }

    console.log('\x1b[36m%s\x1b[0m', 'mongooseOptions', mongooseOptions);
    return mongooseOptions;
  }
}
