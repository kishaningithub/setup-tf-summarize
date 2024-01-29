import * as core from '@actions/core'
import { computeDownloadContext, FileType } from './url'
import { downloadTool, extractTar, extractZip } from '@actions/tool-cache'

export async function setup(): Promise<void> {
  try {
    const downloadContext = await computeDownloadContext()
    core.info(`downloading tf-summarize from ${downloadContext.url}`)
    const pathToZipArtifact: string = await downloadTool(downloadContext.url)
    const extractor = {
      [FileType.Zip]: extractZip,
      [FileType.Tar]: extractTar
    }
    const pathToCLI: string =
      await extractor[downloadContext.fileType](pathToZipArtifact)
    core.addPath(pathToCLI)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
