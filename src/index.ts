///////////////////////////////////////////////////////////////
//
//github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md
//
///////////////////////////////////////////////////////////////

https: interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// An alternative meaning of in in typescript is in mapped type definition. You can read about them in the handbook or in the pull request. The in keyword is used there as part of the syntax to iterate over all the items in a union of keys.

//  K extends keyof T ->  constrain the type of a generic parameter.

type MyPick<T, K extends keyof T> = {
  [key in K]: T[K];
};
// title, completed, ... : Todo[title], Todo[completed]

// T = Todo
// K = title completed

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo04: TodoPreview = {
  title: "Clean room",
  completed: false,
};

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md
//
///////////////////////////////////////////////////////////////

interface Todo07 {
  title: string;
  description: string;
  price: number;
}

type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & // Property 'title' does not exist on type 'MyReadonly2<Todo07, keyof Todo07>'
  Readonly<Pick<T, K>>; // Cannot assign to 'title' because it is a read-only property

// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   readonly [P in K]: T[P];
// }
//  & {
//   [P in keyof T as Exclude<P, K>]: T[P];
// };

// T  interface Todo07
// K  title, description types

//   const todo07: MyReadonly2<Todo07, keyof Todo07> = {
const todo07: MyReadonly2<Todo07> = {
  title: "Hey",
  description: "foobar",
  price: 5,
};

// todo07.price = 'ds'
todo07.title = "df"; // Error: cannot reassign a readonly property
todo07.description = "barFoo"; // Error: cannot reassign a readonly property

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md
//
///////////////////////////////////////////////////////////////

type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> };

type Todo09 = DeepReadonly<X>; // should be same as `Expected`

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.md
//
///////////////////////////////////////////////////////////////

// A infer kulcsszó TypeScript-ben a feltételes típusokon belül használatos, hogy típusparaméterekhez kössön egy típust egy adott típusból. Lehetővé teszi a TypeScript számára, hogy egy adott kifejezésből automatikusan következtessen a típusra, és azt egy bonyolultabb típus definíciójában használja fel. Az infer mindig a feltételes típusokkal együtt használatos, az extends kulcsszóval együtt

type Arr = ["1", "2", "3"];

// export type TupleToUnion<T> = T extends (infer U)[] ? U : T;

// In TypeScript, T[number] refers to the type of an element within a collection or array - like structure represented by the generic type T.It essentially means "the type of any element that can be accessed by an index of type number in the collection represented by T"

type TupleToUnion<T extends unknown[]> = T[number];
// export type TupleToUnion2<T> = T extends Array<infer U> ? U : T;

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md
//
///////////////////////////////////////////////////////////////

declare const config: Chainable;

type Chainable<R = object> = {
  //   option(key: string, value: any): Chainable;
  //   option<K extends string, V>(key: K, value: V): Chainable<R & Record<K, V>>;
  //   option<K extends keyof any, V>(key: K extends keyof R ? never : K, value: V): Chainable<R & Record<K, V>>;
  //   option<K extends keyof any, V>(
  // key: K extends keyof R ? (V extends R[K] ? never : K) : K,
  // value: V
  //   ): Chainable<R & Record<K, V>>;
  option<K extends keyof any, V>(
    key: K extends keyof R ? (V extends R[K] ? never : K) : K,
    value: V
  ): Chainable<Omit<R, K> & Record<K, V>>;
  get(): R;
};

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md
//
///////////////////////////////////////////////////////////////

type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

// any is a placeholder for correct index in tuple
type Last<T extends any[]> = [any, ...T][T["length"]];
// type Last<T extends unknown[]> = T extends [...any, infer S] ? S : never
// Typescript will force you to assign an array of that length and with values that have the matching types.
// And when you index the array typescript will recognize the type of variable at that index.

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md
//
///////////////////////////////////////////////////////////////

type s_arr1 = ["a", "b", "c", "d"];
type s_arr2 = [3, 2, 1];

type Pop<T extends any[]> = T extends [...infer U, any] ? U : never;

type re1 = Pop<s_arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<s_arr2>; // expected to be [3, 2]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md
//
///////////////////////////////////////////////////////////////

interface Todo2 {
  title: string;
  description: string;
  completed: boolean;
}

type MyPick2<T, U extends keyof T> = {
  [key in U]: T[U];
};

type TodoPreview2 = MyPick2<Todo2, "title" | "completed">;

const todo: TodoPreview2 = {
  title: "Clean room",
  completed: false,
};

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md
//
///////////////////////////////////////////////////////////////

interface Todo3 {
  title: string;
  description: string;
}

type MyReadonly3<T> = {
  readonly [key in keyof T]: T[key];
};

const todo3: MyReadonly3<Todo3> = {
  title: "Hey",
  description: "foobar",
};

todo3.title = "Hello"; // Error: cannot reassign a readonly property
todo3.description = "barFoo"; // Error: cannot reassign a readonly property

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md
//
///////////////////////////////////////////////////////////////

type arr12 = ["a", "b", "c"];
type arr22 = [3, 2, 1];

type First2<T extends any[]> = T extends [] ? never : T[0];

type head1 = First2<arr12>; // expected to be 'a'
type head2 = First2<arr22>; // expected to be 3

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md
//
///////////////////////////////////////////////////////////////
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = ["FALCON 9", "FALCON HEAVY", "DRAGON", "STARSHIP", "HUMAN SPACEFLIGHT"];

type Length<T extends readonly any[]> = T["length"];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md
//
///////////////////////////////////////////////////////////////

type MyExclude3<T, U> = T extends U ? never : T;

type Result3 = MyExclude3<"a" | "b" | "c", "a">; // 'b' | 'c'
type Result4 = MyExclude3<"a" | "b" | "c", "b">; // 'a' | 'c'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md
//
///////////////////////////////////////////////////////////////
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;

type ExampleType = Promise<string>;

type Result5 = MyAwaited<ExampleType>; // string

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md
//
///////////////////////////////////////////////////////////////

type If<C extends boolean, T, F> = C extends true ? T : F;

type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md
//
///////////////////////////////////////////////////////////////

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type Result6 = Concat<[1], [2]>; // expected to be [1, 2]

// let vAny: any = 10;          // We can assign anything to any
// let vUnknown: unknown =  10; // We can assign anything to unknown just like any

// let s1: string = vAny;     // Any is assignable to anything
// let s2: string = vUnknown; // Invalid; we can't assign vUnknown to any other type (without an explicit assertion)

// vAny.method();     // Ok; anything goes with any
// vUnknown.method(); // Not ok; we don't know anything about this variable

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.md
//
///////////////////////////////////////////////////////////////

// we can use T[number] to refer to the type of that index signature
type Includes<T extends string[], U extends string> = {
  // So { foo: 'bar'; }['foo'] will refer to type 'bar'
  [P in T[number]]: true;
}[U] extends true
  ? true
  : false;
// extends true
//   ? true
//   : false;

type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
type isPillarMen2 = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Esidisi">; // expected to be `true`

/*
type isPillarMen = {
  Kars: true;
  Esidisi: true;
  Wamuu: true;
  Santana: true;
};
*/

type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type

type Str7 = Flatten<string[]>;

type Str8 = string;

// Leaves the type alone.
type Num7 = Flatten<number>;

type Num8 = number;

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md
//
///////////////////////////////////////////////////////////////

type Push03057<T extends number[], U extends string> = [...T, U];

type Result03057 = Push03057<[1, 2], "3">; // [1, 2, '3']

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.md
//
///////////////////////////////////////////////////////////////

type Unshift03060<T extends number[], U> = [U, ...T];

type Result03060 = Unshift03060<[1, 2], 0>; // [0, 1, 2]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.md
//
///////////////////////////////////////////////////////////////

const foo = (arg1: string, arg2: number): void => {};

type MyParameters<T extends (...args: any[]) => any> = T extends (...any_arg: infer S) => any ? S : any;

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/README.md
//
///////////////////////////////////////////////////////////////

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
  // ): Promise<{ [K in keyof T]: T[K]}>;
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/README.md
//
///////////////////////////////////////////////////////////////

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type LookUp<U, T extends string> = {
  [K in T]: U extends { type: T } ? U : never;
}[T];

type MyDogType = LookUp<Cat | Dog, "dog">; // expected to be `Dog`
