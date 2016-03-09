# CSV Backend for es6
Fetch and query CSV data from url, file, or memory.

# Quickstart
``npm install csv-es6-data-backend``
```javascript
  import CSV from 'csv-es6-data-backend';

     CSV.fetch(dataset).then(data => {
        // data is formatted:
            {
              fields: ['field1', 'field2', ...],
              records: [{ field1: 'value'}, ...]
            }
     });
```

