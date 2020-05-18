export default {
  SESSION_KEYS: ['keys1', 'keys2', 'keys3'],
  JWT_PRIVATE_KEY: '!@#$%^&*()(*&^%$#@!1241534123werqrequsdufggrf3&@*&#E@&!*D@&#T!',
  FILE_PATH: '../../data/data.json',
  TARGET_URL: 'http://www.dell-lee.com/',
  getJwtExpireTime(): number {
    return Math.floor(Date.now() + 1000 * 60 * 60 * 24 * 3)
  },
}
