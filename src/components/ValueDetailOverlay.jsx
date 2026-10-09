import { useLayoutEffect, useRef, useState } from 'react'
import './ValueDetailOverlay.css'

export default function ValueDetailOverlay({ items, index, onChange, onClose }) {
  const dialogRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const opened = index !== null

  useLayoutEffect(() => {
    if (!opened) return
    const dialog = dialogRef.current
    const root = document.documentElement
    const body = document.body
    const previousRootOverflow = root.style.overflow
    const previousBodyOverflow = body.style.overflow
    const previousGutter = root.style.scrollbarGutter
    const previousPadding = root.style.paddingRight
    const gutter = window.innerWidth - root.getBoundingClientRect().width
    const padding = parseFloat(getComputedStyle(root).paddingRight) || 0
    dialog.showModal()
    root.style.scrollbarGutter = 'auto'
    root.style.paddingRight = `${padding + gutter}px`
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(max-width: 900px)')
    const handleResize = () => {
      if (!desktop.matches) onClose()
    }
    desktop.addEventListener('change', handleResize)
    return () => {
      desktop.removeEventListener('change', handleResize)
      root.style.scrollbarGutter = previousGutter
      root.style.paddingRight = previousPadding
      root.style.overflow = previousRootOverflow
      body.style.overflow = previousBodyOverflow
      dialog.close()
    }
  }, [opened, onClose])

  useLayoutEffect(() => {
    if (!closing) return
    const animation = dialogRef.current.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300, easing: 'ease-in', fill: 'forwards' },
    )
    animation.onfinish = () => {
      onClose()
      setClosing(false)
    }
    return () => animation.cancel()
  }, [closing, onClose])

  return <dialog ref={dialogRef} id="n-value-dialog" className="n-value-dialog" aria-label="Giá trị eChart mang lại" onCancel={(event) => {
    event.preventDefault()
    setClosing(true)
  }}>
    <div className="n-value-dialog-scenes">
      {items.map(([image, title, detail], itemIndex) => <div className={`n-value-dialog-scene ${index === itemIndex ? 'is-active' : ''}`} key={image} aria-hidden={index !== itemIndex}>
        <img src={image} alt="" />
        <div className="n-value-dialog-shade" />
        <div className="n-value-dialog-copy"><h2>{title}</h2><p>{detail}</p></div>
      </div>)}
    </div>
    <div className="n-value-dialog-top"><span>Giá trị eChart mang lại</span><button type="button" autoFocus aria-label="Đóng chi tiết" onClick={() => setClosing(true)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
    <div className="n-value-dialog-controls">
      <span aria-live="polite" aria-atomic="true">{index === null ? '' : `${index + 1} / ${items.length}`}</span>
      <button type="button" disabled={closing} aria-label="Giá trị trước" onClick={() => onChange((index - 1 + items.length) % items.length)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
      <button type="button" disabled={closing} aria-label="Giá trị tiếp theo" onClick={() => onChange((index + 1) % items.length)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
    </div>
  </dialog>
}
