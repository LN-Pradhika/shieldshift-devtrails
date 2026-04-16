const http = require('http');
const post = (url, data, cb) => {
  const body = JSON.stringify(data);
  const req = http.request(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res => {
    let out = '';
    res.setEncoding('utf8');
    res.on('data', c => out += c);
    res.on('end', () => cb(null, res.statusCode, out));
  });
  req.on('error', cb);
  req.write(body);
  req.end();
};
const get = (url, cb) => {
  http.get(url, res => {
    let out = '';
    res.setEncoding('utf8');
    res.on('data', c => out += c);
    res.on('end', () => cb(null, res.statusCode, out));
  }).on('error', cb);
};
get('http://127.0.0.1:5000/api/policies/plans', (e, s, b) => {
  if (e) return console.error('plans err', e);
  console.log('plans', s, b.slice(0, 300));
  post('http://127.0.0.1:5000/api/policies/subscribe', { plan_slug: 'gold' }, (e, s, b) => {
    if (e) return console.error('subscribe err', e);
    console.log('subscribe', s, b.slice(0, 300));
    get('http://127.0.0.1:5000/api/policies/my', (e, s, b) => {
      if (e) return console.error('mypolicy err', e);
      console.log('mypolicy', s, b.slice(0, 300));
      post('http://127.0.0.1:5000/api/claims', { event_type: 'Weather Disruption' }, (e, s, b) => {
        if (e) return console.error('claim err', e);
        console.log('claim', s, b.slice(0, 300));
        get('http://127.0.0.1:5000/api/claims/active', (e, s, b) => {
          if (e) return console.error('active err', e);
          console.log('active', s, b.slice(0, 300));
          get('http://127.0.0.1:5000/api/claims', (e, s, b) => {
            if (e) return console.error('claims err', e);
            console.log('claims', s, b.slice(0, 300));
          });
        });
      });
    });
  });
});
