import os from 'os'
import {getInput} from '@actions/core'
import {getOctokit} from '@actions/github'
import * as core from '@actions/core'

export async function downloadUrl(): Promise<string> {
  return `https://github.com/dineshba/tf-summarize/releases/download/${await version()}/tf-summarize_${platform()}_${architecture()}.zip`
}

function platform(): string {
  const platformMapping = new Map<string, string>()
  platformMapping.set('win32', 'windows')
  return platformMapping.get(os.platform()) ?? os.platform()
}

function architecture(): string {
  const architectureMapping = new Map<string, string>()
  architectureMapping.set('x64', 'amd64')
  architectureMapping.set('x32', '386')
  return architectureMapping.get(os.arch()) ?? os.arch()
}

async function version(): Promise<string> {
  let latestVersion = getInput('tf-summarize-version')
  if (latestVersion === 'latest') {
    const octokit = getOctokit(core.getInput('github-token'))
    const latestRelease = await octokit.rest.repos.getLatestRelease({
      owner: 'dineshba',
      repo: 'tf-summarize'
    })
    latestVersion = latestRelease.data.tag_name
  }
  return latestVersion
}
