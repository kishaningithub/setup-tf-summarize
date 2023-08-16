import * as core from '@actions/core'
import {downloadUrl} from './url'
import {downloadTool, extractZip} from '@actions/tool-cache'

async function setup(): Promise<void> {
  try {
    const url = await downloadUrl()
    core.info(`downloading tf-summarize from ${url}`)
    const pathToZipArtifact: string = await downloadTool(url)
    const pathToCLI: string = await extractZip(pathToZipArtifact)
    core.addPath(pathToCLI)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

setup()
