import * as path from 'path'
import { statSync } from 'fs'
import { watch } from 'chokidar'

const PROJECT_ROOT = import.meta.dir

const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public')
const BUILD_DIR = path.resolve(PROJECT_ROOT, 'build')

async function build() {
  console.time('build')
  const result = await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './build',
    sourcemap: 'external',
    minify: true,
  })
  console.timeEnd('build')
  if (!result.success) {
    console.error('Build failed')
    for (const message of result.logs) {
      console.error(message)
    }
  }
}
watch('./src').on('change', build)

build()

function serveFromDir(config: {
  directory: string
  path: string
}): Response | null {
  let basePath = path.join(config.directory, config.path)
  const suffixes = ['', '.html', 'index.html']

  for (const suffix of suffixes) {
    try {
      const pathWithSuffix = path.join(basePath, suffix)
      const stat = statSync(pathWithSuffix)
      if (stat && stat.isFile()) {
        return new Response(Bun.file(pathWithSuffix))
      }
    } catch (err) {}
  }

  return null
}

const server = Bun.serve({
  fetch(request) {
    let reqPath = new URL(request.url).pathname
    console.log(request.method, reqPath)
    if (reqPath === '/') reqPath = '/index.html'

    // check public
    const publicResponse = serveFromDir({
      directory: PUBLIC_DIR,
      path: reqPath,
    })
    if (publicResponse) return publicResponse

    // check /.build
    const buildResponse = serveFromDir({ directory: BUILD_DIR, path: reqPath })
    if (buildResponse) return buildResponse

    return new Response('File not found', {
      status: 404,
    })
  },
})

console.log(`Listening on http://localhost:${server.port}`)
