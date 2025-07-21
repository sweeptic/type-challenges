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

//
type Flatten7<T> = T extends (infer U)[] ? U : T;

type StringArray = string[];
type NumberArray = number[];

type UnboxedString = Flatten7<StringArray>; // string U
type UnboxedNumber = Flatten7<NumberArray>; // number U
type NotAnArray = Flatten7<string>; // string T

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md
//
///////////////////////////////////////////////////////////////

type Space = " " | "\n" | "\t";
// type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S;
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S;

type trimmed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md
//
///////////////////////////////////////////////////////////////

type Trim2<S extends string> = S extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim2<R> : S;

type trimmed2 = Trim2<"  Hello World  ">; // expected to be 'Hello World'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00110-medium-capitalize/README.md
//
///////////////////////////////////////////////////////////////

type Capitalize2<S extends string> = S extends `${infer x}${infer tail}` ? `${Uppercase<x>}${tail}` : S;

type capitalized = Capitalize2<"hello world">; // expected to be 'Hello world'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/README.md
//
///////////////////////////////////////////////////////////////

type Replace<S extends string, From extends string, To extends string> = S extends `${infer V}${From}${infer R}`
  ? `${V}${To}${R}`
  : S;
// type Replace<S extends string, From extends string, To extends string> = From extends ""
//   ? S
//   : S extends `${infer V}${From}${infer R}`
//   ? `${V}${To}${R}`
//   : S;

type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00119-medium-replaceall/README.md
//
///////////////////////////////////////////////////////////////
type ReplaceAll<S extends string, From extends string, To extends string> = S extends `${infer R1}${From}${infer R2}`
  ? `${R1}${To}${ReplaceAll<R2, From, To>}`
  : S;

type replaced2 = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00191-medium-append-argument/README.md
//
///////////////////////////////////////////////////////////////

type Fn = (a: number, b: string) => number;

type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T ? (...args: [R, A]) => T : Fn;

type Result8 = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00296-medium-permutation/README.md
//
///////////////////////////////////////////////////////////////

type Permutation5<T, K = T> = [T] extends [never] ? [] : K extends K ? [K, ...Permutation5<Exclude<T, K>>] : never;

type perm = Permutation5<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00298-medium-length-of-string/README.md
//
///////////////////////////////////////////////////////////////

// Compute the length of a string literal, which behaves like String#length.

type LengthOfString<S extends string, T extends string[] = []> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T["length"];

type StringLength = LengthOfString<"foobar">;

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/README.md
//
///////////////////////////////////////////////////////////////

type Flatten12<S extends any[], T extends any[] = []> = S extends [infer X, ...infer Y]
  ? X extends any[]
    ? Flatten12<[...X, ...Y], T>
    : Flatten12<[...Y], [...T, X]>
  : T;

type flatten = Flatten12<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00527-medium-append-to-object/README.md
//
///////////////////////////////////////////////////////////////

type AppendToObject6<T, U extends keyof any, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};

type Test6 = { id: "1" };
type Result7 = AppendToObject6<Test6, "value", 4>; // expected to be { id: '1', value: 4 }

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00529-medium-absolute/README.md
//
///////////////////////////////////////////////////////////////

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`;

type Test3 = -100;
type Result9 = Absolute<Test3>; // expected to be "100"

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00531-medium-string-to-union/README.md
//
///////////////////////////////////////////////////////////////

type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}` ? Letter | StringToUnion<Rest> : never;

type Test10 = "123";
type Result10 = StringToUnion<Test10>; // expected to be "1" | "2" | "3"

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/00599-medium-merge/README.md
//
///////////////////////////////////////////////////////////////

type Merge11<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
};

type foo = {
  name: string;
  age: string;
};
type coo = {
  age: number;
  sex: string;
};

type Result11 = Merge11<foo, coo>; // expected to be {name: string, age: number, sex: string}

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type KebabCase<S extends string> = S extends `${infer S1}${infer S2}` // F ooBarBaz
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;

type FooBarBaz = KebabCase<"FooBarBaz">;
const foobarbaz: FooBarBaz = "foo-bar-baz";

type DoNothing = KebabCase<"do-nothing">;
const doNothing: DoNothing = "do-nothing";

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>;

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};

type result = Diff<Foo, Bar>; // "name" | "age"
type result2 = keyof (Foo | Bar); // "name" | "age"
type result3 = keyof (Foo & Bar); // "name" | "age" | "gender"

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type AnyOf<T extends any[]> = T[number] extends 0 | "" | false | [] | { [key: string]: never } ? false : true;

type Sample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type IsNever<T> = [T] extends [never] ? true : false;

type A1 = IsNever<never>; // expected to be true
type B1 = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false

type IsUnionImpl<T, C extends T = T> = (T extends T ? (C extends T ? true : unknown) : never) extends true
  ? false
  : true;

type IsUnion<T> = IsUnionImpl<T>;

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type NodeA = {
  type: "A";
  name: string;
  flag: number;
};

type NodeB = {
  type: "B";
  id: number;
  flag: number;
};

type NodeC = {
  type: "C";
  name: string;
  flag: number;
};

type Nodes = NodeA | NodeB | NodeC;

type ReplacedNodes = ReplaceKeys<Nodes, "name" | "flag", { name: number; flag: string }>; // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }>; // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never

type ReplaceKeys<U, T, Y> = { [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K] };

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type Foo6 = {
  [key: string]: any;
  foo(): void;
};

type A6 = RemoveIndexSignature<Foo6>; // expected { foo(): void }

// PropertyKey = string | number | symbol
type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K];
};
45;

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type PString1 = "";
type PString2 = "+85%";
type PString3 = "-85%";
type PString4 = "85%";
type PString5 = "85";

type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]

type CheckPrefix<T> = T extends "+" | "-" ? T : never;

type CheckSuffix<T> = T extends `${infer P}%` ? [P, "%"] : [T, ""];

type PercentageParser<A extends string> = A extends `${CheckPrefix<infer L>}${infer R}`
  ? [L, ...CheckSuffix<R>]
  : ["", ...CheckSuffix<A>];

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}` ? DropChar<`${L}${R}`, C> : S;

type Butterfly = DropChar<" b u t t e r f l y ! ", " ">; // 'butterfly!'

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type Pop6<T extends any[]> = T extends [...infer head, any] ? head : never;

type MinusOne<T extends number, A extends any[] = []> = A["length"] extends T
  ? Pop6<A>["length"]
  : MinusOne<T, [...A, 0]>;

type Zero = MinusOne<1>; // 0
type FiftyFour = MinusOne<55>; // 54

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: U;
};

type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false;

type a = StartsWith<"abc", "ac">; // expected to be false
type b = StartsWith<"abc", "ab">; // expected to be true
type c = StartsWith<"abc", "abcd">; // expected to be false

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false;

type a2 = EndsWith<"abc", "bc">; // expected to be true
type b2 = EndsWith<"abc", "abc">; // expected to be true
type c2 = EndsWith<"abc", "d">; // expected to be false

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

interface User {
  name: string;
  age: number;
  address: string;
}

type UserPartialName = PartialByKeys<User, "name">; // { name?:string; age:number; address:string }

type IntersectionToObj<T> = {
  [K in keyof T]: T[K];
};
// as any tells the compiler to consider the typed object as a plain untyped JavaScript object.
type PartialByKeys<T, K = any> = IntersectionToObj<{
  //
  //  name?: string | undefined;
  [P in keyof T as P extends K ? P : never]?: T[P];
}> & {
  [P in Exclude<keyof T, K>]: T[P];
};

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/02759-medium-requiredbykeys/README.md
//
///////////////////////////////////////////////////////////////

interface UserReq {
  name?: string;
  age?: number;
  address?: string;
}
//  userReq, name                                 // age?, address?  & name: string;
type RequiredByKeys<T, K extends keyof T = keyof T, O = Omit<T, K> & { [P in K]-?: T[P] }> = { [P in keyof O]: O[P] };

type UserRequiredName = RequiredByKeys<UserReq, "name">; // { name: string; age?: number; address?: string }

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/02793-medium-mutable/README.md
//
///////////////////////////////////////////////////////////////

interface TodoM {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}

type Mutable<T> = { -readonly [K in keyof T]: T[K] };

type MutableTodo = Mutable<TodoM>; // { title: string; description: string; completed: boolean; }

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/02852-medium-omitbytype/README.md
//
///////////////////////////////////////////////////////////////

type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

type OmitBoolean = OmitByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { name: string; count: number }

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/02946-medium-objectentries/README.md
//
///////////////////////////////////////////////////////////////

type ObjectEntries<T> = {
  [K in keyof T]-?: [K, T[K]];
}[keyof T];

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03062-medium-shift/README.md
//
///////////////////////////////////////////////////////////////

type Shift<T extends any[]> = T extends [any, ...infer U] ? U : never;

type ResultShift = Shift<[3, 2, 1]>; // [2, 1]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03188-medium-tuple-to-nested-object/README.md
//
///////////////////////////////////////////////////////////////

type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
  ? {
      [K in F & string]: TupleToNestedObject<R, U>;
    }
  : U;

type aT = TupleToNestedObject<["a"], string>; // {a: string}
type bT = TupleToNestedObject<["a", "b"], number>; // {a: {b: number}}
type cT = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type
type xT = TupleToNestedObject<["a", "b", "c"], number>; // {a: {b: number}}

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md
//
///////////////////////////////////////////////////////////////

type Reverse<T extends any[]> = T extends [infer F, ...infer Rest] ? [...Reverse<Rest>, F] : T;

type aR = Reverse<["a", "b"]>; // ['b', 'a']
type bR = Reverse<["a", "b", "c"]>; // ['c', 'b', 'a']

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03196-medium-flip-arguments/README.md
//
///////////////////////////////////////////////////////////////

type Reverse4<T extends unknown[]> = T extends [infer F, ...infer R] ? [...Reverse4<R>, F] : [];

type FlipArguments<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer U
  ? (...args: Reverse4<P>) => U
  : never;

type Flipped96 = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>;
// (arg0: boolean, arg1: number, arg2: string) => void

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03243-medium-flattendepth/README.md
//
///////////////////////////////////////////////////////////////

type FlattenDepth<T extends any[], S extends number = 1, U extends any[] = []> = U["length"] extends S
  ? T
  : T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...FlattenDepth<F, S, [...U, 1]>, ...FlattenDepth<R, S, U>]
    : [F, ...FlattenDepth<R, S, U>]
  : T;

type af = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>; // [1, 2, 3, 4, [5]]. flattern 2 times
type bf = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03243-medium-flattendepth/README.md
//
///////////////////////////////////////////////////////////////

type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E extends []
  ? ""
  : `__${E[number]}`}${M extends [] ? "" : `--${M[number]}`}`;

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/03376-medium-inordertraversal/README.md
//
///////////////////////////////////////////////////////////////

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type InorderTraversal<T extends TreeNode | null, NT extends TreeNode = NonNullable<T>> = T extends null
  ? []
  : [...InorderTraversal<NT["left"]>, NT["val"], ...InorderTraversal<NT["right"]>];

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

type A5 = InorderTraversal<typeof tree1>; // [1, 3, 2]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04179-medium-flip/README.md
//
///////////////////////////////////////////////////////////////

// 答案
type Flip<T extends Record<string, string | number | boolean>> = {
  [P in keyof T as `${T[P]}`]: P;
};

type f6 = Flip<{ a: "x"; b: "y"; c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
type f7 = Flip<{ a: 1; b: 2; c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
type f8 = Flip<{ a: false; b: true }>; // {false: 'a', true: 'b'}

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04182-medium-fibonacci-sequence/README.md
//
///////////////////////////////////////////////////////////////

type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = CurrentIndex["length"] extends T
  ? Current["length"]
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>;

type Result1 = Fibonacci<3>; // 2
type Result2 = Fibonacci<8>; // 21

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04260-medium-nomiwase/README.md
//
///////////////////////////////////////////////////////////////

type String2Union<S extends string> = S extends `${infer C}${infer REST}` ? C | String2Union<REST> : never;

type AllCombinations<STR extends string, S extends string = String2Union<STR>> = [S] extends [never]
  ? ""
  : "" | { [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}` }[S];

type AllCombinations_ABC = AllCombinations<"ABC">;

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md
//
///////////////////////////////////////////////////////////////

type ArrayWithLength<T extends number, U extends any[] = []> = U["length"] extends T
  ? U
  : ArrayWithLength<T, [true, ...U]>;

type GreaterThan<T extends number, U extends number> = ArrayWithLength<U> extends [...ArrayWithLength<T>, ...infer _]
  ? false
  : true;

type g1 = GreaterThan<2, 1>; //should be true
type g2 = GreaterThan<1, 1>; //should be false
type g3 = GreaterThan<10, 100>; //should be false
type g4 = GreaterThan<111, 11>; //should be true

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04471-medium-zip/README.md
//
///////////////////////////////////////////////////////////////

type Zip<A extends any[], B extends any[], L extends any[] = []> = L["length"] extends A["length"] | B["length"]
  ? L
  : Zip<A, B, [...L, [A[L["length"]], B[L["length"]]]]>;

type exp = Zip<[1, 2], [true, false]>; // expected to be [[1, true], [2, false]]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md
//
///////////////////////////////////////////////////////////////

type IsTuple<T> = T extends readonly any[] ? (number extends T["length"] ? false : true) : false;

type case11 = IsTuple<[number]>; // true
type case21 = IsTuple<readonly [number]>; // true
type case31 = IsTuple<number[]>; // false

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04499-medium-chunk/README.md
//
///////////////////////////////////////////////////////////////

type Chunk<T extends any[], N extends number, Swap extends any[] = []> = Swap["length"] extends N
  ? [Swap, ...Chunk<T, N>]
  : T extends [infer K, ...infer L]
  ? Chunk<L, N, [...Swap, K]>
  : Swap extends []
  ? Swap
  : [Swap];

type exp1 = Chunk<[1, 2, 3], 2>; // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4>; // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1>; // expected to be [[1], [2], [3]]

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04518-medium-fill/README.md
//
///////////////////////////////////////////////////////////////

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Count extends any[] = [],
  Flag extends boolean = Count["length"] extends Start ? true : false
> = Count["length"] extends End
  ? T
  : T extends [infer R, ...infer U]
  ? Flag extends false
    ? [R, ...Fill<U, N, Start, End, [...Count, 0]>]
    : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>]
  : T;

type expf1 = Fill<[1, 2, 3], 54>; // expected to be [0, 0, 0]

interface AnimalCanWalk {
  walk(): void;
}

interface AnimalCanFly {
  fly(): void;
}

interface a22 extends AnimalCanFly, AnimalCanWalk {}

class a_1 {}
class a_2 {}
class a_3 {}

class derived extends a_1 {}

class multiple_derived extends derived {}


///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/04803-medium-trim-right/README.md
//
///////////////////////////////////////////////////////////////
// 
type TrimRight<S extends string> = S extends `${infer Left}${" " | "\n" | "\t"}` ? TrimRight<Left> : S;

type Trimmed = TrimRight<'   Hello World    '> // expected to be '   Hello World'


///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/05117-medium-without/README.md
//
///////////////////////////////////////////////////////////////

type Without<T, U> = T extends [infer R, ...infer F] ? (R extends U ? Without<F, U> : [R, ...Without<F, U>]) : T;

type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []


///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/05140-medium-trunc/README.md
//
///////////////////////////////////////////////////////////////


type Trunc<T extends number | string> = `${T}` extends `${infer N}.${any}` ? N : `${T}`;

type A58 = Trunc<12.34> // 12



///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md
//
///////////////////////////////////////////////////////////////



type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/05310-medium-join/README.md
//
///////////////////////////////////////////////////////////////



type Join<T extends any[], U extends string | number> = T extends [infer F, ...infer R]
  ? R["length"] extends 0
    ? `${F & string}`
    : `${F & string}${U}${Join<R, U>}`
  : never;


type Res67 = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
type Res167 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
type Res267 = Join<["2", "2", "2"], 1>; // expected to be '21212'
type Res367 = Join<["o"], "u">; // expected to be 'o'

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/05317-medium-lastindexof/README.md
//
///////////////////////////////////////////////////////////////


type LastIndexOf<T extends any[], U> = T extends [...infer I, infer L]
  ? L extends U
    ? I["length"]
    : LastIndexOf<I, U>
  : -1;

type Res189 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res289 = LastIndexOf<[0, 0, 0], 2> // -1

///////////////////////////////////////////////////////////////
//
//https://github.com/type-challenges/type-challenges/blob/main/questions/05360-medium-unique/README.md
//
///////////////////////////////////////////////////////////////



type Res34 = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
type Res134 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res234 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
type Res334 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
type Res434 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]

///////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////

