/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: '@shelf/jest-mongodb',
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};