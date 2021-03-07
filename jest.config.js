module.exports = {
    roots: ['<rootDir>/src/tests', '<rootDir>/lambdas/tests'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};
