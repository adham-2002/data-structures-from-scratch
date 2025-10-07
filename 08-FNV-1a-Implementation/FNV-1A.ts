// Type definition for input: can be a string, byte array, or array of numbers
export type Input = string | Uint8Array | number[];

// FNV-1a 32-bit constants
// Offset basis: initial hash value for FNV-1a (specified in the FNV algorithm)
// Using >>> 0 converts it to an unsigned 32-bit integer
const FNV1A_32_OFFSET = 0x811c9dc5 >>> 0; // 2166136261 in decimal

// Prime multiplier: used in each iteration of the hash calculation
// This specific prime number provides good distribution properties
const FNV1A_32_PRIME = 0x01000193 >>> 0; // 16777619 in decimal

// FNV-1a 64-bit constants (using BigInt for 64-bit precision)
// Offset basis for 64-bit version (14695981039346656037 in decimal)
const FNV1A_64_OFFSET = 0xcbf29ce484222325n;

// Prime multiplier for 64-bit version (1099511628211 in decimal)
const FNV1A_64_PRIME = 0x100000001b3n;

/**
 * Converts different input types to a Uint8Array (byte array)
 * Step 1: Check the input type
 * Step 2: Convert to bytes based on the type
 */
function toBytes(input: Input): Uint8Array {
  // If input is a string, convert it to UTF-8 encoded bytes
  if (typeof input === "string") {
    // TextEncoder().encode() converts string to UTF-8 byte array
    // Example: "hello" → [104, 101, 108, 108, 111]
    return new TextEncoder().encode(input);
  }

  // If input is already a Uint8Array, return it as-is
  if (input instanceof Uint8Array) return input;

  // If input is a number array, convert it to Uint8Array
  // Example: [72, 101, 108, 108, 111] → Uint8Array([72, 101, 108, 108, 111])
  return new Uint8Array(input);
}

/**
 * Compute FNV-1a 32-bit hash.
 * Returns an unsigned 32-bit number by default or a hex string if `asHex` is true.
 *
 * Algorithm steps:
 * 1. Start with an offset basis (initial hash value)
 * 2. For each byte in the input:
 *    a. XOR the hash with the byte
 *    b. Multiply the hash by the FNV prime number
 * 3. Return the final hash value
 */
// Function overloads for TypeScript type safety
export function fnv1a32(
  input: Input,
  opts?: { asHex?: false; seed?: number }
): number;
export function fnv1a32(
  input: Input,
  opts?: { asHex: true; seed?: number }
): string;
export function fnv1a32(
  input: Input,
  opts: { asHex?: boolean; seed?: number } = {}
) {
  // Step 1: Convert input to byte array
  const bytes = toBytes(input);

  // Step 2: Initialize hash with offset basis (or custom seed if provided)
  // If a seed is provided, use it; otherwise use the default FNV offset
  // >>> 0 ensures the value is an unsigned 32-bit integer
  let hash =
    (typeof opts.seed === "number" ? opts.seed >>> 0 : FNV1A_32_OFFSET) >>> 0;

  // Step 3: Process each byte in the input
  for (let i = 0; i < bytes.length; i++) {
    // Step 3a: XOR (exclusive OR) the current hash with the byte value
    // This mixes the byte into the hash
    hash ^= bytes[i];

    // Step 3b: Multiply the hash by the FNV prime number
    // Math.imul() performs 32-bit integer multiplication
    // >>> 0 ensures the result stays as an unsigned 32-bit integer
    hash = Math.imul(hash, FNV1A_32_PRIME) >>> 0;
  }

  // Step 4: Return the result in the requested format
  if (opts.asHex) {
    // Convert to hexadecimal string with 8 characters (padded with zeros)
    // Example: 1335831723 → "4f9f2cab"
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  // Return as unsigned 32-bit number
  return hash >>> 0;
}

/**
 * Compute FNV-1a 64-bit hash. Returns a BigInt by default or a hex string if `asHex` is true.
 *
 * Algorithm steps (same as 32-bit, but using 64-bit BigInt):
 * 1. Start with a 64-bit offset basis
 * 2. For each byte in the input:
 *    a. XOR the hash with the byte
 *    b. Multiply the hash by the FNV 64-bit prime
 * 3. Return the final hash value
 */
// Function overloads for TypeScript type safety
export function fnv1a64(
  input: Input,
  opts?: { asHex?: false; seed?: bigint }
): bigint;
export function fnv1a64(
  input: Input,
  opts?: { asHex: true; seed?: bigint }
): string;
export function fnv1a64(
  input: Input,
  opts: { asHex?: boolean; seed?: bigint } = {}
) {
  // Step 1: Convert input to byte array
  const bytes = toBytes(input);

  // Step 2: Initialize hash with 64-bit offset basis (or custom seed if provided)
  // BigInt is used for 64-bit precision (regular numbers in JS are limited to 53-bit precision)
  let hash = typeof opts.seed === "bigint" ? opts.seed : FNV1A_64_OFFSET;

  // Step 3: Process each byte in the input
  for (let i = 0; i < bytes.length; i++) {
    // Step 3a: XOR the current hash with the byte value
    // BigInt(bytes[i]) converts the byte to a BigInt for 64-bit operation
    hash ^= BigInt(bytes[i]);

    // Step 3b: Multiply the hash by the FNV 64-bit prime
    // & 0xffffffffffffffffn masks to keep only the lower 64 bits
    // (prevents overflow beyond 64 bits)
    hash = (hash * FNV1A_64_PRIME) & 0xffffffffffffffffn;
  }

  // Step 4: Return the result in the requested format
  if (opts.asHex) {
    // Convert to hexadecimal string with 16 characters (padded with zeros)
    // Example: 11831194018420276491n → "a430d84680aabd0b"
    return hash.toString(16).padStart(16, "0");
  }

  // Return as BigInt (64-bit integer)
  return hash;
}

/**
 * Convenience functions to always return hex strings.
 * These are shortcuts that call the main functions with asHex: true
 */
// Returns 32-bit hash as a hex string (8 characters)
export const fnv1a32Hex = (input: Input) => fnv1a32(input, { asHex: true });

// Returns 64-bit hash as a hex string (16 characters)
export const fnv1a64Hex = (input: Input) => fnv1a64(input, { asHex: true });

/**
 * Small internal helper (useful for tests) to compute hex from number
 * Converts any number to an unsigned 32-bit hex string
 */
export function toUint32Hex(n: number) {
  // >>> 0 converts to unsigned 32-bit
  // .toString(16) converts to hexadecimal
  // .padStart(8, "0") pads with zeros to make it 8 characters
  // Example: 1335831723 → "4f9f2cab"
  return (n >>> 0).toString(16).padStart(8, "0");
}
