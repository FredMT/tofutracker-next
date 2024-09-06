// 'use client'
// import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'

// const ExpandableText = ({
//   text,
//   maxLines = 3,
// }: {
//   text: string
//   maxLines?: number
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [showButton, setShowButton] = useState(false)
//   const textRef = useRef<HTMLParagraphElement>(null)

//   const measureText = useCallback(() => {
//     const textElement = textRef.current
//     if (textElement) {
//       const lineHeight = parseInt(
//         window.getComputedStyle(textElement).lineHeight
//       )
//       const maxHeight = lineHeight * maxLines
//       setShowButton(textElement.scrollHeight > maxHeight)
//     }
//   }, [maxLines])

//   useEffect(() => {
//     measureText()
//     window.addEventListener('resize', measureText)
//     return () => window.removeEventListener('resize', measureText)
//   }, [measureText])

//   const toggleExpand = useCallback(() => {
//     setIsExpanded((prev) => !prev)
//   }, [])

//   const buttonText = useMemo(
//     () => (isExpanded ? 'Show Less' : 'Show more'),
//     [isExpanded]
//   )

//   const textStyle = useMemo(
//     () => ({
//       overflow: 'hidden',
//       display: '-webkit-box',
//       WebkitLineClamp: isExpanded ? 'unset' : maxLines,
//       WebkitBoxOrient: 'vertical' as const,
//     }),
//     [isExpanded, maxLines]
//   )

//   return (
//     <div className="relative">
//       <p ref={textRef} style={textStyle} className="mb-2">
//         {text}
//       </p>
//       {showButton && (
//         <button
//           onClick={toggleExpand}
//           className="text-blue-500 hover:text-blue-700 focus:outline-none"
//         >
//           {buttonText}
//         </button>
//       )}
//     </div>
//   )
// }

// export default ExpandableText
'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'

const ExpandableText = ({
  text,
  maxLines = 2,
}: {
  text: string
  maxLines?: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [truncatedText, setTruncatedText] = useState('')
  const textRef = useRef<HTMLSpanElement>(null)

  const measureText = useCallback(() => {
    const textElement = textRef.current
    if (textElement) {
      const words = text.split(' ')
      let result = ''
      let lines = 0
      let testElement = document.createElement('span')
      testElement.style.cssText = `
        visibility: hidden;
        position: absolute;
        width: ${textElement.offsetWidth}px;
        font-size: ${window.getComputedStyle(textElement).fontSize};
        line-height: ${window.getComputedStyle(textElement).lineHeight};
      `
      document.body.appendChild(testElement)

      const lineHeight = parseInt(
        window.getComputedStyle(textElement).lineHeight
      )

      for (let i = 0; i < words.length; i++) {
        let testText = result + words[i] + ' '
        testElement.innerText = testText
        if (testElement.offsetHeight > (lines + 1) * lineHeight) {
          lines++
          if (lines >= maxLines) {
            // Backtrack to find a good breaking point
            while (i > 0 && testElement.offsetHeight > maxLines * lineHeight) {
              i--
              testText = words.slice(0, i).join(' ') + '... '
              testElement.innerText = testText
            }
            setTruncatedText(testText.trim())
            break
          }
        }
        result = testText
      }

      if (lines < maxLines) {
        setTruncatedText('')
      }

      document.body.removeChild(testElement)
    }
  }, [text, maxLines])

  useEffect(() => {
    measureText()
    window.addEventListener('resize', measureText)
    return () => window.removeEventListener('resize', measureText)
  }, [measureText])

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <p>
      <span ref={textRef}>
        {isExpanded ? text : truncatedText || text}
        {truncatedText && (
          <span
            onClick={toggleExpand}
            className="ml-1 cursor-pointer text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </span>
        )}
      </span>
    </p>
  )
}

export default ExpandableText
