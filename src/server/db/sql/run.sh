#!/usr/bin/env sh
psql -h $JORNET_DB_HOST -U $JORNET_DB_USER -d jornet -a -f src/server/db/sql/0001.sql
