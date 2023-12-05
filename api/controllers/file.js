import { getFiles, getFileContent } from '../services/external.js'
import { formatFile } from '../services/file.js'

export const get = async (req, res) => {
  const fileName = req.query.fileName
  let files
  try {
    if (fileName) {
      files = [fileName]
    } else {
      ({ files } = await getFiles())
    }
    const formatedFiles = await Promise.all(
      files.map(async (fileName) => {
        const fileContent = await getFileContent(fileName)
        return formatFile(fileName, fileContent)
      })
    )
    res.send(formatedFiles)
  } catch (err) {
    console.error(err.message)
    res.status(500)
    res.send('Error fetching files')
  }
}

export const list = async (req, res) => {
  const filesList = await getFiles()
  res.send(filesList)
}
