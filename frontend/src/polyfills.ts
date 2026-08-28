const globalObj = globalThis as typeof globalThis & {
  global?: typeof globalThis;
  process?: { env?: Record<string, string | undefined> };
};

if (typeof globalObj.global === "undefined") {
  globalObj.global = globalObj;
}

if (typeof globalObj.process === "undefined") {
  globalObj.process = { env: {} };
}

export {};
