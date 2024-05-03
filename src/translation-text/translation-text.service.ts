import { Injectable } from '@nestjs/common';
import { translate } from '@vitalets/google-translate-api';
import { HttpProxyAgent } from 'http-proxy-agent';
const proxyList = [
  'http://65.21.49.83:8080',
  'http://12.186.205.120:80',
  'http://31.207.36.34:80',
  'http://154.49.246.35:80',
  'http://103.105.196.240:80',
  'http://12.186.205.121:80',
  'http://18.222.233.151:3256',
  'http://103.105.196.165:80',
  'http://123.30.154.171:7777',
  'http://45.124.184.13:80',
  'http://154.236.189.15:1976',
  'http://51.145.176.250:8080',
  'http://116.125.141.115:80',
  'http://113.179.83.118:3128',
  'http://172.173.132.85:80',
  'http://202.61.204.51:80',
  'http://188.166.56.246:80',
  'http://197.255.126.69:80',
  'http://103.105.196.229:80',
  'http://47.243.177.210:8088',
  'http://103.94.52.70:3128',
  'http://68.178.203.69:8899',
  'http://164.52.204.156:80',
  'http://35.209.198.222:80',
  'http://158.69.185.37:3129',
  'http://200.19.177.120:80',
  'http://20.193.154.130:8888',
  'http://198.74.51.79:8888',
  'http://103.127.1.130:80',
  'http://172.232.107.38:8080',
  'http://45.189.151.17:8080',
  'http://154.65.39.8:80',
  'http://148.72.165.7:30127',
  'http://47.56.110.204:8989',
  'http://159.203.103.28:80',
  'http://103.105.196.77:80',
  'http://185.212.60.62:80',
  'http://103.105.196.98:80',
  'http://122.176.48.148:80',
  'http://95.164.89.123:8888',
  'http://103.105.196.184:80',
  'http://183.100.14.134:8000',
  'http://135.125.206.241:80',
  'http://103.105.196.112:80',
  'http://154.65.39.7:80',
  'http://51.250.13.88:80',
  'http://149.130.218.26:80',
  'http://185.247.18.200:8888',
  'http://12.186.205.123:80',
  'http://51.161.109.38:80',
  'http://50.223.239.191:80',
  'http://202.86.138.18:8080',
  'http://37.27.82.72:80',
  'http://50.217.226.44:80',
  'http://103.137.62.253:80',
  'http://195.181.172.220:8081',
  'http://41.207.187.178:80',
  'http://178.128.113.118:23128',
  'http://51.210.19.141:80',
  'http://50.173.140.144:80',
  'http://176.65.240.15:80',
  'http://213.33.2.27:80',
  'http://93.177.67.178:80',
  'http://50.223.239.160:80',
  'http://50.175.212.74:80',
  'http://213.33.126.130:80',
  'http://23.137.248.197:8888',
  'http://201.148.32.162:80',
  'http://49.228.131.169:5000',
  'http://51.89.73.162:80',
  'http://50.173.140.150:80',
  'http://213.219.198.69:80',
  'http://50.174.145.13:80',
  'http://50.174.214.206:80',
  'http://103.105.196.178:80',
  'http://190.144.92.197:80',
  'http://38.54.71.67:80',
  'http://50.217.226.46:80',
  'http://190.58.248.86:80',
  'http://50.144.161.167:80',
  'http://3.101.73.107:1080',
  'http://74.48.7.43:80',
  'http://103.130.145.169:80',
  'http://103.105.196.169:80',
  'http://54.145.5.165:80',
  'http://50.173.140.149:80',
  'http://50.222.245.45:80',
  'http://91.200.102.194:80',
  'http://80.120.49.242:80',
  'http://34.126.125.90:8080',
  'http://50.174.145.14:80',
  'http://195.23.57.78:80',
  'http://50.172.75.121:80',
  'http://50.204.219.229:80',
  'http://50.173.140.145:80',
  'http://117.54.114.99:80',
  'http://50.218.57.70:80',
  'http://103.105.196.191:80',
  'http://117.250.3.58:8080',
  'http://34.94.148.191:3128',
  'http://50.204.219.230:80',
  'http://134.35.60.235:8080',
  'http://134.35.12.167:8080',
  'http://182.253.130.78:8080',
  'http://103.180.1.242:1111',
  'http://144.217.119.85:3207',
  'http://103.169.255.171:8080',
  'http://152.32.226.172:3129',
  'http://181.212.45.226:8080',
  'http://50.168.163.179:80',
  'http://103.105.196.102:80',
  'http://50.207.199.80:80',
  'http://50.223.246.226:80',
  'http://50.232.104.86:80',
  'http://50.172.75.125:80',
  'http://50.171.177.124:80',
  'http://50.122.86.118:80',
  'http://65.21.159.49:80',
  'http://50.168.163.181:80',
  'http://50.169.135.10:80',
  'http://50.220.168.134:80',
  'http://189.202.188.149:80',
  'http://50.172.75.123:80',
  'http://50.172.75.126:80',
  'http://38.145.211.246:8899',
  'http://103.105.196.250:80',
  'http://50.222.245.46:80',
  'http://50.175.212.72:80',
  'http://50.207.199.83:80',
  'http://50.222.245.41:80',
  'http://80.228.235.6:80',
  'http://50.174.214.222:80',
  'http://192.73.244.36:80',
  'http://20.111.54.16:8123',
  'http://50.174.7.156:80',
  'http://50.169.117.103:80',
  'http://50.174.7.154:80',
  'http://66.191.31.158:80',
  'http://50.217.226.42:80',
  'http://50.174.145.12:80',
  'http://50.174.7.159:80',
  'http://50.144.166.226:80',
  'http://50.171.187.50:80',
  'http://50.168.163.180:80',
  'http://50.173.182.90:80',
  'http://50.172.75.127:80',
  'http://50.221.230.186:80',
  'http://50.204.219.231:80',
  'http://50.175.31.195:80',
  'http://50.144.168.74:80',
  'http://50.173.140.147:80',
  'http://50.174.145.8:80',
  'http://127.0.0.7:80',
  'http://50.223.38.6:80',
  'http://50.221.74.130:80',
  'http://50.168.163.178:80',
  'http://50.168.72.113:80',
  'http://50.217.226.41:80',
  'http://50.168.72.116:80',
  'http://50.175.212.79:80',
  'http://50.174.7.158:80',
  'http://50.239.72.19:80',
  'http://45.143.220.99:8118',
  'http://210.212.39.130:8080',
  'http://32.223.6.94:80',
  'http://103.105.196.128:80',
  'http://50.168.72.115:80',
  'http://20.205.61.143:80',
  'http://50.222.245.42:80',
  'http://50.218.57.68:80',
  'http://50.218.57.67:80',
  'http://50.218.57.69:80',
  'http://50.231.110.26:80',
  'http://50.174.7.152:80',
  'http://50.172.75.120:80',
  'http://50.204.219.224:80',
  'http://50.168.72.118:80',
  'http://51.89.14.70:80',
  'http://50.218.57.71:80',
  'http://50.204.219.226:80',
  'http://50.207.199.82:80',
  'http://190.103.177.131:80',
  'http://50.168.210.232:80',
  'http://213.143.113.82:80',
  'http://50.204.190.234:80',
  'http://50.172.23.10:80',
  'http://50.174.145.11:80',
  'http://50.168.163.177:80',
  'http://82.119.96.254:80',
  'http://50.218.57.64:80',
  'http://50.239.72.16:80',
  'http://142.147.245.67:5758',
  'http://156.239.49.45:3128',
  'http://156.239.49.180:3128',
  'http://104.164.183.125:3128',
  'http://107.150.21.217:5833',
  'http://104.252.131.162:3128',
  'http://192.186.176.242:8292',
  'http://107.179.51.9:5652',
  'http://104.165.127.3:3128',
  'http://156.239.49.231:3128',
  'http://104.165.127.202:3128',
  'http://104.165.127.237:3128',
  'http://156.239.49.62:3128',
  'http://156.239.48.135:3128',
  'http://156.239.49.168:3128',
  'http://104.164.183.223:3128',
  'http://156.239.50.48:3128',
  'http://161.123.151.155:6139',
  'http://156.239.48.163:3128',
  'http://104.223.227.9:6532',
  'http://104.165.127.148:3128',
  'http://173.211.0.187:6680',
  'http://104.252.131.57:3128',
  'http://104.165.127.159:3128',
  'http://156.239.48.58:3128',
  'http://64.64.110.172:6695',
  'http://104.165.169.9:3128',
  'http://104.165.169.85:3128',
  'http://104.165.127.181:3128',
  'http://38.154.124.107:8800',
  'http://103.167.2.63:8080',
  'http://103.115.243.156:83',
  'http://177.93.16.66:8080',
  'http://38.41.0.62:11201',
  'http://38.7.30.129:999',
  'http://45.5.117.76:999',
  'http://103.204.20.21:8080',
  'http://37.44.247.217:3128',
  'http://103.68.214.10:1234',
  'http://154.64.219.2:8888',
  'http://103.177.177.249:8080',
  'http://50.168.72.119:80',
  'http://50.174.145.15:80',
  'http://50.168.210.239:80',
  'http://50.168.210.236:80',
  'http://67.43.228.254:5151',
  'http://50.223.239.168:80',
  'http://0.0.0.0:80',
  'http://50.217.226.45:80',
  'http://34.154.161.152:80',
  'http://13.81.217.201:80',
  'http://50.202.75.26:80',
  'http://50.175.212.66:80',
  'http://77.48.244.78:80',
  'http://85.8.68.2:80',
  'http://50.223.242.97:80',
  'http://50.218.57.65:80',
  'http://50.223.242.100:80',
  'http://50.173.140.138:80',
  'http://50.172.75.124:80',
  'http://50.168.72.122:80',
  'http://50.169.117.101:80',
  'http://103.105.196.116:80',
  'http://217.218.248.226:3128',
  'http://50.171.68.130:80',
  'http://213.157.6.50:80',
  'http://68.185.57.66:80',
  'http://50.169.221.31:80',
  'http://50.169.117.90:80',
  'http://50.172.39.98:80',
  'http://50.207.199.85:80',
  'http://210.212.39.138:8080',
  'http://50.223.239.194:80',
  'http://50.168.210.235:80',
  'http://50.168.72.117:80',
  'http://50.230.222.202:80',
  'http://50.173.140.148:80',
  'http://103.163.51.254:80',
  'http://50.175.31.192:80',
  'http://50.223.239.185:80',
  'http://50.204.219.225:80',
  'http://50.204.219.227:80',
  'http://50.173.140.151:80',
  'http://47.74.152.29:8888',
  'http://103.105.196.185:80',
  'http://50.239.72.18:80',
  'http://20.24.43.214:80',
  'http://50.174.7.155:80',
  'http://50.174.7.162:80',
  'http://50.223.239.161:80',
  'http://50.222.245.50:80',
  'http://50.168.7.250:80',
  'http://50.223.242.103:80',
  'http://50.168.72.112:80',
  'http://50.168.72.114:80',
  'http://50.204.219.228:80',
  'http://50.171.187.51:80',
  'http://35.185.196.38:3128',
  'http://213.33.2.28:80',
  'http://104.165.169.20:3128',
  'http://193.176.242.186:80',
  'http://104.165.127.206:3128',
  'http://134.73.64.85:6370',
  'http://184.174.56.62:5074',
  'http://136.0.109.190:6476',
  'http://104.165.169.168:3128',
  'http://38.170.188.201:5774',
  'http://184.174.24.98:6674',
  'http://104.165.127.92:3128',
];
@Injectable()
export class TranslationTextService {
  async translateWithProxies(text, toLanguage) {
    for (const proxy of proxyList) {
      const agent = new HttpProxyAgent(proxy);
      try {
        const { text: translatedText } = await translate(text, {
          from: 'vi',
          to: toLanguage,
          fetchOptions: { agent },
        });
        return translatedText; // Trả về bản dịch thành công
      } catch (e) {
        console.log(`Error with proxy ${proxy}:`, e.message);
        if (e.name !== 'TooManyRequestsError') {
          break; // Nếu lỗi không phải do số lượng yêu cầu quá nhiều, dừng thử
        }
      }
    }
    throw new Error('All proxies failed');
  }

  findOne(id: number) {
    return `This action returns a #${id} translationText`;
  }

  remove(id: number) {
    return `This action removes a #${id} translationText`;
  }
}