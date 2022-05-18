import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as config from 'config';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  private readonly host: string;
  private readonly database: string;
  private readonly user: string;
  private readonly password: string;
  private readonly debug: boolean;
  private readonly port: string;
  private readonly env: string;

  constructor() {
    this.env = config.get<string>('app.node_env');
    this.host = config.get<string>('database.host');
    this.port = config.get<string>('database.port');
    this.database = config.get<string>('database.database');
    this.user = config.get<string>('database.username');
    this.password = config.get<string>('database.password');
    this.debug = config.get<boolean>('database.logging');

    /* istanbul ignore next */
    // this.options = config.get<string>('database.options') ? `?${config.get<string>('database.options')}` : '';
  }

  createMongooseOptions(): MongooseModuleOptions {
    const uri = `mongodb://${this.host}:${this.port}`;

    /* istanbul ignore next */
    if (this.env !== 'production') {
      mongoose.set('debug', this.debug);
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      // useMongoClient: true
    };

    /* istanbul ignore next */
    if (this.user && this.password) {
      mongooseOptions.auth = {
        username: this.user,
        password: this.password,
      };
    }

    if (this.database) {
      mongooseOptions.dbName = this.database;
    }

    console.log('\x1b[36m%s\x1b[0m', 'mongooseOptions', mongooseOptions);
    return mongooseOptions;
  }
}
