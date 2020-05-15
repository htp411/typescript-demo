import cheerio from 'cheerio'
import fs from 'fs'

interface Course {
  count: number
  title: string
}
interface CourseResult {
  time: number
  data: Course[]
}
interface Content {
  [propName: number]: Course[]
}
export default class Analyzer {
  private static instance: Analyzer
  static getInstance() {
    if (!this.instance) {
      this.instance = new Analyzer()
    }
    return this.instance
  }
  private constructor() {}
  private getCourseInfo(html: string): CourseResult {
    const $ = cheerio.load(html)
    const courseItem = $('.course-item')
    const courseArr: Course[] = []
    courseItem.map((i, ele) => {
      const desc = $(ele).find('.course-desc')
      const title = desc.text()
      const count = 30 + Math.floor(Math.random() * 71)
      courseArr.push({ title, count })
    })
    return {
      time: Date.now(),
      data: courseArr,
    }
  }
  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }
  private generateJsonContent(courseResult: CourseResult, filePath: string): Content {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseResult.time] = courseResult.data
    return fileContent
  }
}
