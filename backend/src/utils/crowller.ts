import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import Config from '../config'
import Analyzer from './analyzer'

export default class Crowller {
  private filePath = path.resolve(__dirname, Config.FILE_PATH)
  private rowHtml = ''
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
  /**
   * 获取目标页html结构
   */
  private async getRowHtml() {
    const res = await superagent.get(this.url)
    return res.text
  }
  private async initSpiderProcess() {
    const html = await this.getRowHtml()
    // 获取页面解析出的内容
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }
  private writeFile(content: string): void {
    fs.writeFileSync(this.filePath, content)
  }
}

const analyzer = Analyzer.getInstance()
const c = new Crowller(Config.TARGET_URL, analyzer)
