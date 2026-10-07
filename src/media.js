import hero from './assets/hero-image.png'
import daily from './assets/image-card-1.png'
import records from './assets/image-card-2.png'
import connect from './assets/image-card.png'
import reception from './assets/Image.png'
import exam from './assets/Image-1.png'
import complete from './assets/Image-2.png'
import prescription from './assets/Image-3.png'
import logo from './assets/echart/logo.png'
import clinic from './assets/echart/clinic.png'

export const workflowImages = [reception, exam, prescription, complete]

const images = {
    'hero.png': hero,
    'feature-daily.png': daily,
    'feature-records.png': records,
    'feature-connect.png': connect,
    'workflow.png': reception,
    'logo.png': logo,
    'clinic.png': clinic,
}

const legacyIcons = import.meta.glob('./assets/echart/*.svg', { eager: true, query: '?url', import: 'default' })
const designIcons = import.meta.glob('./assets/home-v3/*.svg', { eager: true, query: '?url', import: 'default' })

export function getImage(name) {
    return images[name] ?? legacyIcons[`./assets/echart/${name}`]
}

export function getDesignIcon(name) {
    return designIcons[`./assets/home-v3/${name}`]
}
