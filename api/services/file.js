import Papa from 'papaparse'

export const formatFile = (fileName, fileContent) => {
  const result = {
    file: fileName,
    lines: []
  }
  try {
    if (fileContent) {
      const parsed = Papa.parse(fileContent, {
        header: true
      }).data
      result.lines = parsed.filter((line) => line.file && line.text && line.number && line.hex).map(({ text, number, hex }) => ({ text, number: parseInt(number), hex }))
    }
    return result
  } catch (err) {
    console.error(`Error formating csv lines from file ${fileName}`)
    return result
  }
}
