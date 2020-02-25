import { ComponentClass, JSXElementConstructor } from 'react';
import { inject as mobxInject, observer } from 'mobx-react';

import Store from 'store/Store';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface GlobalStoreInjected {
    store: Store;
}

type StoreMap<I> = (globalStore: Store) => I;

function inject<P extends I, I, C>(component: JSXElementConstructor<P> & C, storeMap: StoreMap<I>) {
    const observ = observer(component);
    const injected: any = mobxInject(({ store }: GlobalStoreInjected) => storeMap(store))(observ);

    type Props = JSX.LibraryManagedAttributes<C, Omit<P, keyof I>>;
    return injected as ComponentClass<Props> & { wrappedComponent: JSXElementConstructor<P> & C };
}

export default inject;
