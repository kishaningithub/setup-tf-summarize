import os from 'os'
import * as core from '@actions/core'
import { getInput } from '@actions/core'
import { getOctokit } from '@actions/github'
import { GitHub } from '@actions/github/lib/utils'
import * as semver from 'semver'

export enum FileType {
  Tar = 'tar.gz',
  Zip = 'zip'
}

export interface DownloadContext {
  url: string
  fileType: FileType
}

export async function computeDownloadContext(): Promise<DownloadContext> {
  const version = await computeVersion()
  const platform = computePlatform()
  const extension = computeExtension(version, platform)
  const url = `https://github.com/dineshba/tf-summarize/releases/download/${version}/tf-summarize_${platform}_${computeArchitecture()}.${extension}`
  return {
    url,
    fileType: fetchFileType(extension)
  }
}

export function computeExtension(version: string, platform: string): FileType {
  if (semver.gte(version, 'v0.3.6') && ['linux', 'darwin'].includes(platform)) {
    return FileType.Tar
  }
  return FileType.Zip
}

function fetchFileType(fileType: string): FileType {
  switch (fileType) {
    case FileType.Tar:
      return FileType.Tar
    default:
      return FileType.Zip
  }
}

function computePlatform(): string {
  const platformMapping = new Map<string, string>()
  platformMapping.set('win32', 'windows')
  return platformMapping.get(os.platform()) ?? os.platform()
}

function computeArchitecture(): string {
  const architectureMapping = new Map<string, string>()
  architectureMapping.set('x64', 'amd64')
  architectureMapping.set('x32', '386')
  return architectureMapping.get(os.arch()) ?? os.arch()
}

async function computeVersion(): Promise<string> {
  let latestVersion = getInput('tf-summarize-version')
  if (latestVersion === 'latest') {
    const latestRelease = await octokit().rest.repos.getLatestRelease({
      owner: 'dineshba',
      repo: 'tf-summarize'
    })
    latestVersion = latestRelease.data.tag_name
  }
  return latestVersion
}

function octokit(): InstanceType<typeof GitHub> {
  return getOctokit(core.getInput('github-token'))
}
