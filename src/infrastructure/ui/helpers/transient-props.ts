import { KeyPrefix } from "~/typescript";

export type TransientProps<T> = KeyPrefix<T, "$">;
