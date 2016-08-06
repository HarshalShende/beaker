import * as navbar from '../ui/navbar'

const ZOOM_STEP = 0.5

export function setZoomFromSitedata (page) {
  // load zoom from sitedata
  beakerSitedata.getOtherOrigin(page.getURLOrigin(), 'zoom', (err, v) => {
    console.log('got zoom', v)
    if (typeof v != 'undefined') {
      page.zoom = +v
      page.webviewEl.getWebContents().setZoomLevel(page.zoom)
      navbar.update(page)
    }
  })
}

export function setZoom(page, z) {
  // clamp
  if (z > 4.5) z = 4.5
  if (z < -3)  z = -3

  // update
  page.zoom = z
  page.webviewEl.getWebContents().setZoomLevel(page.zoom)
  navbar.update(page)

  // persist to sitedata
  beakerSitedata.setOtherOrigin(page.getURLOrigin(), 'zoom', page.zoom)
}

export function zoomIn (page) {
  setZoom(page, page.zoom + ZOOM_STEP)
}

export function zoomOut (page) {
  setZoom(page, page.zoom - ZOOM_STEP)
}

export function zoomReset (page) {
  setZoom(page, 0)
}