import { Route, Routes } from 'react-router-dom'
import { useAnchorScroll } from '../lib/anchor-scroll'
import { HomePage } from '../features/home/HomePage'
import { GalleryPage } from '../pages/GalleryPage'
import { TemplatePage } from '../pages/TemplatePage'
import { NotFoundPage } from '../pages/NotFoundPage'

export function App() {
  // In-page anchors must not be mistaken for hash routes.
  useAnchorScroll()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Prototype gallery: reachable by URL only, intentionally not linked from Home. */}
      <Route path="/templates" element={<GalleryPage />} />
      <Route path="/templates/:templateId" element={<TemplatePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
