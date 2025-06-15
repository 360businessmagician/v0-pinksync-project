#!/bin/bash

# PinkSync API Test Runner
echo "🚀 Running PinkSync API Tests"
echo "================================"

# Run type checking first
echo "📝 Type checking..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "❌ Type checking failed!"
    exit 1
fi

echo "✅ Type checking passed!"
echo ""

# Run linting
echo "🔍 Linting..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Linting failed!"
    exit 1
fi

echo "✅ Linting passed!"
echo ""

# Run tests with coverage
echo "🧪 Running tests with coverage..."
npm run test:coverage

if [ $? -ne 0 ]; then
    echo "❌ Tests failed!"
    exit 1
fi

echo "✅ All tests passed!"
echo ""

# Check coverage thresholds
echo "📊 Coverage Report:"
echo "==================="
echo "Check the coverage report above to ensure all thresholds are met."
echo ""

echo "🎉 All checks completed successfully!"
