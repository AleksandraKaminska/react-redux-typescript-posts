import "@testing-library/jest-dom"
import { JSDOM } from "jsdom"
import ResizeObserver from "resize-observer-polyfill"
import { vi } from "vitest"

const { window } = new JSDOM()

window.ResizeObserver = ResizeObserver
global.ResizeObserver = ResizeObserver
window.Element.prototype.scrollTo = () => {
  // no-op
}
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)
window.URL.createObjectURL = (obj: Blob | MediaSource) => JSON.stringify(obj)

Object.assign(global, { window, document: window.document })

vi.mock("react-i18next", () => ({
  Trans: ({ children }) => children,
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))
