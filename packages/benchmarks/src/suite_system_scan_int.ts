import { setupDuckDBSync, setupDuckDBAsync, setupSqljs, writeReport } from './setup';
import {
    SystemBenchmarkContext,
    SystemBenchmark,
    SqljsIntegerScanBenchmark,
    ArqueroIntegerScanBenchmark,
    LovefieldIntegerScanBenchmark,
    DuckDBAsyncIntegerScanBenchmark,
    DuckDBSyncIntegerScanBenchmark,
} from './system';
import { runSystemBenchmarks } from './suite';
import * as path from 'path';

async function main() {
    const baseDir = path.resolve(__dirname, '../../../');
    const duckdbSync = await setupDuckDBSync();
    const duckdbAsync = await setupDuckDBAsync();
    const sqljsDB = await setupSqljs();
    const suite: SystemBenchmark[] = [
        new ArqueroIntegerScanBenchmark(1000),
        new ArqueroIntegerScanBenchmark(10000),
        new ArqueroIntegerScanBenchmark(100000),
        new ArqueroIntegerScanBenchmark(1000000),
        new LovefieldIntegerScanBenchmark(1000),
        new LovefieldIntegerScanBenchmark(10000),
        new LovefieldIntegerScanBenchmark(100000),
        new LovefieldIntegerScanBenchmark(1000000),
        new SqljsIntegerScanBenchmark(sqljsDB, 1000),
        new SqljsIntegerScanBenchmark(sqljsDB, 10000),
        new SqljsIntegerScanBenchmark(sqljsDB, 100000),
        new SqljsIntegerScanBenchmark(sqljsDB, 1000000),
        new DuckDBSyncIntegerScanBenchmark(duckdbSync, 1000),
        new DuckDBSyncIntegerScanBenchmark(duckdbSync, 10000),
        new DuckDBSyncIntegerScanBenchmark(duckdbSync, 100000),
        new DuckDBSyncIntegerScanBenchmark(duckdbSync, 1000000),
        new DuckDBAsyncIntegerScanBenchmark(duckdbAsync, 1000),
        new DuckDBAsyncIntegerScanBenchmark(duckdbAsync, 10000),
        new DuckDBAsyncIntegerScanBenchmark(duckdbAsync, 100000),
        new DuckDBAsyncIntegerScanBenchmark(duckdbAsync, 1000000),
    ];
    const ctx: SystemBenchmarkContext = {
        projectRootPath: baseDir,
        seed: Math.random(),
    };
    const results = await runSystemBenchmarks(ctx, suite);
    console.log(results);
    await duckdbAsync.terminate();
    await writeReport(results, './benchmark_system_scan_int.json');
}

main();
