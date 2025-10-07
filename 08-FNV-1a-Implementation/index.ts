import { fnv1a32, fnv1a32Hex, fnv1a64, fnv1a64Hex } from "./FNV-1A";

const samples = [
  "hello",
  "world",
  "The quick brown fox jumps over the lazy dog",
  "",
];

for (const s of samples) {
  console.log(`input: "${s}"`);
  console.log(`  fnv1a32: 0x${fnv1a32Hex(s)}`);
  console.log(`  fnv1a32 (num): ${fnv1a32(s)}`);
  console.log(`  fnv1a64: 0x${fnv1a64Hex(s)}`);
  console.log(`  fnv1a64 (bigint): ${fnv1a64(s)}`);
  console.log("");
}
