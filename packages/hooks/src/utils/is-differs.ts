export type Primitive = string | number | boolean | symbol;
export type Nil = null | undefined;
export type Primitives = Primitive[];
export type Dependency = Primitive | Nil;
export type Dependencies = Dependency[];

const isDiffers = (
  source: Dependency | Dependencies,
  target: Dependency | Dependencies
) => {
  return (
    !(source as Primitive) ||
    !(target as Primitive) ||
    (source as Primitives).some(
      (dependency, index) => dependency !== (target as Primitives)[index]
    )
  );
};
export default isDiffers;
