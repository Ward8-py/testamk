import { access, cp, mkdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const staticOutput = path.join(root, 'out')
const privateSource = path.join(root, 'ionos', 'private')
const vendorSource = path.join(privateSource, 'vendor', 'autoload.php')
const releaseRoot = path.join(root, 'ionos-release')
const publicRelease = path.join(releaseRoot, 'public')
const privateRelease = path.join(releaseRoot, 'private')

async function requirePath(target, guidance) {
  try {
    await access(target)
  } catch {
    throw new Error(`${guidance}\nMissing: ${target}`)
  }
}

await requirePath(staticOutput, 'Next.js did not produce the static out directory.')
await requirePath(
  vendorSource,
  'Install the private PHP dependencies before packaging: cd ionos/private && composer install --no-dev --classmap-authoritative'
)

await rm(releaseRoot, { recursive: true, force: true })
await mkdir(publicRelease, { recursive: true })
await mkdir(privateRelease, { recursive: true })
await cp(staticOutput, publicRelease, { recursive: true })
await cp(privateSource, privateRelease, {
  recursive: true,
  filter(source) {
    const relative = path.relative(privateSource, source)
    if (!relative) return true
    const firstSegment = relative.split(path.sep)[0]
    return !['config.php', 'storage', 'logs'].includes(firstSegment)
  },
})

for (const required of ['.htaccess', '404.html', path.join('api', 'quote.php')]) {
  await requirePath(path.join(publicRelease, required), `The IONOS public release is missing ${required}.`)
}

const publicStats = await stat(publicRelease)
if (!publicStats.isDirectory()) throw new Error('The IONOS public release was not created.')

console.log('IONOS release ready:')
console.log(`  Public webspace: ${path.relative(root, publicRelease)}`)
console.log(`  Private sibling: ${path.relative(root, privateRelease)}`)
console.log('Copy private/config.example.php to private/config.php on IONOS and insert the secrets there.')
