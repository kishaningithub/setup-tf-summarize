# Setup tf-summarize

[![build-test](https://github.com/kishaningithub/setup-tf-summarize/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/kishaningithub/setup-tf-summarize/actions/workflows/test.yml)

This action installs [tf-summarize](https://github.com/dineshba/tf-summarize) in GitHub
action runner.

## Usage

This action can be used to install [tf-summarize](https://github.com/dineshba/tf-summarize) on all platforms
(Linux, Mac and Windows). When running on windows we recommend setting the shell to bash.

The default configuration installs the latest version of tf-summarize

```yaml
steps:
- uses: kishaningithub/setup-tf-summarize@v2
```

A specific version of tf-summarize can also be installed

```yaml
steps:
- uses: kishaningithub/setup-tf-summarize@v2
  with:
    tf-summarize-version: v0.3.1
```

If for any reason you need to use a separate GitHub token that is also supported,
by default it uses `GITHUB_TOKEN`.

```yaml
steps:
- uses: kishaningithub/setup-tf-summarize@v2
  with:
    github-token: ${{ secrets.MY_PAT }}
```

A general purpose full example

```yaml
name: Run tf-summarize

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
   
    - uses: kishaningithub/setup-tf-summarize@v2

    - name: Print tf-summarize version and help
      run: |
        tf-summarize -v
        tf-summarize -h
```

## Contributing

Contributions are most welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md)
