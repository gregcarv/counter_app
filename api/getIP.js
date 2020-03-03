const os = require('os');

module.exports = {
  /**
   * returns the current ip if there is an active connection
   */
  theIp: function(){
    const ip = []
    const ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
      let alias = 0

      ifaces[ifname].forEach(function (iface) {

        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          const cAddr = iface.address;

          ip.push(cAddr);
        } else {
          // this interface has only one ipv4 adress
          const cAddr = iface.address;

          ip.push(cAddr);
        }

        ++alias;
      });
    });

    if (ip.length > 0){
      return ip[0];
    } 

    return false;
  }
}