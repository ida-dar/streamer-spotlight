export type ActionWithPayload<T, P> = {
  error?: any;
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

/* generic action */
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
