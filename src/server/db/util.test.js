import {expect} from 'chai';
import {buildWhere, buildWhereRaw} from 'server/db/util';

describe('util', () => {
  it('should support building simple where clauses', () => {
    const search = {
      type: 'Trail Run',
    };
    const whereClauses = buildWhere(search);
    expect(whereClauses).to.have.length(1);

    const clause = whereClauses[0];
    expect(clause.field).to.equal('type');
    expect(clause.value).to.equal(search.type);
    expect(clause.operator).to.equal('=');
  });

  it('should support building where clauses with min and max terms', () => {
    const search = {
      type: 'Road Run',
      min_distance: 26.2,
      max_distance: 50,
    };

    const whereClauses = buildWhere(search);
    expect(whereClauses).to.have.length(3);

    expect(whereClauses.filter(c => c.operator === '=')).to.have.length(1);
    expect(whereClauses.filter(c => c.operator === '<=')).to.have.length(1);
    expect(whereClauses.filter(c => c.operator === '>=')).to.have.length(1);

    const equalsTerm = whereClauses.filter(c => c.operator === '=')[0];
    expect(equalsTerm.field).to.equal('type');
    expect(equalsTerm.value).to.equal(search.type);

    const minTerm = whereClauses.filter(c => c.operator === '>=')[0];
    expect(minTerm.field).to.equal('distance');
    expect(minTerm.value).to.equal(search.min_distance);

    const maxTerm = whereClauses.filter(c => c.operator === '<=')[0];
    expect(maxTerm.field).to.equal('distance');
    expect(maxTerm.value).to.equal(search.max_distance);
  });

  it('should support building raw search clauses', () => {
    const search = {
      type: 'Road Run',
      min_distance: 26.2,
      max_distance: 50,
    };

    const whereClauses = buildWhereRaw(search);
    expect(whereClauses.raw).to.be.a('string');
    expect(whereClauses.bindings).to.have.length(3);
  });
});
