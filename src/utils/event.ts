import { ChangeEvent } from 'react';

export function evNumVal(fn: (nb: number) => void) {
    return ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        fn(Number(value));
    };
}

export function evStrVal(fn: (val: string) => void) {
    return ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        fn(value);
    };
}
