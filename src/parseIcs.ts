import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { handleObject } from './ical';

if (isMainThread) {
    module.exports = function parseLines(lines: string | any[], limit: number, ctx?: { type?: any; params?: any; } | undefined, stack?: never[], lastIndex?: number) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: { lines, limit, ctx, stack, lastIndex }
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    };
} else {
    let lines: string | any[] = workerData.lines
    let limit: number = workerData.limit
    let ctx: { type?: any; params?: any; } | undefined = workerData.ctx
    let stack: never[] = workerData.stack
    let lastIndex: number = workerData.lastIndex

    ctx = ctx || {};
    stack = stack || [];

    let limitCounter = 0;

    let i = lastIndex || 0;
    for (let ii = lines.length; i < ii; i++) {
        let l = lines[i];
        // Unfold : RFC#3.1
        while (lines[i + 1] && /[ \t]/.test(lines[i + 1][0])) {
            l += lines[i + 1].slice(1);
            i++;
        }

        // Remove any double quotes in any tzid statement// except around (utc+hh:mm
        if (l.includes('TZID=') && !l.includes('"(')) {
            l = l.replace(/"/g, '');
        }

        const exp = /^([\w\d-]+)((?:;[\w\d-]+=(?:(?:"[^"]*")|[^":;]+))*):(.*)$/;
        let kv = l.match(exp);

        if (kv === null) {
            // Invalid line - must have k&v
            continue;
        }

        kv = kv.slice(1);

        const value = kv[kv.length - 1];
        const name = kv[0];
        const parameters = kv[1] ? kv[1].split(';').slice(1) : [];

        ctx = handleObject(name, value, parameters, ctx, stack, l) || {};
        if (++limitCounter > limit) {
            break;
        }
    }

    if (i >= lines.length) {
        // Type and params are added to the list of items, get rid of them.
        delete ctx?.type;
        delete ctx?.params;
    }



    parentPort?.postMessage(ctx);
}