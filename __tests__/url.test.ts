import {expect, test} from '@jest/globals'
import {computeExtension, FileType} from '../src/url'

test('compute extension', async () => {
  expect(computeExtension('v0.3.7', 'linux')).toEqual(FileType.Tar)
  expect(computeExtension('v0.3.7', 'darwin')).toEqual(FileType.Tar)
  expect(computeExtension('v0.3.7', 'windows')).toEqual(FileType.Zip)

  expect(computeExtension('v0.3.6', 'linux')).toEqual(FileType.Tar)
  expect(computeExtension('v0.3.6', 'darwin')).toEqual(FileType.Tar)
  expect(computeExtension('v0.3.6', 'windows')).toEqual(FileType.Zip)

  expect(computeExtension('v0.3.5', 'linux')).toEqual(FileType.Zip)
  expect(computeExtension('v0.3.5', 'darwin')).toEqual(FileType.Zip)
  expect(computeExtension('v0.3.5', 'windows')).toEqual(FileType.Zip)
})
