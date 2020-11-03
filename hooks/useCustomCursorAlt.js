/**
 * useCustomCursorAlt
 */
import { useState, useEffect } from 'react'
import useMobileDetect from 'use-mobile-detect-hook'
import classNames from 'classnames'

export const useCustomCursor = () => {
  const { isMobile } = useMobileDetect()
  if (!process.browser || isMobile()) {
    return {
      position: {
        x: 0,
        y: 0,
      },
      className: '',
    }
  }

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    addEventListeners()
    handleLinkHoverEvents()
    return () => removeEventListeners()
  }, [])

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('pointermove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('pointercancel', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('pointerdown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('pointerup', onMouseUp)
    document.addEventListener('click', onClick)
    document.addEventListener('dblclick', onDoubleClick)
  }

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('pointermove', onMouseMove)
    document.removeEventListener('mouseenter', onMouseEnter)
    document.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('pointercancel', onMouseLeave)
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('pointerdown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('pointerup', onMouseUp)
    document.removeEventListener('click', onClick)
    document.removeEventListener('dblclick', onDoubleClick)
  }

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  const onMouseDown = () => {
    setClicked(true)
  }

  const onMouseUp = () => {
    setClicked(false)
  }

  const onClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 50)
  }

  const onDoubleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 100)
  }

  const onMouseLeave = () => {
    setHidden(true)
  }

  const onMouseEnter = () => {
    setHidden(false)
  }

  const handleLinkHoverEvents = () => {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true))
      el.addEventListener('mouseout', () => setLinkHovered(false))
    })
  }

  const className = classNames('cursor', {
    'cursor--clicked': clicked,
    'cursor--hidden': hidden,
    'cursor--link-hovered': linkHovered,
  })

  return {
    position,
    className,
  }
}
