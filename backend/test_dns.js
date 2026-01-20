const dns = require('dns');

const domain = 'cluster0.x5xdd.mongodb.net';

console.log(`🔍 Testing DNS resolution for: ${domain}`);

dns.resolveSrv(`_mongodb._tcp.${domain}`, (err, addresses) => {
    if (err) {
        console.error('❌ SRV Verification Failed:', err.code);
        console.error('   This means your computer cannot find the MongoDB database address.');
        console.error('   Possible causes:');
        console.error('   1. Bad Internet Connection.');
        console.error('   2. Firewall blocking DNS.');
        console.error('   3. ISP blocking MongoDB Atlas.');
    } else {
        console.log('✅ SRV Record found:', addresses);
        console.log('   DNS appears consistent. Checking basic connectivity...');
    }
});

dns.lookup(domain, (err, address, family) => {
    if (err) {
        console.error('❌ Basic Lookup Failed:', err.code);
    } else {
        console.log('✅ Basic Lookup Successful:', address);
    }
});
