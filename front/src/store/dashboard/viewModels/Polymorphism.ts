import { serialize, update, PropSchema, custom } from 'serializr';

export class Polymorphism {
    private static sClasses = new Map<string, any>();

    public static register(name: string, clazz: any) {
        Polymorphism.sClasses.set(name, clazz);
    }

    /**
     * Return schema for an Array<TBase> which de-/serializes each item with its class
     * 	https://github.com/mobxjs/serializr/issues/65
     *
     * Examples usage:
     * var schema: ModelSchema<AnimalArray> = createSimpleSchema<AnimalArray>({
     * 		data: Polymorphism.arrayPropSchema<Animal>()
     * 	});
     * 	setDefaultModelSchema(AnimalArray, schema);
     */
    public static arrayPropSchema(): PropSchema {
        return custom(
            arr => arr.map((item: any) => item.serialize()),
            jsonValue => {
                const arr: any[] = [];
                jsonValue.forEach((itemWithClass: any) => {
                    const clazz = Object.keys(itemWithClass)[0];
                    const state = itemWithClass[clazz];

                    const emptyObj = Polymorphism.createInstance(clazz);
                    // now deserialize into empty obj
                    update(emptyObj, state);
                    arr.push(emptyObj);
                });
                return arr;
            }
        );
    }

    /**
     * Return class with this name.
     * Note: it can only return classed that have the @polymorph decorator
     *
     * @param classname
     */
    // private static getClazz(classname: string): any {
    // 	if (Polymorphism.s_classes.has(classname)) {
    // 		return Polymorphism.s_classes.get(classname);
    // 	}
    // 	else {
    // 		console.error("class not found: " + classname);
    // 		return null;
    // 	}
    // }

    /**
     * Return new instance of this class
     *
     * NOTE: it can only return classed that have the @polymorph decorator
     *       AND the class is loaded otherwise the decorator is not executed.
     *
     * @param classname
     */
    public static createInstance(classname: string): any {
        if (Polymorphism.sClasses.has(classname)) {
            const clazz = Polymorphism.sClasses.get(classname);
            return new clazz.prototype.constructor();
        }

        console.error(`class not found: ${classname}`);
        return null;
    }
}

/**
 *  @polymorph class decorator
 *
 * Has the effect that its class is registred in s_classes.
 * It can be dynamically instantiated via Polymorphism.
 *
 * @param clazz this is the class that has this decorator
 */
export function polymorph<TFunction extends Function>(clazz: TFunction): TFunction {
    Polymorphism.register(clazz.name, clazz);

    Object.defineProperty(clazz.prototype, 'serialize', {
        value() {
            const res: any = {
                [clazz.name]: serialize(this),
            };
            return res;
        },
    });

    return clazz;
}

/**
 *  @polymorph class decorator
 *
 * Has the effect that its class is registred in s_classes with its classname and its alias.
 * It can be dynamically instantiated via Polymorphism.
 *
 * @param clazz this is the class that has this decorator
 */
export function polymorphAlias(
    alias: string
): <TFunction extends Function>(clazz: TFunction) => TFunction {
    return <TFunction extends Function>(clazz: TFunction) => {
        Polymorphism.register(alias, clazz);
        Polymorphism.register(clazz.name, clazz);

        Object.defineProperty(clazz.prototype, '_alias', {
            value: alias,
            writable: false,
            enumerable: true,
            configurable: true,
        });

        Object.defineProperty(clazz.prototype, 'serialize', {
            value() {
                const res: any = {
                    [alias]: serialize(this),
                };
                return res;
            },
        });

        return clazz;
    };
}

/**
 *  Use together with @serializable decorator:
 *
 * Example
 * @serializable(polymorphArray(Animal)) private data: Array<Animal>;
 *
 * The items of an array with this decorator are de-/serialized with its class
 * https://github.com/mobxjs/serializr/issues/65
 *
 * @param clazz this is the common base class of an item in the array
 */
export function polymorphArray(): PropSchema {
    const propSchema: PropSchema = Polymorphism.arrayPropSchema();
    return propSchema;
}
