import {isNil} from 'ramda';

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

export {buildWhere};
