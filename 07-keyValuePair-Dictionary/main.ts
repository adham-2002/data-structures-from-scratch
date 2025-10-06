import { Dictionary } from "./Dictionary";

/**
 * Main function demonstrating the Dictionary usage.
 * Matches the C++ main.cpp example.
 */
function main(): void {
  // Specify the types explicitly for type safety
  const dic = new Dictionary<string, string>();
  dic.Print();

  dic.Set("Sinar", "sinar@gmail.com");
  dic.Set("Elvis", "elvis@gmail.com");
  dic.Print();

  dic.Set("Tane", "tane@gmail.com");
  dic.Set("Gerti", "gerti@gmail.com");
  dic.Set("Arist", "arist@gmail.com");

  dic.Print();

  console.log(dic.Get("Tane"));
  console.log(dic.Get("Sinar"));
  console.log(dic.Get("Elviaaa"));

  dic.Remove("Sinar");
  dic.Remove("Elvis");
  dic.Remove("Tane");
  dic.Remove("Gerti");
  dic.Remove("Arist");
  dic.Print();

  dic.Set("Sinar", "sinar@gmail.com");
  dic.Print();
}

// Run the main function
main();
