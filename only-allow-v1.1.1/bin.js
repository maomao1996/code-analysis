#!/usr/bin/env node
// 用于获取当前所使用的包管理器名称和版本
const whichPMRuns = require('which-pm-runs')
// 终端输出美化：在终端中生成一个方框图案
const boxen = require('boxen')

// 通过 process.argv 获取传入的参数
const argv = process.argv.slice(2)

// 对参数进行校验，为空时提示可使用的包管理器 <npm|cnpm|pnpm|yarn> 并退出进程
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|cnpm|pnpm|yarn>')
  process.exit(1)
}

// 获取指定使用的包管理器，如果不是 npm|cnpm|pnpm|yarn 其中之一时提示当前可用的包管理器并退出进程
const wantedPM = argv[0]
if (wantedPM !== 'npm' && wantedPM !== 'cnpm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(
    `"${wantedPM}" is not a valid package manager. Available package managers are: npm, cnpm, pnpm, or yarn.`,
  )
  process.exit(1)
}

// 获取当前所使用的包管理器名称和版本
const usedPM = whichPMRuns()

// 获取 Node 进程当前工作的目录（即项目目录）
const cwd = process.env.INIT_CWD || process.cwd()

/**
 * 用于判断 only-allow 是否作为依赖项安装，保证只在运行项目依赖项安装时进行包管理器验证
 * https://github.com/pnpm/only-allow/issues/2
 */
const isInstalledAsDependency = cwd.includes('node_modules')

// 当前进程的使用的包管理器与指定包管理器不一致时，根据指定的包管理器弹出错误提示并退出进程
if (usedPM && usedPM.name !== wantedPM && !isInstalledAsDependency) {
  const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
  switch (wantedPM) {
    case 'npm':
      console.log(boxen('Use "npm install" for installation in this project', boxenOpts))
      break
    case 'cnpm':
      console.log(boxen('Use "cnpm install" for installation in this project', boxenOpts))
      break
    case 'pnpm':
      console.log(
        boxen(
          `Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`,
          boxenOpts,
        ),
      )
      break
    case 'yarn':
      console.log(
        boxen(
          `Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`,
          boxenOpts,
        ),
      )
      break
  }
  process.exit(1)
}
