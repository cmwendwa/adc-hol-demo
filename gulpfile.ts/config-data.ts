
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'Contosoadcholdemo',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'contoso.adc-hol-demo',
            guid: 'd6fa3711-bbaf-4e17-848e-7685c5ad8ecb',
            list: [
                'src',
                'node_modules/@microsoft/windows-admin-center-sdk'
            ],
            enablePester: false,
            skipCim: true
        },
        test: {
            skip: true
        }
    };
}

exports.gulpConfig = gulpConfig;
