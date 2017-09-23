import {isEmpty, isNil} from 'ramda';

/**
 * Given a list of search terms, this will generate the proper where clauses to add to a knex DB query
 * @param {Object} search The search terms, in key:value form, to work through
 * @return {Array} The array of where clauses to use when querying the DB via knex
 */
const buildWhere = search => {
  const whereClauses = [];
  if (isNil(search) || Object.keys(search) <= 0) {
    return whereClauses;
  }

  Object.keys(search).forEach(key => {
    if (key.startsWith('min_')) {
      const searchTerm = key.substring(4);
      whereClauses.push({
        field: searchTerm,
        value: search[key],
        operator: '>=',
      });
    } else if (key.startsWith('max_')) {
      const searchTerm = key.substring(4);
      whereClauses.push({
        field: searchTerm,
        value: search[key],
        operator: '<=',
      });
    } else {
      whereClauses.push({
        field: key,
        value: search[key],
        operator: '=',
      });
    }
  });
  return whereClauses;
};

/**
 * Builds the raw string query terms
 * @param {[type]} search [description]
 * @return {[type]} [description]
 */
const buildWhereRaw = search => {
  const clauses = buildWhere(search);
  return clauses.reduce(
    (accum, clause) => {
      if (!isEmpty(accum.raw)) {
        accum.raw += ' AND ';
      }
      accum.raw += `${clause.field} ${clause.operator} ?`;
      accum.bindings.push(clause.value);
      return accum;
    },
    {
      raw: '',
      bindings: [],
    },
  );
};

export {buildWhere, buildWhereRaw};
