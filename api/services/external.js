import { axiosInstance } from '../utils/axios.js'

export const getFiles = async () => {
  const response = await axiosInstance('secret/files')
  return response.data
}

export const getFileContent = async (fileId) => {
  try {
    const response = await axiosInstance(`secret/file/${fileId}`)
    return response.data
  } catch (err) {
    console.error(`Error fetching file ${fileId}: ${err.message}`)
    return null
  }
}
