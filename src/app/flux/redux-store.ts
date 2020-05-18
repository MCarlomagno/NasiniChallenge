export abstract class ReduxStore {

    static initialized = false;

    constructor(private store) {
        if (!store) {
            throw new Error('Redux store indefinido');
        }
        if (ReduxStore.initialized) {
            throw new Error('Redux store ya se encuetra inicializado');
        }
        ReduxStore.initialized = true;
    }

    getState() {
        return this.store.getState();
    }

    dispatch(action) {
        return this.store.dispatch(action);
    }

    subscribe(listener) {
        return this.store.subscribe(() => listener(this.getState()));
    }

}
