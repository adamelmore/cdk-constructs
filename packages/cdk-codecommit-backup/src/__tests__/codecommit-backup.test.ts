import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { Schedule } from '@aws-cdk/aws-events';
import { CodecommitBackup } from '../codecommit-backup';
import { BackupBucket } from '../backup-bucket';

test('default setup', (): void => {
    const stack = new Stack();

    const backupBucket = new BackupBucket(stack, 'BackupBucket');

    // The following example runs a task every day at 4am
    new CodecommitBackup(stack, 'CodecommitBackup', {
        backupBucket,
        schedule: Schedule.cron({ minute: '0', hour: '4' }),
    });

    expect(stack).toMatchCdkSnapshot();
});

test('repositories', (): void => {
    const stack = new Stack();

    const backupBucket = new BackupBucket(stack, 'BackupBucket');

    // The following example runs a task every day at 4am
    new CodecommitBackup(stack, 'CodecommitBackup', {
        backupBucket,
        schedule: Schedule.cron({ minute: '0', hour: '4' }),
        repositoryNames: ['repo1', 'repo2'],
    });

    expect(stack).toMatchCdkSnapshot();
});
