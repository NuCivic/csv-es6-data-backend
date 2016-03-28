import CSV from '../src/csv.js';

let dataset = {
  url: 'http://demo.getdkan.com/sites/default/files/us_foreclosures_jan_2012_by_state_0.csv'
}

describe('Test CSV backend load', () => {
  it('Should load', () => {
    expect(CSV.__type__).toEqual('csv');
  });
});

describe('Test Async', () => {
  let d;
  beforeEach(done => {
    setTimeout(() => {
      d = {a: 'b'};
      done();
    }, 1000)
  });

  it('Should return data', done => {
    expect(typeof d).toEqual('object');
    done();
  });
});

describe('Test fetch fail with bad url', () => {
  let dataset2 = {url : 'https://nowaythisworks999.com/foo/bar'}, d, result;

  beforeEach(done => {
    CSV.fetch(dataset2).then(data => {
      d = data;
      done();
    }).catch(e => {
      result = e;
      done();
    });
  });

  it('Should fail', done => {
    expect(result).not.toBe(undefined);
    done();
  });
});

describe('Test fetch fail with bad dataset', () => {
  let dataset3 = {bad: 'param'}; // does not contain required fields
  let d, result;

  beforeEach(done => {
    CSV.fetch(dataset3).then(data => {
      d = data;
      done();
    }).catch(e => {
      result = e;
      done();
    });
  });

  it("Should fail with 'invalid dataset message'", done => {
    expect(result).not.toBe(undefined);
    expect(result).toEqual('Invalid dataset.')
    done();
  });
});

describe('Test CSV Fetch', () => {
  let d;
  beforeEach(done => {
    CSV.fetch(dataset).then(data => {
      d = data;
      done();
    });
  });

  it('Should fetch and return valid data', done => {
    let row = d.records[0];
    // returned data is an object
    expect(typeof d).toEqual('object');
    // Fields is an array
    expect(Array.isArray(d.fields)).toBe(true);
    // A single field is a string
    expect(typeof d.fields[0]).toEqual('string');
    // Records is an array
    expect(Array.isArray(d.records)).toBe(true);
    // A record is an array
    expect(Array.isArray(row)).toBe(false);
    done();
  });



});
