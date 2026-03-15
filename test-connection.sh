#!/bin/bash

echo "🔍 Testing Indonesian Issue Tracker Infrastructure..."
echo ""

# Test PostgreSQL
echo "1. Testing PostgreSQL connection..."
docker exec indo-issue-tracker-db psql -U postgres -d indo_issue_tracker -c "SELECT version();" > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "   ✅ PostgreSQL is running"
  echo "   📊 Checking pgvector extension..."
  docker exec indo-issue-tracker-db psql -U postgres -d indo_issue_tracker -c "SELECT * FROM pg_extension WHERE extname = 'vector';" | grep vector > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "   ✅ pgvector extension is installed"
  else
    echo "   ❌ pgvector extension is NOT installed"
  fi
else
  echo "   ❌ PostgreSQL is NOT running"
fi

echo ""

# Test Redis
echo "2. Testing Redis connection..."
docker exec indo-issue-tracker-redis redis-cli ping > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "   ✅ Redis is running"
else
  echo "   ❌ Redis is NOT running"
fi

echo ""

# Check tables
echo "3. Checking database tables..."
TABLES=$(docker exec indo-issue-tracker-db psql -U postgres -d indo_issue_tracker -t -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public';")
if [ ! -z "$TABLES" ]; then
  echo "   ✅ Tables created:"
  echo "$TABLES" | sed 's/^/      - /'
else
  echo "   ⚠️  No tables found (run init scripts)"
fi

echo ""
echo "✅ Infrastructure test complete!"
