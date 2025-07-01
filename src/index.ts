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
