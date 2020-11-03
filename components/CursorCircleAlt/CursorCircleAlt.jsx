/**
 * @file CursorCircleAlt.js
 *
 * @see https://codepen.io/andrewchmr-the-vuer/pen/GRZjbbB
 */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import styles from './CursorCircleAlt.module.css'

import { useCustomCursor } from '../../hooks/useCustomCursor'

const CursorCircleAlt = (props) => {
  const { tagName: Tag, variant, children } = props

  const { position, className } = useCustomCursor()

  return (
    <Tag
      className={`${styles.cursor_circle_alt} ${
        styles[`cursor_circle_alt__${variant}`]
      } ${className}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <style jsx global>{`
        html,
        body {
          cursor: none;
        }

        html *,
        body * {
          cursor: none;
        }
        .cursor {
          width: 40px;
          height: 40px;
          position: fixed;
          transform: translate(-50%, -50%);
          pointer-events: none;
          border: 2px solid #fefefe;
          border-radius: 100%;
          transition: all 150ms ease;
          background: transparent;
          transition-property: background-color, opacity, transform,
            mix-blend-mode;
          z-index: 9999;
          mix-blend-mode: difference;
        }

        .cursor--hidden {
          opacity: 0;
        }

        .cursor--link-hovered {
          transform: translate(-50%, -50%) scale(1.25);
          background-color: #fefefe;
        }

        .cursor--clicked {
          transform: translate(-50%, -50%) scale(0.9);
          background-color: #fefefe;
        }
      `}</style>
    </Tag>
  )
}

CursorCircleAlt.propTypes = {
  tagName: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

CursorCircleAlt.defaultProps = {
  tagName: 'div',
  variant: 'default',
  children: '',
}

export default CursorCircleAlt
